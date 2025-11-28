<template>
  <h1>{{t('gameEnd.title')}}</h1>

  <p class="mt-4">Final scoring...</p>

  <p class="mt-3">
    {{t('setup.difficultyLevel.title')}}: <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b>
  </p>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    return { t, router, state, navigationState }
  }
})
</script>
