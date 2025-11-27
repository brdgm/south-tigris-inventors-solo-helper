<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions mt-4">
    <ol>
      <li v-html="t('setupBot.setup2Players')"></li>
    </ol>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-primary">
        <h4>{{t('setupBot.ruleChanges.title')}}</h4>
        <ul>
          <li v-html="t('setupBot.ruleChanges.resources')"></li>
        </ul>
      </div>
    </div>
  </div>

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
  methods: {
    startGame() : void {
      this.router.push('/turn/1/player')
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
