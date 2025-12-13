<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundEnd.title')}}</h1>

  <h3>{{t('roundEnd.raiseTents.title')}}</h3>
  <p v-html="t('roundEnd.raiseTents.influence')"></p>

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
import CardDeck from '@/services/CardDeck'
import getDummyCardDeck from '@/util/getDummyCardDeck'
import RoundCount from '@/services/enum/RoundCount'
import { MAX_TURN } from '@/util/getTurnOrder'
import getTentPlacedInfo from '@/util/getTentPlacedInfo'

export default defineComponent({
  name: 'RoundEnd',
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
    const routeCalculator = new RouteCalculator({round})

    return { t, router, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    isLastRound() : boolean {
      return this.round == 4
    }
  },
  methods: {
    next() : void {
      if (this.round == 4) {
        this.router.push('/gameEnd')
      }
      else {
        const tentPlacedInfo = getTentPlacedInfo(this.state, this.round, MAX_TURN, 0)

        const dummyCardDeck = getDummyCardDeck(this.state, this.round)
        dummyCardDeck.draw()        
        // draw an additional card in 1st round (round 2) of short game
        if (this.state.setup.roundCount == RoundCount.SHORT_3_ROUNDS && this.round == 2) {
          dummyCardDeck.draw()
        }

        this.state.storeRound({
          round: this.round+1,
          turns: [],
          startPlayer: tentPlacedInfo.firstPlayer,
          initialCardDeck: CardDeck.new(this.round+1, this.state.setup.difficultyLevel,
              tentPlacedInfo.botAdditionalDiceSchemeCard, tentPlacedInfo.botAdditionalWorkerSchemeCard)
              .toPersistence(),
          dummyCardDeck: dummyCardDeck.toPersistence()
        })
        this.router.push(`/round/${this.round + 1}/start`)
      }
    }
  }
})
</script>
