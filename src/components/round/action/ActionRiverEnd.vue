<template>
  <ActionBox :action="action" :navigationState="navigationState" :instruction-title="t('rules.action.riverEnd.title')">
    <template #action>
      <div class="action">
        <AppIcon type="ship-target" name="river-end" extension="webp" class="icon"/>
      </div>
    </template>
    <template #followUpAction>
      <RiverEndFollowUpActions @addActions="(actionId, actions) => $emit('addActions', actionId, actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.riverEnd.workshopTile')"/>
      <p v-html="t('rules.action.riverEnd.noWorkshopTiles')"/>
      <p class="fw-bold" v-html="t('rules.action.riverEnd.selectAction')"/>
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
import RiverEndFollowUpActions from './followup/RiverEndFollowUpActions.vue'

export default defineComponent({
  name: 'ActionRiverEnd',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    RiverEndFollowUpActions
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
  height: 4rem;
}
</style>
