<template>
  <div class="btn-group flex-wrap">
    <input type="radio" class="btn-check" name="riverEndActionSelection" :id="`${uid}-riverEndActionSelectionOption1`" autocomplete="off" v-model="selectedAction" :value="1">
    <label class="btn btn-outline-secondary" :for="`${uid}-riverEndActionSelectionOption1`">
      <AppIcon type="action" name="workshop-tile" class="icon"/>
    </label>

    <input type="radio" class="btn-check" name="riverEndActionSelection" :id="`${uid}-riverEndActionSelectionOption2`" autocomplete="off" v-model="selectedAction" :value="2">
    <label class="btn btn-outline-secondary" :for="`${uid}-riverEndActionSelectionOption2`">
      <AppIcon name="silver" extension="webp" class="icon silver"/>
      <AppIcon name="silver" extension="webp" class="icon silver"/>
    </label>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'
import { nanoid } from 'nanoid'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'RiverEndFollowUpActions',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const uid = nanoid()
    return { t, uid }
  },
  data() {
    return {
      selectedAction: undefined as number|undefined
    }
  },
  watch: {
    selectedAction(newValue: number|undefined) {
      const actions : CardAction[] = []
      switch (newValue) {
        case 1:
          actions.push({ action: Action.WORKSHOP_TILE })
          break
        case 2:
          actions.push({ action: Action.SILVER, silverBonus: 2 })
          break
      }
      this.$emit('addActions', this.uid, actions)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2.5rem;
  &.silver {
    width: 2rem;
    filter: drop-shadow(1px 0 0 white)
      drop-shadow(-1px 0 0 white)
      drop-shadow(0 1px 0 white)
      drop-shadow(0 -1px 0 white);
  }
}
.icon + .icon {
  margin-left: -0.75rem;
}
.button-group.flex-wrap {
  white-space: normal;
}
label {
  display: flex;
  align-items: center;
}
</style>
