<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundStart.title')}}</h1>

  <div class="instructions">
    <p>...</p>
  </div>

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

export default defineComponent({
  name: 'RoundStart',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
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
      if (this.round == 1) {
        return ''
      }
      return  `/round/${this.round - 1}/end`
    }
  },
  methods: {
    next() : void {
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  & > ul > li {
    margin-top: 0.5rem;
  }
}
</style>
