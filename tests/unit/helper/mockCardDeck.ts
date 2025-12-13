import CardDeck from '@/services/CardDeck'

export default function mockCardDeck(params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? [],
    reserveDice: params?.reserveDice ?? [],
    reserveWorker: params?.reserveWorker ?? []
  })
}

export interface MockCardDeckParams {
  pile?: number[]
  discard?: number[]
  reserveDice?: number[]
  reserveWorker?: number[]
}
