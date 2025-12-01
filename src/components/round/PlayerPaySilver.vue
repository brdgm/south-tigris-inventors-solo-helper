<template>
  <div class="resourcesWrapper">
    <div class="resources">
      <p v-html="t('roundTurnPlayer.playerPaySilver')"></p>
      <div class="option">
        <label for="inputSilverValue">
          <AppIcon name="silver" class="icon" extension="webp"/>
        </label>
        <NumberInput id="inputSilverValue" v-model="silverValue" :min="0" :max="6"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'

export default defineComponent({
  name: 'PlayerPaySilver',
  emits: ['update:modelValue'],  
  components: {
    AppIcon,
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    modelValue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      silverValue: this.modelValue
    }
  },
  watch: {
    silverValue: {
      handler(newValue: number) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.resourcesWrapper {
  margin-top: 15px;
  max-width: 32rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
.resources {
  background-color: #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  .option {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    input {
      width: 5rem;
    }
  }
}
.icon {
  height: 2rem;
  filter: drop-shadow(1px 0 0 white)
    drop-shadow(-1px 0 0 white)
    drop-shadow(0 1px 0 white)
    drop-shadow(0 -1px 0 white);
}
</style>
