import { BotResources } from '@/store/state'

export default function mockBotResources(params?: MockBotResourcesParams) : BotResources {  
  return {
    silver: params?.silver ?? 0,
    workers: params?.workers ?? 0,
    workshopTiles: params?.workshopTiles ?? 0,
    inventionTiles: params?.inventionTiles ?? 0,
    builtDevices: params?.builtDevices ?? 0,
    publishedDevices: params?.publishedDevices ?? 0
  }
}

export interface MockBotResourcesParams {
  silver?: number
  workers?: number
  workshopTiles?: number
  inventionTiles?: number
  builtDevices?: number
  publishedDevices?: number
}
