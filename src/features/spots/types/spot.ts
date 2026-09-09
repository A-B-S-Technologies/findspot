export type SpotCategory = 'falls' | 'hot-spring' | 'mountain' | 'resort' | 'heritage'

export type Spot = {
  id: string
  name: string
  municipality: string
  category: SpotCategory
  rating: number
  reviewCount: number
  imageUrl: string
}

export type SpotSearchParams = {
  location?: string
  checkIn?: string
  checkOut?: string
  people?: string
  page?: number
  perPage?: number
}
