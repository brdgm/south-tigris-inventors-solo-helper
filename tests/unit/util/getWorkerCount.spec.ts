import getWorkerCount from '@/util/getWorkerCount'
import { expect } from 'chai'

describe('util/getWorkerCount', () => {
  it('getWorkerCount', () => {
    expect(getWorkerCount()).to.eq(3)
  })
})
