<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.bot')}}</h1>

  <p>...</p>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
    {{t('roundTurnBot.executed')}}
  </button>

  <button class="btn btn-danger btn-lg mt-4 me-2" @click="next()">
    {{t('roundTurnBot.notPossible')}}
  </button>

  <ModalDialog id="botNotPossibleConfirmModal" :title="t('roundTurnBot.notPossibleConfirm.title')">
    <template #body>
      <p v-html="t('roundTurnBot.notPossibleConfirm.confirm')"></p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="next()" data-bs-dismiss="modal">{{t('roundTurnBot.notPossibleConfirm.title')}}</button>
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
import { useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    ModalDialog
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
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
  },
  methods: {
    next() : void {
      this.state.storeRoundTurn({
        round: this.round,
        turn: this.turn,
        turnOrderIndex: this.turnOrderIndex,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: this.navigationState.botResources
        }
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 4rem;
}
</style>
