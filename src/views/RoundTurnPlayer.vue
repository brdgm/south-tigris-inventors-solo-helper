<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundTurnPlayer.title')}}</h1>

  <p class="mt-4" v-html="t('roundTurnPlayer.execute')"></p>

  <PlayerPaySilver v-model="playerPaySilver"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#passModal">
    {{t('action.pass')}}
  </button>

  <ModalDialog id="passModal" :title="t('action.pass')">
    <template #body>
      <p v-html="t('roundTurnPlayer.passConfirm')"></p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="next" data-bs-dismiss="modal">{{t('action.pass')}}</button>
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
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import RouteCalculator from '@/services/RouteCalculator'
import PlayerPaySilver from '@/components/round/PlayerPaySilver.vue'
import addSilver from '@/util/addSilver'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'RoundTurnPlayer',
  components: {
    FooterButtons,
    ModalDialog,
    SideBar,
    DebugInfo,
    PlayerPaySilver
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
      playerPaySilver: 0
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() {
      this.state.storeRoundTurn({
        round: this.round,
        turn: this.turn,
        turnOrderIndex: this.turnOrderIndex,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addSilver(this.navigationState.botResources, toNumber(this.playerPaySilver))
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
