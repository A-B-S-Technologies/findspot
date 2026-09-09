/**
 * Every local government unit in Laguna: 6 cities and 24 municipalities,
 * alphabetical. The municipalities matter as much as the cities here — Paete,
 * Pagsanjan and Los Baños are among the province's better known destinations.
 */
export const LAGUNA_LOCATIONS = [
  'Alaminos',
  'Bay',
  'Biñan',
  'Cabuyao',
  'Calamba',
  'Calauan',
  'Cavinti',
  'Famy',
  'Kalayaan',
  'Liliw',
  'Los Baños',
  'Luisiana',
  'Lumban',
  'Mabitac',
  'Magdalena',
  'Majayjay',
  'Nagcarlan',
  'Paete',
  'Pagsanjan',
  'Pakil',
  'Pangil',
  'Pila',
  'Rizal',
  'San Pablo',
  'San Pedro',
  'Santa Cruz',
  'Santa Maria',
  'Santa Rosa',
  'Siniloan',
  'Victoria',
] as const

export const LAGUNA_CITY_COUNT = 6
export const LAGUNA_MUNICIPALITY_COUNT =
  LAGUNA_LOCATIONS.length - LAGUNA_CITY_COUNT
