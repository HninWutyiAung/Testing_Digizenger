import { enUS } from 'date-fns/locale';

// Custom locale object
export const customLocale = {
  ...enUS, // Copy default locale settings
  formatDistance: (token, count, options) => {
    // Remove 'about' from the output
    const result = enUS.formatDistance(token, count, options);
    return result.replace('about ', ''); // Replace "about " with an empty string
  },
};