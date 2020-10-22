export const API_URL = 'https://service.sovetromantica.com/v1/list?limit=20'
export const SR_IMAGE_URL = (id: string, slug: string) => `https://chitoge.sovetromantica.com/anime/${id}_${slug}/images/${id}.jpg`
export const ANIME_URL = (id: string) => `https://service.sovetromantica.com/v1/anime/${id}`
export const ANIME_FIRST_EPISODE_URL = (id: string, slug: string) => `https://scu2.sovetromantica.com/anime/${id}_${slug}/images/episode_1_sub.jpg`