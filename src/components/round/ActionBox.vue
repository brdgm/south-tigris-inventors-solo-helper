<template>
  <div class="actionBox" :class="{'instruction': hasInstruction}" @click="showInstructions">
    <div class="actionWrapper">
      <template v-if="!navigationState.botActions?.placeTent">
        <div class="cost" v-if="action.influenceCost">
          <AppIcon v-for="(guild,index) of action.influenceCost" :key="index" type="influence" :name="guild" class="icon"/>
          <AppIcon name="multiple" class="multiple"/>
          <AppIcon name="arrow" class="arrow"/>
        </div>
        <div class="bonus" v-if="action.silverCost">
          <AppIcon v-for="index of action.silverCost" :key="index" name="silver" extension="webp" class="icon silver"/>
          <AppIcon name="arrow" class="arrow"/>
        </div>
      </template>
      <slot name="action"></slot>
      <template v-if="!navigationState.botActions?.placeTent">
        <div class="bonus" v-if="action.influenceBonus">
          <AppIcon v-for="(guild,index) of action.influenceBonus" :key="index" type="influence" :name="guild" class="icon"/>
          <AppIcon name="multiple" class="multiple"/>
        </div>
        <div class="bonus" v-if="action.silverBonus">
          <AppIcon v-for="index of action.silverBonus" :key="index" name="silver" extension="webp" class="icon silver"/>
        </div>
      </template>
    </div>
    <template v-if="!navigationState.botActions?.placeTent">
      <div class="workerPlacement" v-if="hasWorkerPlacement">
        <AppIcon name="worker" class="icon worker"/>
        <AppIcon name="arrow" class="arrow"/>
        <template v-if="workerPlacementGuild">
          <AppIcon type="influence" :name="workerPlacementGuild" class="icon guild"/> 
        </template>
        <template v-else>
          <AppIcon v-for="workerSpace of workerSpacePriority" :key="workerSpace" type="worker-space" :name="workerSpace" class="icon workerSpace"/>
        </template>
      </div>
      <div class="priority" v-if="hasPriority">
        <slot name="priority"></slot>
      </div>
    </template>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <p v-if="action.influenceCost" v-html="t('rules.action.general.influenceCost')"/>
      <p v-if="action.silverCost" v-html="t('rules.action.general.silverCost')"/>
      <template v-if="hasWorkerPlacement">
        <p v-if="workerPlacementGuild" v-html="t('rules.action.general.workerPlacementGuild')"/>
        <p v-else v-html="t('rules.action.general.workerPlacement')"/>
      </template>
      <slot name="instruction"></slot>
      <p v-if="action.influenceBonus" v-html="t('rules.action.general.influenceBonus')"/>
      <p v-if="action.silverBonus" v-html="t('rules.action.general.silverBonus')"/>
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
import NavigationState from '@/util/NavigationState'
import Guild from '@/services/enum/Guild'
import WorkerSpace from '@/services/enum/WorkerSpace'
import Player from '@/services/enum/Player'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const modalId = `modal-${nanoid()}`
    return { t, modalId }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
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
    hasWorkerPlacement() : boolean {
      return !this.navigationState.tentPlaced.includes(Player.BOT)
          && (this.action.placeWorker ?? false)
    },
    workerPlacementGuild() : Guild|undefined {
      const guildPriorities = this.action.influenceCost ?? []
      // detect if there is only one unique guild color present in the array
      const uniqueGuilds = Array.from(new Set(guildPriorities))
      if (uniqueGuilds.length == 1) {
        // user worker spot on a guild
        return uniqueGuilds[0]
      }
      // user worker spots right of the guilds
      return undefined
    },
    workerSpacePriority() : WorkerSpace[] {
      return (this.navigationState.cardDeck.currentCard?.rowPriorities ?? [])
          .map(row => { 
            switch (row) {
              case 1: return WorkerSpace.HIRE_CAMEL
              case 2: return WorkerSpace.REFRESH_CRAFTSPEOPLE
              default: return WorkerSpace.ADVANCE_SHIP
            }
        })
    },
    hasPriority() : boolean {
      return this.$slots.priority !== undefined
    },
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
  .workerPlacement {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    .icon {
      &.worker {
        height: 4rem;
        margin: -1.75rem;
      }
      &.guild {
        height: 3rem;
      }
      &.workerSpace {
        height: 2.25rem;
      }
    }
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
  }
  .priority {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }
}
.arrow {
  height: 1.5rem;
  margin-left: 0.5rem;
  margin-right: -0.25rem;
}
</style>
