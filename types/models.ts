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
  system: string
  status: string
  tatamiScheduled: string | null
  competitors: Competitor[]
  generated: boolean
  generationSource: PoolGenerationSource | null
  criteria: PoolCriteria | null
}
