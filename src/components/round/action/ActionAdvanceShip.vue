<template>
  <ActionBox :action="action" :navigationState="navigationState" :instruction-title="t('rules.action.advanceShip.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #followUpAction>
      <AdvanceShipFollowUpActions @addActions="(actionId, actions) => $emit('addActions', actionId, actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.advanceShip.moveShip')"/>
      <p class="fw-bold" v-html="t('rules.action.advanceShip.selectAction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import AdvanceShipFollowUpActions from './followup/AdvanceShipFollowUpActions.vue'

export default defineComponent({
  name: 'ActionAdvanceShip',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    AdvanceShipFollowUpActions
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
