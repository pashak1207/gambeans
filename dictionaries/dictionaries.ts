import 'server-only'
import { IDictionary } from './type';

const dictionaries: Record<string, () => Promise<any>>  = {
  en: async (): Promise<IDictionary> => import('./en.json').then((module) => module.default),
  he: async (): Promise<IDictionary> => import('./he.json').then((module) => module.default),
}

const cache: Record<string, IDictionary> = {};

export const getDictionary = async (locale = "en"): Promise<IDictionary> => {
  try{
    if (!cache[locale]) {
      cache[locale] = await dictionaries[locale]();
    }
    
    return cache[locale]
  }catch(err){
    console.log("Error to get current locale: " + err);

    if (!cache["en"]) {
      cache["en"] = await dictionaries["en"]();
    }

    return cache["en"];    
  }
}