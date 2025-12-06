<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevelComponent/>
  <RoundCountSelection/>
  <ExpansionsSetup/>

  <div class="row mt-3" v-if="showEraOfExpertsDifficultyLevelWarning || showEraOfExpertsRoundCountWarning">
    <div class="col">
      <div v-if="showEraOfExpertsDifficultyLevelWarning" class="alert alert-warning" v-html="t('setup.eraOfExpertsDifficultyLevelWarning')"></div>
      <div v-if="showEraOfExpertsRoundCountWarning" class="alert alert-warning" v-html="t('setup.eraOfExpertsRoundCountWarning')"></div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupBot.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevelComponent from '@/components/setup/DifficultyLevel.vue'
import { useRouter } from 'vue-router'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'
import RoundCountSelection from '@/components/setup/RoundCountSelection.vue'
import Expansion from '@/services/enum/Expansion'
import RoundCount from '@/services/enum/RoundCount'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'SetupApp',
  components: {
    FooterButtons,
    DifficultyLevelComponent,
    RoundCountSelection,
    ExpansionsSetup
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    hasEraOfExpertsExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.ERA_OF_EXPERTS)
    },
    showEraOfExpertsDifficultyLevelWarning() : boolean {
      return this.hasEraOfExpertsExpansion && this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_4
    },
    showEraOfExpertsRoundCountWarning() : boolean {
      return this.hasEraOfExpertsExpansion && this.state.setup.roundCount == RoundCount.STANDARD_4_ROUNDS
    }
  },
  methods: {
    setupGame() : void {
      this.router.push('/setupBot')
    }
  }
})
</script>
