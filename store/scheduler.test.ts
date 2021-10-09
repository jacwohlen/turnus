import firebase from 'firebase/app'

import { schedulerStore } from './'
import { Match } from '~/types/models'

describe('store/scheduler', () => {
  // FIXME: Despite async here, jest somehow is not returning
  // and needs therefore --forceExit
  beforeEach(async () => {
    await firebase.database().ref('/').remove()
    await schedulerStore.init()
  })

  test('test scheduling mechanics', async () => {
    const matches: Match[] = [
      {
        id: 'Pool1_0',
        n: 0,
        fighter1Id: 'F1',
        fighter2Id: 'F2',
        poolId: 'Pool1',
      },
      {
        id: 'Pool1_1',
        n: 1,
        fighter1Id: 'F1',
        fighter2Id: 'F3',
        poolId: 'Pool1',
      },
      {
        id: 'Pool1_2',
        n: 2,
        fighter1Id: 'F1',
        fighter2Id: 'F4',
        poolId: 'Pool1',
      },
      {
        id: 'Pool1_3',
        n: 3,
        fighter1Id: 'F2',
        fighter2Id: 'F3',
        poolId: 'Pool1',
      },
      {
        id: 'Pool1_4',
        n: 4,
        fighter1Id: 'F2',
        fighter2Id: 'F4',
        poolId: 'Pool1',
      },
      {
        id: 'Pool1_5',
        n: 5,
        fighter1Id: 'F3',
        fighter2Id: 'F4',
        poolId: 'Pool1',
      },
    ]
    expect(schedulerStore.getCurrentMatch).toBeNull()
    expect(schedulerStore.getNextMatch).toBeNull()
    await schedulerStore.next()
    await schedulerStore.addMatches(matches)
    expect(schedulerStore.getStats).toEqual({ upcoming: 6, done: 0 })

    expect(schedulerStore.getCurrentMatch).toEqual(matches[0])
    expect(schedulerStore.getNextMatch).toEqual(matches[1])

    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    expect(schedulerStore.getStats).toEqual({ upcoming: 5, done: 1 })

    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    expect(schedulerStore.getStats).toEqual({ upcoming: 6, done: 0 })
  })

  test('test cycling through scheduling', async () => {
    const matches: Match[] = [
      {
        n: 0,
        fighter1Id: 'F1',
        fighter2Id: 'F2',
        poolId: 'Pool1',
        id: 'Pool1_0',
      },
      {
        n: 1,
        fighter1Id: 'F1',
        fighter2Id: 'F3',
        poolId: 'Pool1',
        id: 'Pool1_1',
      },
      {
        n: 2,
        fighter1Id: 'F1',
        fighter2Id: 'F4',
        poolId: 'Pool1',
        id: 'Pool1_2',
      },
    ]
    await schedulerStore.addMatches(matches)

    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[2])
    await schedulerStore.next()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[2])
    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[1])
    await schedulerStore.previous()
    expect(schedulerStore.getCurrentMatch).toStrictEqual(matches[0])
    await schedulerStore.previous()
  })
})
