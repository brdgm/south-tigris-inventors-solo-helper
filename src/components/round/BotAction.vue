<template>
  <div v-if="action.influenceCost" style="color:red">
    influenceCost: <b>{{ action.influenceCost }}</b>
  </div>
  <div v-if="action.silverCost" style="color:red">
    silverCost: <b>{{ action.silverCost }}</b>
  </div>
  <div>
    action: <b>{{ action.action }}</b>
  </div>
  <div v-if="action.influenceBonus" style="color:green"> 
    influenceBonus: <b>{{ action.influenceBonus }}</b>
  </div>
  <div v-if="action.silverBonus" style="color:green">
    silverBonus: <b>{{ action.silverBonus }}</b>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'

export default defineComponent({
  name: 'BotAction',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  }
})
</script>
