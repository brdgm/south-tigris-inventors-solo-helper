<template>
  <h3>{{t('roundStart.dummyPlayer.title')}}</h3>

  <div class="dummyPlayer">
    <div class="actionBox col instruction" data-bs-toggle="modal" data-bs-target="#dummyPlayerAdvancementModal">
      <div class="actionWrapper">
        <div class="bonus">
          <AppIcon v-for="index of influenceBlue" :key="index" type="influence" name="blue" class="icon"/>
          <AppIcon v-for="index of influenceOrange" :key="index" type="influence" name="orange" class="icon"/>
          <AppIcon v-for="index of influenceBlack" :key="index" type="influence" name="black" class="icon"/>
          <AppIcon name="multiple" class="multiple"/>
        </div>
        <div class="shipAdvancement">
          <div class="steps">{{shipMovement}}</div>
          <AppIcon type="action" name="advance-ship" class="icon"/>
        </div>
      </div>
      <div class="workerSpaces">
        <div class="workerSpace">
          <AppIcon type="worker-space" :name="increaseCostWorkerSpace" class="icon"/>
          <div class="tile">
            <AppIcon type="increase-cost-guild" :name="increaseCostGuild" class="icon"/>
          </div>
        </div>
        <div v-for="workerSpace of blockGuildWorkerSpaces" :key="workerSpace" class="workerSpace">
          <AppIcon type="worker-space" :name="workerSpace" class="icon"/>
          <div class="tile">
            <AppIcon name="blocked" class="icon blocked"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalDialog id="dummyPlayerAdvancementModal" :title="t('roundStart.dummyPlayer.title')" :scrollable="true">
    <template #body>
      <p>{{t('roundStart.dummyPlayer.influence')}}</p>
      <p>{{t('roundStart.dummyPlayer.moveShip')}}</p>
      <p>{{t('roundStart.dummyPlayer.dummyTokens')}}</p>
    </template>
  </ModalDialog>    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import RoundCount from '@/services/enum/RoundCount'
import DummyCard from '@/services/DummyCard'
import WorkerSpace from '@/services/enum/WorkerSpace'
import Guild from '@/services/enum/Guild'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import getDummyCardDeck from '@/util/getDummyCardDeck'

export default defineComponent({
  name: 'DummyPlayerAdvancement',
  components: {
    AppIcon,
    ModalDialog
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    // prepare dummy player card(s)
    const dummyCardDeck = getDummyCardDeck(state, props.round)
    const dummyCards : DummyCard[] = []
    dummyCards.push(dummyCardDeck.draw())
    
    // draw an additional card in 1st round (round 2) of short game
    if (state.setup.roundCount == RoundCount.SHORT_3_ROUNDS && props.round == 2) {
      dummyCards.push(dummyCardDeck.draw())
    }

    return { t, state, dummyCardDeck, dummyCards }
  },
  props: {
    round: {
      type: Number,
      required: true
    }
  },
  computed: {
    influenceBlue() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceBlue, 0)
    },
    influenceOrange() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceOrange, 0)
    },
    influenceBlack() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.influenceBlack, 0)
    },
    shipMovement() : number {
      return this.dummyCards.reduce((sum, card) => sum + card.shipMovement, 0)
    },
    increaseCostWorkerSpace() : WorkerSpace {
      return this.dummyCards[0].increaseCostWorkerSpace
    },
    increaseCostGuild() : Guild {
      return this.dummyCards[0].increaseCostGuild
    },
    blockGuildWorkerSpaces() : WorkerSpace[] {
      return this.dummyCards[0].blockGuildWorkerSpaces
    }
  }
})
</script>

<style lang="scss" scoped>
.dummyPlayer {
  margin-top: 15px;
  max-width: 32rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
.actionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #9cc4aa;
  border: 2px solid #697f32;
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .cost, .bonus {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
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
.icon {
  height: 2.75rem;
}
.shipAdvancement {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;
  gap: 0.5rem;
  .steps {
    font-size: 2rem;
    font-weight: bold;
  }
}
.workerSpaces {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
  @media (max-width: 600px) {
    gap: 1rem;
  }
  .workerSpace {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      height: 4rem;
    }
    .tile {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #cfb895;
      border: 1.5px solid #fff;
      width: 3.6rem;
      height: 2.8rem;
      margin-top: -0.9rem;
      z-index: 20;
      .icon {
        height: 1.8rem;
        &.blocked {
          height: 0.9rem;
        }
      }
    }
  }
}
</style>
