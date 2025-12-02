<template>
  <div class="actionItem">
    <component :is="componentName" :action="action"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionInvent from './action/ActionInvent.vue'
import ActionBuild from './action/ActionBuild.vue'
import ActionPublish from './action/ActionPublish.vue'
import ActionTest from './action/ActionTest.vue'
import ActionResearch from './action/ActionResearch.vue'
import ActionSilver from './action/ActionSilver.vue'
import ActionInfluence from './action/ActionInfluence.vue'
import ActionAdvanceShip from './action/ActionAdvanceShip.vue'
import ActionAddDiceReserveCard from './action/ActionAddDiceReserveCard.vue'

export default defineComponent({
  name: 'BotAction',
  components: {
    ActionInvent,
    ActionBuild,
    ActionPublish,
    ActionTest,
    ActionResearch,
    ActionSilver,
    ActionInfluence,
    ActionAdvanceShip,
    ActionAddDiceReserveCard
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  },
  computed: {
    componentName() : string {
      return `action-${this.action.action}`
    }
  }
})
</script>

<style lang="scss" scoped>
.actionItem {
  margin-top: 15px;
  max-width: 32rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
</style>
