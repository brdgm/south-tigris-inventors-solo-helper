import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import { BotResources } from '@/store/state'

/**
 * Update bot resources from action after gaining a tile of building/publishing a device
 * @param botResources Bot resources
 * @param actions Actions
 * @returns New bot resources
 */
export default function addFromActions(botResources: BotResources, actions: CardAction[]) : BotResources {
  return {
    silver: botResources.silver,
    workers: botResources.workers,
    workshopTiles: botResources.workshopTiles + count(actions, Action.WORKSHOP_TILE),
    inventionTiles: botResources.inventionTiles + count(actions, Action.INVENT),
    builtDevices: botResources.builtDevices + count(actions, Action.BUILD),
    publishedDevices: botResources.publishedDevices + count(actions, Action.PUBLISH)
  }
}

function count(actions: CardAction[], actionType: Action) : number {
  return actions.filter(action => action.action==actionType).length
}
