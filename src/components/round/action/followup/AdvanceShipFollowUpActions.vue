<template>
  <div class="btn-group flex-wrap">
    <template v-for="(shipTarget,index) of shipTargets" :key="shipTarget">
      <input type="radio" class="btn-check" name="shipTargetSelection" :id="`${uid}-shipTargetSelectionOption${shipTarget}`" autocomplete="off" v-model="selectedShipTarget" :value="shipTarget">
      <label class="btn btn-outline-secondary" :for="`${uid}-shipTargetSelectionOption${shipTarget}`">
        <AppIcon type="ship-target" :name="shipTarget" :extension="(index==0 ? 'svg' : 'webp')" class="shipTarget" :class="{[shipTarget]:true}"/>
      </label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'
import { nanoid } from 'nanoid'
import ShipTarget from '@/services/enum/ShipTarget'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'AdvanceShipFollowUpActions',
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
      selectedShipTarget: undefined as ShipTarget|undefined
    }
  },
  computed: {
    shipTargets() : ShipTarget[] {
      return getAllEnumValues(ShipTarget)
    }
  },
  watch: {
    selectedShipTarget(newValue: ShipTarget|undefined) {
      const actions : CardAction[] = []
      switch (newValue) {
        case ShipTarget.WORKSHOP_TILE:
          actions.push({ action: Action.WORKSHOP_TILE })
          break
        case ShipTarget.RIVER_SECTION_2_START:
          actions.push({ action: Action.ADD_DICE_RESERVE_CARD })
          break
        case ShipTarget.RIVER_SECTION_3_START:
          actions.push({ action: Action.ADD_WORKER_RESERVE_CARD })
          break
        case ShipTarget.RIVER_END:
          actions.push({ action: Action.RIVER_END })
          break
      }
      this.$emit('addActions', this.uid, actions)
    }
  }
})
</script>

<style lang="scss" scoped>
.shipTarget {
  width: 3rem;
  &.workshop-tile {
    width: 2.5rem;
  }
}
.button-group.flex-wrap {
  white-space: normal;
}
label {
  display: flex;
  align-items: center;
}
</style>
