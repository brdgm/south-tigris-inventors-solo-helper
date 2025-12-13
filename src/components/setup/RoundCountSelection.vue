<template>
  <h3 class="mt-4 mb-3">{{t('setup.roundCountSelection.title')}}</h3>

  <div class="row" v-for="roundCount of roundCounts" :key="roundCount">
    <div class="col">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="roundCountSelection" :value="roundCount" v-model="state.setup.roundCount">
          {{t(`roundCount.${roundCount}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import RoundCount from '@/services/enum/RoundCount'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'RoundCountSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    roundCounts() : RoundCount[] {
      return getAllEnumValues(RoundCount).toReversed()
    }
  }
})
</script>
