<template>
  <div class="tableWrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5>{{t('gameEnd.count.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('gameEnd.count.count')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('gameEnd.count.vp')}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.count.workshopTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="botWorkshopTilesCount"/>
          </td>
          <td>
            {{botWorkshopTilesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.count.inventionTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="botInventionTilesCount"/>
          </td>
          <td>
            {{botInventionTilesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.count.builtPublishedDevicesInfluence')"></span>
          </th>
          <td>
            <NumberInput v-model="botBuiltPublishedDevicesInfluenceCount"/>
          </td>
          <td>
            {{botBuiltPublishedDevicesVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tableWrapper mt-3">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5>{{t('gameEnd.scoring.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('roundTurnPlayer.title')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('roundTurnBot.title')}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.guildMajorities')"></span>
          </th>
          <td>
            <NumberInput v-model="playerGuildMajoritiesVP"/>
          </td>
          <td>
            <NumberInput v-model="botGuildMajoritiesVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.royaltiesTrack')"></span>
          </th>
          <td>
            <NumberInput v-model="playerRoyaltiesTrackVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.researchTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="playerResearchTilesVP"/>
          </td>
          <td>
            <NumberInput v-model="botResearchTilesVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.craftspeople')"></span>
          </th>
          <td>
            <NumberInput v-model="playerCraftspeopleVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.workshopTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="playerWorkshopTilesVP"/>
          </td>
          <td>
            {{botWorkshopTilesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.inventionTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="playerInventionTilesVP"/>
          </td>
          <td>
            {{botInventionTilesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.builderPublisherInfluence')"></span>
          </th>
          <td>
            <NumberInput v-model="playerBuilderPublisherInfluenceVP"/>
          </td>
          <td>
            <NumberInput v-model="botBuilderPublisherInfluenceVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.builtPublishedDevices')"></span>
          </th>
          <td>
            <NumberInput v-model="playerBuiltPublishedDevicesVP"/>
          </td>
          <td>
            {{botBuiltPublishedDevicesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.remainingSilverDeviceCards')"></span>
          </th>
          <td>
            <NumberInput v-model="playerRemainingSilverDeviceCardsVP"/>
          </td>
          <td>
            {{botRemainingSilverVP}}
          </td>
        </tr>
        <tr>
          <th scope="row" class="fw-bold">
            {{t('gameEnd.scoring.totalVP')}}
          </th>
          <td class="fw-bold">
            {{playerTotalVP}}
          </td>
          <td class="fw-bold">
            {{botTotalVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    const playerGuildMajoritiesVP = ref(undefined as number|undefined)
    const playerRoyaltiesTrackVP = ref(undefined as number|undefined)
    const playerResearchTilesVP = ref(undefined as number|undefined)
    const playerCraftspeopleVP = ref(undefined as number|undefined)
    const playerWorkshopTilesVP = ref(undefined as number|undefined)
    const playerInventionTilesVP = ref(undefined as number|undefined)
    const playerBuilderPublisherInfluenceVP = ref(undefined as number|undefined)
    const playerBuiltPublishedDevicesVP = ref(undefined as number|undefined)
    const playerRemainingSilverDeviceCardsVP = ref(undefined as number|undefined)

    const botGuildMajoritiesVP = ref(undefined as number|undefined)
    const botResearchTilesVP = ref(undefined as number|undefined)
    const botBuilderPublisherInfluenceVP = ref(undefined as number|undefined)

    const botWorkshopTilesCount = ref(undefined as number|undefined)
    const botInventionTilesCount = ref(undefined as number|undefined)
    const botBuiltPublishedDevicesInfluenceCount = ref(undefined as number|undefined)

    return { t, state, navigationState, 
      playerGuildMajoritiesVP,
      playerRoyaltiesTrackVP,
      playerResearchTilesVP,
      playerCraftspeopleVP,
      playerWorkshopTilesVP,
      playerInventionTilesVP,
      playerBuilderPublisherInfluenceVP,
      playerBuiltPublishedDevicesVP,
      playerRemainingSilverDeviceCardsVP,
      botGuildMajoritiesVP,
      botResearchTilesVP,
      botBuilderPublisherInfluenceVP,
      botWorkshopTilesCount,
      botInventionTilesCount,
      botBuiltPublishedDevicesInfluenceCount
    }
  },
  data() {
    return {
      coins: [] as number[]
    }
  },
  computed: {
    botWorkshopTilesVP() : number {
      return toNumber(this.botWorkshopTilesCount) * 2
    },
    botInventionTilesVP() : number {
      return toNumber(this.botInventionTilesCount) * 3
    },
    botBuiltPublishedDevicesVP() : number {
      return toNumber(this.botBuiltPublishedDevicesInfluenceCount) * 4
    },
    botRemainingSilverVP() : number {
      return this.navigationState.botResources.silver
    },
    playerTotalVP(): number {
      return toNumber(this.playerGuildMajoritiesVP)
        + toNumber(this.playerRoyaltiesTrackVP)
        + toNumber(this.playerResearchTilesVP)
        + toNumber(this.playerCraftspeopleVP)
        + toNumber(this.playerWorkshopTilesVP)
        + toNumber(this.playerInventionTilesVP)
        + toNumber(this.playerBuilderPublisherInfluenceVP)
        + toNumber(this.playerBuiltPublishedDevicesVP)
        + toNumber(this.playerRemainingSilverDeviceCardsVP)
    },
    botTotalVP(): number {
      return toNumber(this.botGuildMajoritiesVP)
        + toNumber(this.botResearchTilesVP)
        + this.botWorkshopTilesVP
        + this.botInventionTilesVP
        + toNumber(this.botBuilderPublisherInfluenceVP)
        + this.botBuiltPublishedDevicesVP
        + this.botRemainingSilverVP
    }
  }
})
</script>

<style lang="scss" scoped>
.tableWrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  font-weight: normal;
  min-width: 5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
