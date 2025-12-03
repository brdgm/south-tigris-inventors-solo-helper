<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.influence.title')">
    <template #action>
      <div class="action">
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.influence.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionInfluence',
  inheritAttrs: false,
  components: {
    ActionBox
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
