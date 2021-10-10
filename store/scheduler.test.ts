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
        tatamiScheduled: 'tatami1',
      },
      {
        id: 'Pool1_1',
        n: 1,
        fighter1Id: 'F1',
        fighter2Id: 'F3',
        poolId: 'Pool1',
        tatamiScheduled: 'tatami1',
      },
      {
        id: 'Pool1_2',
        n: 2,
        fighter1Id: 'F1',
        fighter2Id: 'F4',
        poolId: 'Pool1',
        tatamiScheduled: 'tatami1',
      },
      {
        id: 'Pool1_3',
        n: 3,
        fighter1Id: 'F2',
        fighter2Id: 'F3',
        poolId: 'Pool1',
        tatamiScheduled: 'tatami1',
      },
      {
        id: 'Pool1_4',
        n: 4,
        fighter1Id: 'F2',
        fighter2Id: 'F4',
        poolId: 'Pool1',
        tatamiScheduled: 'tatami1',
      },
      {
        id: 'Pool1_5',
        n: 5,
        fighter1Id: 'F3',
        fighter2Id: 'F4',
        poolId: 'Pool1',
        tatamiScheduled: 'tatami1',
      },
    ]
    expect(schedulerStore.getCurrentMatch('tatami1')).toBeNull()
    expect(schedulerStore.getNextMatch('tatami1')).toBeNull()
    await schedulerStore.next('tatami1')
    await schedulerStore.addMatches(matches)
    await schedulerStore.scheduleMatches({ tatamiId: 'tatami1', matches })
    expect(schedulerStore.getStats('tatami1')).toEqual({
      upcoming: 6,
      done: 0,
      total: 6,
    })

    expect(schedulerStore.getCurrentMatch('tatami1')).toEqual(matches[0])
    expect(schedulerStore.getNextMatch('tatami1')).toEqual(matches[1])

    await schedulerStore.next('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[1])
    expect(schedulerStore.getStats('tatami1')).toEqual({
      upcoming: 5,
      done: 1,
      total: 6,
    })

    await schedulerStore.previous('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[0])
    expect(schedulerStore.getStats('tatami1')).toEqual({
      upcoming: 6,
      done: 0,
      total: 6,
    })
  })

  test('test cycling through scheduling', async () => {
    const matches: Match[] = [
      {
        n: 0,
        fighter1Id: 'F1',
        fighter2Id: 'F2',
        poolId: 'Pool1',
        id: 'Pool1_0',
        tatamiScheduled: 'tatami1',
      },
      {
        n: 1,
        fighter1Id: 'F1',
        fighter2Id: 'F3',
        poolId: 'Pool1',
        id: 'Pool1_1',
        tatamiScheduled: 'tatami1',
      },
      {
        n: 2,
        fighter1Id: 'F1',
        fighter2Id: 'F4',
        poolId: 'Pool1',
        id: 'Pool1_2',
        tatamiScheduled: 'tatami1',
      },
    ]
    await schedulerStore.addMatches(matches)
    await schedulerStore.scheduleMatches({ tatamiId: 'tatami1', matches })

    await schedulerStore.previous('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[0])
    await schedulerStore.next('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[1])
    await schedulerStore.next('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[2])
    await schedulerStore.next('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[2])
    await schedulerStore.previous('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[1])
    await schedulerStore.previous('tatami1')
    expect(schedulerStore.getCurrentMatch('tatami1')).toStrictEqual(matches[0])
    await schedulerStore.previous('tatami1')
  })
})
