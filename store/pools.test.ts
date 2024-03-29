import firebase from 'firebase/app'

import { poolsStore, schedulerStore, competitorsStore } from './'
import { Competitor, Pool, PoolSystem, PoolState } from '~/types/models'

describe('store/pools', (): void => {
  let poolId: string
  let competitor1Id: string
  let competitor2Id: string
  let competitor3Id: string

  beforeEach(async (): Promise<void> => {
    await firebase.database().ref('/').remove()

    await poolsStore.init()
    await schedulerStore.init()

    const competitor1: Competitor = {
      id: '',
      firstname: 'A',
      lastname: 'B',
      sex: 'male',
      birthyear: 1990,
      club: 'JACW',
      weight: 90,
      weightMeasured: 90,
    }
    const competitor2: Competitor = {
      id: '',
      firstname: 'B',
      lastname: 'B',
      sex: 'male',
      birthyear: 1990,
      club: 'JACW',
      weight: 90,
      weightMeasured: 90,
    }
    const competitor3: Competitor = {
      id: '',
      firstname: 'C',
      lastname: 'B',
      sex: 'male',
      birthyear: 1990,
      club: 'JACW',
      weight: 90,
      weightMeasured: 90,
    }
    await competitorsStore.add(competitor1)
    await competitorsStore.add(competitor2)
    await competitorsStore.add(competitor3)
    competitor1Id = competitor1.id
    competitor2Id = competitor2.id
    competitor3Id = competitor3.id

    const pool: Pool = {
      id: '', // will be filled once added
      name: 'pool1',
      system: PoolSystem.ROUND_ROBIN,
      status: PoolState.NOT_READY,
      tatamiScheduled: null,
      competitors: [],
      generated: false,
      generationSource: null,
      criteria: null,
    }
    await poolsStore.add(pool)
    poolId = pool.id
    await poolsStore.addCompetitorToPool({ competitor: competitor1, pool })
    await poolsStore.addCompetitorToPool({ competitor: competitor2, pool })
    await poolsStore.addCompetitorToPool({ competitor: competitor3, pool })
  })

  test('test pool pushing to schedule & generating roundrobin matches', async () => {
    const pool = poolsStore.getPoolById(poolId)
    await poolsStore.ready(pool!)
    expect(schedulerStore.matches).toEqual([
      {
        n: 0,
        fighter1Id: competitor1Id,
        fighter2Id: competitor2Id,
        poolId,
        id: `${poolId}_0`,
      },
      {
        n: 1,
        fighter1Id: competitor1Id,
        fighter2Id: competitor3Id,
        poolId,
        id: `${poolId}_1`,
      },
      {
        n: 2,
        fighter1Id: competitor2Id,
        fighter2Id: competitor3Id,
        poolId,
        id: `${poolId}_2`,
      },
    ])
  })

  test('test pool taking back & removing matches', async () => {
    const pool = poolsStore.getPoolById(poolId)
    await poolsStore.ready(pool!)
    await poolsStore.notReady(pool!)
    expect(schedulerStore.matches).toEqual([])
  })

  test('test return error when 0 competitors in pool taking back & removing matches', async () => {
    const pool: Pool = {
      id: '', // will be filled once added
      name: 'pool2',
      system: PoolSystem.ROUND_ROBIN,
      status: PoolState.NOT_READY,
      tatamiScheduled: null,
      competitors: [],
      generated: false,
      generationSource: null,
      criteria: null,
    }
    await poolsStore.add(pool)
    // competitor is not [] once in firebase, that's why refetch is needed
    const p = poolsStore.getPoolById(pool.id)
    const t = async () => {
      await poolsStore.ready(p!)
    }
    await expect(t).rejects.toThrow('has no competitors')
  })
})
