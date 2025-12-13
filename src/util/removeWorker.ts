import { BotResources } from '@/store/state'

/**
 * Remove worker from supply
 * @param botResources Bot resources
 * @returns New bot resources
 */
export default function removeWorker(botResources: BotResources) : BotResources {
  if (botResources.workers <= 0) {
    throw new Error('No workers left to remove.')
  }
  return {
    silver: botResources.silver,
    workers: botResources.workers - 1,
    workshopTiles: botResources.workshopTiles,
    inventionTiles: botResources.inventionTiles,
    builtDevices: botResources.builtDevices,
    publishedDevices: botResources.publishedDevices
  }
}
