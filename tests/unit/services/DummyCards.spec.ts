import DummyCards from '@/services/DummyCards'
import { expect } from 'chai'

describe('services/DummyCards', () => {
  it('get', () => {
    const card = DummyCards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    expect(DummyCards.getAll().length).to.eq(6)
  })
})
