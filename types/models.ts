export enum CompetitorStatus {
  Registered = 'Registered',
  CheckedIn = 'Checked in',
}

export interface Competitor {
  id: string
  firstname: string
  lastname: string
  sex: string
  birthyear: number
  club: string
  weight: number
  weightMeasured: number | null
  pools?: Pool[]
  status?: CompetitorStatus
}

export interface WeightClass {
  name: string
  weightFrom: number
  weightTo: number
}
export interface Category {
  id: number
  name: string
  sex: string
  ageFrom: number
  ageTo: number
  weights: WeightClass[]
}

export interface PoolGenerationSource {
  id: string
  name: string
}

export interface PoolCriteria {
  sex: string
  ageFrom: number
  ageTo: number
  weightFrom: number
  weightTo: number
}

export interface Pool {
  id: string
  name: string
  system: PoolSystem
  status: PoolState
  tatamiScheduled: string | null
  competitors: Competitor[]
  generated: boolean
  generationSource: PoolGenerationSource | null
  criteria: PoolCriteria | null
}

export enum PoolState {
  READY = 'ready',
  NOT_READY = 'not ready',
}

export enum PoolSystem {
  ROUND_ROBIN = 'Round Robin',
  BRESIL = 'Bresil',
}

export interface Match {
  n: number
  fighter1Id: string // Competitor Id
  fighter2Id: string
  poolId: string
}

export interface SchedulerStats {
  upcoming: number
  done: number
}
