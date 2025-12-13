import Cards from '@/services/Cards'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    expect(Cards.getAll(CardType.DICE).length).to.eq(9)
    expect(Cards.getAll(CardType.WORKER).length).to.eq(6)
  })
})
