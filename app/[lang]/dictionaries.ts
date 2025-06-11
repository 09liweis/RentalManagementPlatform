// import 'server-only'
 
const dictionaries:any = {
  'en-CA': () => import('@/dictionaries/en-CA.json').then((module) => module.default),
  'zh-CN': () => import('@/dictionaries/zh-CN.json').then((module) => module.default),
}
 
export const getDictionary = async (locale:string) => dictionaries[locale]();