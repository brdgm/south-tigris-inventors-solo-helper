import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'

export default function mockBotPersistence(params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence()
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
}
