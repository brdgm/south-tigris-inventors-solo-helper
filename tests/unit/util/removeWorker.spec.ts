import removeWorker from '@/util/removeWorker'
import { expect } from 'chai'

describe('util/removeWorker.spec', () => {
  it('removeWorker.spec', () => {
    expect(removeWorker({silver: 4, workers: 1})).to.eql({silver: 4, workers: 0})
  })
})
