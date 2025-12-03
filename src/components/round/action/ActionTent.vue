<template>
  <ActionBox :action="action" :navigationState="navigationState" :instruction-title="t('rules.action.tent.title')">
    <template #action>
      <div class="action">
        <BotPlaceTent :tentPosition="tentPosition" :dummyPlayerTentPosition="dummyPlayerTentPosition"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.tent.placeTent')"/>
      <p v-if="dummyPlayerTentPosition" v-html="t('rules.action.tent.dummyPlayerTent')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import NavigationState from '@/util/NavigationState'
import BotPlaceTent from '@/components/structure/BotPlaceTent.vue'

export default defineComponent({
  name: 'ActionTent',
  inheritAttrs: false,
  components: {
    ActionBox,
    BotPlaceTent
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    firstTent() : boolean {
      return this.navigationState.tentPlaced.length == 0
    },
    tentPosition() : number|undefined {
      return this.navigationState.cardDeck.currentCard?.tentPosition
    },
    dummyPlayerTentPosition() : number|undefined {
      if (!this.firstTent) {
        return undefined
      }
      return this.navigationState.cardDeck.currentCard?.dummyPlayerTentPosition
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 3rem;
}
</style>
