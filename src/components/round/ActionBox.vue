<template>
  <div class="actionBox col" :class="{'instruction': hasInstruction}" @click="showInstructions">
    <div class="actionWrapper">
      <div class="cost" v-if="action.influenceCost">
        <AppIcon v-for="(guild,index) of action.influenceCost" :key="index" type="influence" :name="guild" class="icon"/>
        <AppIcon name="multiple" class="multiple"/>
        <AppIcon name="arrow" class="arrow"/>
      </div>
      <div class="bonus" v-if="action.silverCost">
        <AppIcon v-for="index of action.silverCost" :key="index" name="silver" extension="webp" class="icon silver"/>
        <AppIcon name="arrow" class="arrow"/>
      </div>
      <slot name="action"></slot>
      <div class="bonus" v-if="action.influenceBonus">
        <AppIcon v-for="(guild,index) of action.influenceBonus" :key="index" type="influence" :name="guild" class="icon"/>
        <AppIcon name="multiple" class="multiple"/>
      </div>
      <div class="bonus" v-if="action.silverBonus">
        <AppIcon v-for="index of action.silverBonus" :key="index" name="silver" extension="webp" class="icon silver"/>
      </div>
    </div>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import AppIcon from '../structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const modalId = `modal-${nanoid()}`
    return { modalId }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    instructionTitle: {
      type: String,
      required: true
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    hasInstruction() : boolean {
      return this.$slots.instruction !== undefined
    }
  },
  methods: {
    showInstructions() {
      if (this.hasInstruction) {
        showModal(this.modalId)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #d7bea3;
  border: 2px solid #ba9673;
  border-radius: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  min-height: 7rem;
  &.instruction {
    cursor: pointer;
    background-image: url('@/assets/icons/help-semi-transparent.webp');
    background-repeat: no-repeat;
    background-position: right 5px top 5px;
    background-size: 1.25rem;
  }
  .actionWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .cost, .bonus {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    .icon {
      height: 2.75rem;
      &.silver {
        filter: drop-shadow(1px 0 0 white)
          drop-shadow(-1px 0 0 white)
          drop-shadow(0 1px 0 white)
          drop-shadow(0 -1px 0 white);
      }
    }
    .icon + .icon {
      margin-left: -1rem;
    }
    .multiple {
      height: 1.5rem;
      margin-top: 0.7rem;
      margin-left: -1.1rem;
    }
    .arrow {
      height: 1.5rem;
      margin-left: 0.5rem;
      margin-right: -0.25rem;
    }
  }
}
</style>
