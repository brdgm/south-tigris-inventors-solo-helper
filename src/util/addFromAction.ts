import { BotResources } from '@/store/state'

/**
 * Update bot resources from action after gaining a tile of building/publishing a device
 * @param botResources Bot resources
 * @param params Parameters indicating what to add
 * @returns New bot resources
 */
export default function addFromAction(botResources: BotResources,
    params: { workshopTile?: boolean, inventionTile?: boolean, builtDevice?: boolean, publishedDevice?: boolean }) : BotResources {
  return {
    silver: botResources.silver,
    workers: botResources.workers,
    workshopTiles: botResources.workshopTiles + (params.workshopTile ? 1 : 0),
    inventionTiles: botResources.inventionTiles + (params.inventionTile ? 1 : 0),
    builtDevices: botResources.builtDevices + (params.builtDevice ? 1 : 0),
    publishedDevices: botResources.publishedDevices + (params.publishedDevice ? 1 : 0)
  }
}
