<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('roundTurnBot.title')}}
    <div class="actionAfterTentPlaced" v-if="hasPlacedTent">
      <AppIcon name="action-after-tent-placed" class="icon"/>
    </div>
  </h1>

  <BotAction v-if="currentAction" :action="currentAction" :navigationState="navigationState"
      @addActions="(actionId,actions) => addActions(actionId,actions,0)"/>
  <BotAction v-if="placeTent" :action="tentAction" :navigationState="navigationState"
      @addActions="(actionId,actions) => addActions(actionId,actions,0)"/>

  <div v-if="placeTent" class="mt-3">
    <p v-html="t('roundTurnBot.placeTent.title')"></p>
    <TentSpaceSelection v-model="selectedTentSpace"/>
    <p class="mt-2" v-if="selectedTentSpace" v-html="selectedTentSpaceInfo"></p>
  </div>

  <div class="row mt-3" v-if="placeTent && !selectedTentSpace">
    <div class="col">
      <div class="alert alert-info" v-html="t('roundTurnBot.placeTent.notSelected')"></div>
    </div>
  </div>

  <template v-for="(item,index) of additionalActions" :key="index">
    <BotAction v-for="(action,index) of item.actions" :key="index" :action="action" :navigationState="navigationState"
        @addActions="(actionId,actions) => addActions(actionId,actions,item.level+1)"/>
  </template>

  <template v-if="hasMoreActions">
    <button class="btn btn-success btn-lg mt-4 me-2" @click="next()" :disabled="placeTent && !selectedTentSpace">
      {{t('roundTurnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('roundTurnBot.notPossible')}}
    </button>
  </template>
  <template v-else>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()" :disabled="placeTent && !selectedTentSpace">
      {{t('action.next')}}
    </button>
  </template>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { RoundTurn, useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { CardAction } from '@/services/Card'
import BotAction from '@/components/round/BotAction.vue'
import Player from '@/services/enum/Player'
import AppIcon from '@/components/structure/AppIcon.vue'
import addSilver from '@/util/addSilver'
import Action from '@/services/enum/Action'
import removeWorker from '@/util/removeWorker'
import TentSpaceSelection from '@/components/structure/TentSpaceSelection.vue'
import TentSpace from '@/services/enum/TentSpace'
import addFromActions from '@/util/addFromActions'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotAction,
    AppIcon,
    TentSpaceSelection
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, action, player, botActions } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, action, player})

    return { t, router, navigationState, state, round, turn, turnOrderIndex, action, player, botActions, routeCalculator }
  },
  data() {
    return {
      additionalActions: [] as AdditionalActions[],
      selectedTentSpace: undefined as TentSpace|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    allActions() : CardAction[] {
      return this.botActions?.actions ?? []
    },
    currentAction() : CardAction|undefined {
      return this.allActions[this.action]
    },
    hasMoreActions() : boolean {
      return this.action < this.allActions.length - 1
    },
    hasPlacedTent() : boolean {
      return this.navigationState.tentPlaced.includes(Player.BOT)
    },
    placeTent() : boolean {
      return (this.botActions?.placeTent ?? false) || ((this.botActions?.secondLastCard ?? false) && this.action > 0)
    },
    tentAction() : CardAction {
      return { action: Action.TENT }
    },
    selectedTentSpaceInfo() : string|undefined {
      if (this.isLastRound) {
        return undefined
      }
      if (this.selectedTentSpace == TentSpace.ENVOY) {
        return this.t('roundTurnBot.placeTent.envoy')
      }
      else if (this.selectedTentSpace == TentSpace.HIRE_CAMEL) {
        return this.t('roundTurnBot.placeTent.hireCamel')
      }
      return undefined
    },
    isLastRound() : boolean {
      return this.round == 4
    },
    actionsRelevantBotResources() : CardAction[] {
      const actions : CardAction[] = []
      if (this.currentAction) {
        actions.push(this.currentAction)
      }
      if (this.placeTent) {
        actions.push(this.tentAction)
      }
      actions.push(...this.additionalActions.flatMap(item => item.actions))
      return actions
    }
  },
  methods: {
    notPossible() : void {
      this.router.push(this.routeCalculator.getNextActionRouteTo(this.state))
    },
    next() : void {
      if (this.actionsRelevantBotResources.some(action => action.action == Action.ADD_DICE_RESERVE_CARD)) {
        this.navigationState.cardDeck.addDiceReserveCard()
      }
      if (this.actionsRelevantBotResources.some(action => action.action == Action.ADD_WORKER_RESERVE_CARD)) {
        this.navigationState.cardDeck.addWorkerReserveCard()
      }

      // calculate new silver amount
      const silverBonus = this.actionsRelevantBotResources
        .reduce((sum, action) => sum + (action.silverBonus ?? 0), 0)
      const silverCost = this.actionsRelevantBotResources
        .reduce((sum, action) => sum + (action.silverCost ?? 0), 0)
      let newBotResources = addSilver(this.navigationState.botResources, silverBonus - silverCost)

      // spend worker?
      if (!this.navigationState.tentPlaced.includes(Player.BOT)
          && (this.currentAction?.placeWorker ?? false)) {
        newBotResources = removeWorker(newBotResources)
      }

      // count tiles and build/published devices
      newBotResources = addFromActions(newBotResources, this.actionsRelevantBotResources)

      const roundTurn : RoundTurn = {
        round: this.round,
        turn: this.turn,
        turnOrderIndex: this.turnOrderIndex,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: newBotResources
        }
      }
      if (this.placeTent) {
        roundTurn.tentPlaced = this.selectedTentSpace
      }
      this.state.storeRoundTurn(roundTurn)
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    addActions(actionId: string, actions: CardAction[], level: number) {
      this.additionalActions = this.additionalActions.filter(item => (item.level < level) || (item.level == level && item.actionId != actionId))
      this.additionalActions.push({ actionId, level, actions })
    }
  }
})

interface AdditionalActions {
  actionId: string
  level: number
  actions: CardAction[]
}
</script>

<style lang="scss" scoped>
.actionAfterTentPlaced {
  display: inline-block;
  border-radius: 0.25em;
  background: linear-gradient(to bottom, #c81f25, #6c0404);
  padding: 0.25rem;
  padding-right: 0.5rem;
  line-height: 0;
  .icon {
    height: 1.75rem;
  }
}
</style>
