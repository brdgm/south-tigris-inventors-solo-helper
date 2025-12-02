<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('roundTurnBot.title')}}
    <div class="actionAfterTentPlaced" v-if="hasPlacedTent">
      <AppIcon name="action-after-tent-placed" class="icon"/>
    </div>
  </h1>

  <BotAction v-if="currentAction" :action="currentAction"/>

  <template v-if="placeTent">
    <p>Bot is tentin'!</p>
    <BotPlaceTent :tentPosition="tentPosition" :dummyPlayerTentPosition="dummyPlayerTentPosition"/>
  </template>

  <template v-if="hasMoreActions">
    <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
      {{t('roundTurnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('roundTurnBot.notPossible')}}
    </button>
  </template>
  <template v-else>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
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
import BotPlaceTent from '@/components/structure/BotPlaceTent.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import addSilver from '@/util/addSilver'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotAction,
    BotPlaceTent,
    AppIcon
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
    firstTent() : boolean {
      return this.navigationState.tentPlaced.length == 0
    },
    tentPosition() : number|undefined {
      return this.navigationState.cardDeck.currentCard?.tentPosition
    },
    dummyPlayerTentPosition() : number|undefined {
      if (!this.firstTent) {
        return undefined
      }
      return this.navigationState.cardDeck.currentCard?.dummyPlayerTentPosition
    }
  },
  methods: {
    notPossible() : void {
      this.router.push(this.routeCalculator.getNextActionRouteTo(this.state))
    },
    next() : void {
      const roundTurn : RoundTurn = {
        round: this.round,
        turn: this.turn,
        turnOrderIndex: this.turnOrderIndex,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addSilver(this.navigationState.botResources,
            (this.currentAction?.silverBonus ?? 0) - (this.currentAction?.silverCost ?? 0))
        }
      }
      if (this.placeTent) {
        roundTurn.tentPlaced = true
      }
      this.state.storeRoundTurn(roundTurn)
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
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
