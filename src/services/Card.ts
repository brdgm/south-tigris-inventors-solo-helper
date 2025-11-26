import Action from './enum/Action'
import CardType from './enum/CardType'
import Guild from './enum/Guild'

export default interface Card {
  id: number
  cardType: CardType
  guildPriorities: Guild[]
  rowPriorities: number[]
  actions: Action[]
  tentPosition: number
  dummyPlayerTentPosition: number
}
