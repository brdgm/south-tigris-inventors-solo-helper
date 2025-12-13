import addSilver from '@/util/addSilver'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('util/addSilver', () => {
  it('addSilver', () => {
    expect(addSilver(mockBotResources({silver: 4}), 1)).to.eql(mockBotResources({silver: 5}))
  })
})
