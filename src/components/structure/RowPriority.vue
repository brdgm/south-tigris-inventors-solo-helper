<template>
  <div class="items">
    <div v-for="row of rows" :key="row" class="item">{{row}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RowPriority',
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    rows() : number[] {
      return this.navigationState.cardDeck.currentCard?.rowPriorities ?? []
    }
  }
})
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
  background: linear-gradient(0deg, #666 0%, #222 100%);
  border: 1px solid #fff;
  color: #fff;
  font-weight: bold;
}
</style>
