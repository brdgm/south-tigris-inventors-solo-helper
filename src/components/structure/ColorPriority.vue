<template>
  <div class="colors">
    <div v-for="color of colors" :key="color" class="color" :class="{[color]:true}"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Guild from '@/services/enum/Guild'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ColorPriority',
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    colors() : Guild[] {
      return this.navigationState.cardDeck.currentCard?.guildPriorities ?? []
    }
  }
})
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.color {
  height: 1.5rem;
  width: 1.5rem;
  border: 1.5px solid #fff;
  &.blue {
    background-color: #00adee;
  }
  &.orange {
    background-color: #e4a641;
  }
  &.black {
    background-color: #333;
  }
}
</style>
