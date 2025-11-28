import DummyCardDeck from '@/services/DummyCardDeck'

export default function mockDummyCardDeck(params?: MockDummyCardDeckParams) : DummyCardDeck {  
  return DummyCardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockDummyCardDeckParams {
  pile?: number[]
  discard?: number[]
}
