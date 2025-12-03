<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundEnd.title')}}</h1>

  <h3>{{t('roundEnd.raiseTents.title')}}</h3>
  <p v-html="t('roundEnd.raiseTents.influence')"></p>

  <p class="fw-bold" v-html="t('roundEnd.botTentingAreas.title')"></p>
  <form>
    <div class="form-check form-check-inline">
      <label class="form-check-label fw-bold">
        <input class="form-check-input" type="radio" name="botTentingAreas" v-model="botTentingArea" :value="4">
        {{t('roundEnd.botTentingAreas.space4')}}
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label fw-bold">
        <input class="form-check-input" type="radio" name="botTentingAreas" v-model="botTentingArea" :value="5">
        {{t('roundEnd.botTentingAreas.space5')}}
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label fw-bold">
        <input class="form-check-input" type="radio" name="botTentingAreas" v-model="botTentingArea" :value="0">
        {{t('roundEnd.botTentingAreas.none')}}
      </label>
    </div>
  </form>
  <p class="mt-2" v-if="(botTentingArea ?? 0) > 0" v-html="t(`roundEnd.botTentingAreas.space${botTentingArea}Result`)"></p>

  <div class="row mt-4" v-if="botTentingArea == undefined">
    <div class="col">
      <div class="alert alert-info" v-html="t('roundEnd.botTentingAreas.notSelected')"></div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="botTentingArea!=undefined">
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
  data() {
    return {
      botTentingArea: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      if (this.round == 4) {
        this.router.push('/gameEnd')
      }
      else {
        const additionalDiceSchemeCard = (this.botTentingArea == 5)
        const additionalWorkerSchemeCard = (this.botTentingArea == 4)

        const dummyCardDeck = getDummyCardDeck(this.state, this.round)
        dummyCardDeck.draw()        
        // draw an additional card in 1st round (round 2) of short game
        if (this.state.setup.roundCount == RoundCount.SHORT_3_ROUNDS && this.round == 2) {
          dummyCardDeck.draw()
        }

        this.state.storeRound({
          round: this.round+1,
          turns: [],
          startPlayer: this.navigationState.tentPlaced[0],
          initialCardDeck: CardDeck.new(this.round+1, this.state.setup.difficultyLevel,
              additionalDiceSchemeCard, additionalWorkerSchemeCard).toPersistence(),
          dummyCardDeck: dummyCardDeck.toPersistence()
        })
        this.router.push(`/round/${this.round + 1}/start`)
      }
    }
  }
})
</script>
