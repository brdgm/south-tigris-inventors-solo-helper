import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import { CardAction } from './Card'
import Action from './enum/Action'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actions : CardAction[]
  public readonly placeTent : boolean
  public readonly secondLastCard : boolean
  
  private constructor(actions : CardAction[], placeTent: boolean, secondLastCard: boolean) {
    this.actions = actions
    this.placeTent = placeTent
    this.secondLastCard = secondLastCard
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources, tentPlaced: boolean) : BotActions {
    if (tentPlaced) {
      // already placed a tent? gain 1 silver
      return new BotActions([ { action:Action.SILVER, silverBonus: 1 } ], false, false)
    }

    // draw card
    const card = cardDeck.draw()

    let actions : CardAction[] = []
    let placeTent = false

    // if this is the last scheme card, ignore all actions and just place a tent
    if (cardDeck.pileEmpty) {
      placeTent = true
    }
    else {
      // filter out actions the bot cannot afford (via silver cost)
      actions = card.actions.filter(action => (action.silverCost ?? 0) <= botResources.silver)
    }

    const secondLastCard = (cardDeck.pile.length == 1)
    return new BotActions(actions, placeTent, secondLastCard)
  }

}
