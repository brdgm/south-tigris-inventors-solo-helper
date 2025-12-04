import getWorkerCount from '@/util/getWorkerCount'
import { expect } from 'chai'

describe('util/getWorkerCount', () => {
  it('getWorkerCount', () => {
    expect(getWorkerCount(1)).to.eq(2)
    expect(getWorkerCount(2)).to.eq(2)
    expect(getWorkerCount(3)).to.eq(3)
    expect(getWorkerCount(4)).to.eq(3)
  })
})
