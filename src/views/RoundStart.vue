<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundStart.title')}}</h1>

  <h3 class="mt-3">{{t('roundStart.botWorkers.title')}}</h3>
  <p v-html="t('roundStart.botWorkers.instruction', {count:botWorkerCount})"></p>

  <DummyPlayerAdvancement :round="round"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

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
import RouteCalculator from '@/services/RouteCalculator'
import RoundCount from '@/services/enum/RoundCount'
import DummyPlayerAdvancement from '@/components/round/DummyPlayerAdvancement.vue'

export default defineComponent({
  name: 'RoundStart',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    DummyPlayerAdvancement
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState
    const routeCalculator = new RouteCalculator({round, turn:0})

    return { t, router, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round == 1 || (this.state.setup.roundCount==RoundCount.SHORT_3_ROUNDS && this.round == 2)) {
        return ''
      }
      return  `/round/${this.round - 1}/end`
    },
    botWorkerCount() : number {
      return (this.round > 2) ? 3 : 2
    }
  },
  methods: {
    next() : void {
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>
