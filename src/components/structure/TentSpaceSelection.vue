<template>
  <div class="tentSpaceSelection">
    <div v-for="tentSpace in tentSpaces" :key="tentSpace" class="form-check">
      <input class="form-check-input" type="radio" name="tentSpaceOption" :id="`tentSpace-${tentSpace}`" :value="tentSpace" v-model="selectedTentSpace">
      <label class="form-check-label" :for="`tentSpace-${tentSpace}`">
        <AppIcon type="tent-space" :name="tentSpace" class="icon tentSpace" :class="{[tentSpace]:true}"/>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import TentSpace from '@/services/enum/TentSpace'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'TentSpaceSelection',
  emits: ['update:modelValue'],  
  components: {
    AppIcon
  },
  props: {
    modelValue: {
      type: String as PropType<TentSpace>,
      required: false
    }
  },
  data() {
    return {
      selectedTentSpace: undefined as TentSpace|undefined
    }
  },
  computed: {
    tentSpaces() : TentSpace[] {
      return getAllEnumValues(TentSpace)
    }
  },
  watch: {
    selectedTentSpace: {
      handler(newValue: TentSpace|undefined) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.tentSpaceSelection {
  background-color: #e3ce93;
  width: fit-content;
  padding: 1rem;
  border-radius: 0.5rem;
  .form-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .form-check-label {
    display: flex;
    align-items: center;
  }
}
.icon.tentSpace {
  height: 2.5rem;
  vertical-align: middle;
  &.envoy {
    margin-left: 0.25rem;
  }
  &.hire-camel {
    height: 2.25rem;
    margin-left: 0.25rem;
  }
}
</style>
