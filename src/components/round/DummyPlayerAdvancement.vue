<template>
  <h3>Dummy Player</h3>
  <ul>
    <li>Influence: {{ influenceBlue }} blue, {{ influenceOrange }} orange, {{ influenceBlack }} black</li>
    <li>Ship Movement: {{ shipMovement }}</li>
    <li>Increase Cost Worker Space: {{ increaseCostWorkerSpace }} {{  increaseCostGuild }}</li>
    <li>Block Guild Worker Space: {{ blockGuildWorkerSpaces }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { State, useStateStore } from '@/store/state'
import RoundCount from '@/services/enum/RoundCount'
import DummyCard from '@/services/DummyCard'
import DummyCardDeck from '@/services/DummyCardDeck'
import WorkerSpace from '@/services/enum/WorkerSpace'
import Guild from '@/services/enum/Guild'

export default defineComponent({
  name: 'DummyPlayerAdvancement',
  components: {
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    // prepare dummy player card(s)
    const dummyCardDeck = getDummyCardDeck(state, props.round)
    const dummyCards : DummyCard[] = []
    dummyCards.push(dummyCardDeck.draw())
    
    // draw an additional card in 1st round (round 2) of short game
    if (state.setup.roundCount == RoundCount.SHORT_3_ROUNDS && props.round == 2) {
      dummyCards.push(dummyCardDeck.draw())
    }

    return { t, state, dummyCardDeck, dummyCards }
  },
  props: {
    round: {
      type: Number,
      required: true
    }
  },
  computed: {
    influenceBlue() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceBlue, 0)
    },
    influenceOrange() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceOrange, 0)
    },
    influenceBlack() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceBlack, 0)
    },
    shipMovement() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.shipMovement, 0)
    },
    increaseCostWorkerSpace() : WorkerSpace {
      return this.dummyCards[0].increaseCostWorkerSpace
    },
    increaseCostGuild() : Guild {
      return this.dummyCards[0].increaseCostGuild
    },
    blockGuildWorkerSpaces() : WorkerSpace[] {
      return this.dummyCards[0].blockGuildWorkerSpaces
    }
  }
})

function getDummyCardDeck(state : State, round : number) : DummyCardDeck {
  const persistence = state.rounds.find(r => r.round==round)?.dummyCardDeck
  if (persistence) {
    return DummyCardDeck.fromPersistence(persistence)
  }
  return DummyCardDeck.new()
}
</script>

<style lang="scss" scoped>
</style>
