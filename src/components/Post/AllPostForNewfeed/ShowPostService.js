import { enUS } from 'date-fns/locale';


export const customLocale = {
  ...enUS, 
  formatDistance: (token, count, options) => {

    const result = enUS.formatDistance(token, count, options);
    return result.replace('about ', ''); 
  },
};