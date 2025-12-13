import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import mockBotResources, { MockBotResourcesParams } from './mockBotResources'

export default function mockBotPersistence(params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence(),
    botResources: mockBotResources(params)
  }
}

export interface MockBotPersistenceParams extends MockBotResourcesParams {
  cardDeck?: CardDeck
}
