import Action from './enum/Action'
import CardType from './enum/CardType'
import Guild from './enum/Guild'

export default interface Card {
  id: number
  cardType: CardType
  guildPriorities: Guild[]
  rowPriorities: number[]
  actions: CardAction[]
  tentPosition: number
  dummyPlayerTentPosition: number
}

export interface CardAction {
  action: Action
  placeWorker?: true
  influenceCost?: Guild[]
  influenceBonus?: Guild[]
  silverCost?: number
  silverBonus?: number
}
