export type HeroSlide = {
  id: string
  image: string
  title: [string, string]
  description: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'horizon',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80',
    title: ['Explore New Horizon', '& Discover Laguna'],
    description:
      "Findspot is your one-stop destination for expert recommendations on the best tourism spots around the Laguna. Explore with confidence, guided by our community's firsthand experiences and travel wisdom.",
  },
  {
    id: 'waterfalls',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=80',
    title: ['Chase Waterfalls', '& Hidden Trails'],
    description:
      'From the falls of Pagsanjan to the quiet ridges of Mount Makiling, find the routes worth taking and the viewpoints worth the climb.',
  },
  {
    id: 'lakeside',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80',
    title: ['Rest by the Lake', '& Stay a While'],
    description:
      'Hot springs, lakeside stays and family resorts — handpicked places to unwind, reviewed by travellers who have actually been there.',
  },
]
