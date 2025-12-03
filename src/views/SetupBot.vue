<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions mt-4">
    <p v-html="t('setupBot.instructions.intro', {roundCount:state.setup.roundCount})"></p>
    <ol>
      <li v-html="t('setupBot.instructions.workers')"></li>
      <li v-html="t('setupBot.instructions.influence', {count: 1 + (settings.additionalSetupInfluence ?? 0)})"></li>
      <template v-if="hasThreeRounds">
        <li v-html="t('setupBot.instructions.tents3RoundsTent1')"></li>
        <li v-html="t('setupBot.instructions.tents3Rounds')"></li>
        <li v-html="t('setupBot.instructions.publishedDevice3Rounds')"></li>
      </template>
      <template v-else>
        <li v-html="t('setupBot.instructions.tents4Rounds')"></li>
      </template>
      <li v-html="t('setupBot.instructions.shuffleInventionsTiles')"></li>
      <li v-html="t('setupBot.instructions.reveal3DeviceBoards')"></li>
      <li v-html="t('setupBot.instructions.firstPlayerMaker')"></li>
    </ol>
    <p v-html="t('setupBot.instructions.noSchemeCards')"></p>
  </div>

  <h3 class="mt-3">{{t('setupBot.dummyPlayer.title')}}</h3>
  <p v-html="t('setupBot.dummyPlayer.preparation.title')"></p>
  <ul>
    <li v-html="t('setupBot.dummyPlayer.preparation.unusedPlayerColor')"></li>
    <li v-html="t('setupBot.dummyPlayer.preparation.ship')"></li>
    <li v-html="t('setupBot.dummyPlayer.preparation.tentInfluence')"></li>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import RoundCount from '@/services/enum/RoundCount'
import DummyCardDeck from '@/services/DummyCardDeck'
import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    settings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    },
    hasThreeRounds() : boolean {
      return this.state.setup.roundCount == RoundCount.SHORT_3_ROUNDS
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      const firstRound = this.state.setup.roundCount === RoundCount.SHORT_3_ROUNDS ? 2 : 1
      this.state.storeRound({
        round: firstRound,
        turns: [],
        startPlayer: Player.PLAYER,
        initialCardDeck: CardDeck.new(firstRound, this.state.setup.difficultyLevel).toPersistence(),
        dummyCardDeck: DummyCardDeck.new().toPersistence()
      })
      this.router.push(`/round/${firstRound}/start`)
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
