<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('roundTurnPlayer.title')}}
    <div class="actionAfterTentPlaced" v-if="hasPlacedTent">
      <AppIcon name="action-after-tent-placed" class="icon"/>
    </div>
  </h1>

  <p class="mt-4" v-html="t('roundTurnPlayer.execute')"></p>

  <BotSilver v-model="botSilver"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#placeTentModal" v-if="!hasPlacedTent">
    {{t('roundTurnPlayer.placeTent')}}
  </button>

  <ModalDialog id="placeTentModal" :title="t('roundTurnPlayer.placeTent')">
    <template #body>
      <p v-html="t('roundTurnPlayer.placeTentConfirm')"></p>
      <TentSpaceSelection v-model="selectedTentSpace"/>
      <template v-if="firstTent">
        <hr/>
        <AppIcon name="dummy-player-tent" class="dummyPlayerTentIcon float-start"/>
        <p v-html="t('roundTurnPlayer.placeDummyPlayerTent')"></p>
      </template>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="next(selectedTentSpace)" data-bs-dismiss="modal" :disabled="!selectedTentSpace">{{t('roundTurnPlayer.placeTent')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

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
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import RouteCalculator from '@/services/RouteCalculator'
import BotSilver from '@/components/round/BotSilver.vue'
import addSilver from '@/util/addSilver'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import AppIcon from '@/components/structure/AppIcon.vue'
import Player from '@/services/enum/Player'
import TentSpace from '@/services/enum/TentSpace'
import TentSpaceSelection from '@/components/structure/TentSpaceSelection.vue'

export default defineComponent({
  name: 'RoundTurnPlayer',
  components: {
    FooterButtons,
    ModalDialog,
    SideBar,
    DebugInfo,
    BotSilver,
    AppIcon,
    TentSpaceSelection
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, player } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, player})

    return { t, router, navigationState, state, round, turn, turnOrderIndex, routeCalculator }
  },
  data() {
    return {
      botSilver: undefined as number|undefined,
      selectedTentSpace: undefined as TentSpace|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    firstTent() : boolean {
      return this.navigationState.tentPlaced.length == 0
    },
    hasPlacedTent() : boolean {
      return this.navigationState.tentPlaced.includes(Player.PLAYER)
    }
  },
  methods: {
    next(placeTent? : TentSpace|undefined) {
      const roundTurn : RoundTurn = {
        round: this.round,
        turn: this.turn,
        turnOrderIndex: this.turnOrderIndex,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addSilver(this.navigationState.botResources, toNumber(this.botSilver))
        }
      }
      if (placeTent) {
        roundTurn.tentPlaced = placeTent
      }
      this.state.storeRoundTurn(roundTurn)
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.dummyPlayerTentIcon {
  height: 2.5rem;
  margin-top: -0.25rem;
  margin-right: 0.25rem;
}
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
