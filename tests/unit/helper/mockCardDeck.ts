import CardDeck from '@/services/CardDeck'

export default function mockCardDeck(params?: MockCardDeckParams) : CardDeck {  
  const cardDeck = CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
  return cardDeck
}

export interface MockCardDeckParams {
  pile?: number[]
  discard?: number[]
}
