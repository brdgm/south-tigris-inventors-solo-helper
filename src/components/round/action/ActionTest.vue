<template>
  <ActionBox :action="action" :navigationState="navigationState" :instruction-title="t('rules.action.test.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #priority>
      <ColorPriority :navigationState="navigationState"/>
      <RowPriority :navigationState="navigationState"/>
    </template>
    <template #followUpAction>
      <AdvanceShipFollowUpActions @addActions="(actionId, actions) => $emit('addActions', actionId, actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.test.chooseDie')"/>
      <p v-html="t('rules.action.test.chooseDeviceBoard')"/>
      <p v-html="t('rules.action.test.rollDie')"/>
      <p v-html="t('rules.action.test.gainInfluence')"/>
      <p v-html="t('rules.action.test.advanceShip')"/>
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
import ColorPriority from '@/components/structure/ColorPriority.vue'
import RowPriority from '@/components/structure/RowPriority.vue'
import AdvanceShipFollowUpActions from './followup/AdvanceShipFollowUpActions.vue'

export default defineComponent({
  name: 'ActionTest',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    ColorPriority,
    RowPriority,
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
