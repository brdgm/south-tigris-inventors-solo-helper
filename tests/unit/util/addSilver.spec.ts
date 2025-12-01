import addSilver from '@/util/addSilver'
import { expect } from 'chai'

describe('util/addSilver', () => {
  it('addSilver', () => {
    expect(addSilver({silver: 4}, 1)).to.eql({silver: 5})
  })
})
