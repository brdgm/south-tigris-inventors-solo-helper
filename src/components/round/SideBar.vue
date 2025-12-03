<template>
  <div class="sidebar">
    {{t('sideBar.round', {round})}}<br/>
    <template v-if="turn > 0">{{t('sideBar.turn', {turn})}}<br/></template>
    <div class="metric">
      <div class="label"><AppIcon name="silver" class="icon silver" extension="webp"/></div>
      <div>{{ navigationState.botResources.silver }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-card" class="icon schemeCard" extension="webp"/></div>
      <div>{{ navigationState.cardDeck.pile.length }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.metric {
  display: flex;
  width: 60px;
  justify-content: space-between;
  margin-top: 10px;
  .label {
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;
  }
}
.icon {
  height: 1.75rem;
  &.silver {
    height: 1.5rem;
    filter: drop-shadow(1px 0 0 white)
      drop-shadow(-0.5px 0 0 white)
      drop-shadow(0 1px 0 white)
      drop-shadow(0 -0.5px 0 white);
  }
  &.schemeCard {
    height: 1.5rem;
    border-radius: 0.2rem;
  }
}
</style>
