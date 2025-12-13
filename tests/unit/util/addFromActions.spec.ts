import addFromActions from '@/util/addFromActions'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'
import Action from '@/services/enum/Action'

describe('util/addFromActions', () => {
  it('addWorkshopTile', () => {
    expect(addFromActions(mockBotResources({workshopTiles: 2}), [{ action: Action.WORKSHOP_TILE }] )).to.eql(mockBotResources({workshopTiles: 3}))
  })

  it('addInventionTile', () => {
    expect(addFromActions(mockBotResources({inventionTiles: 1}), [{ action: Action.INVENT }] )).to.eql(mockBotResources({inventionTiles: 2}))
  })

  it('addBuiltDevice', () => {
    expect(addFromActions(mockBotResources({builtDevices: 4}), [{ action: Action.BUILD }] )).to.eql(mockBotResources({builtDevices: 5}))
  })

  it('addPublishedDevice', () => {
    expect(addFromActions(mockBotResources({publishedDevices: 3}), [{ action: Action.PUBLISH }] )).to.eql(mockBotResources({publishedDevices: 4}))
  })  
})
