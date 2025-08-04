import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'hi'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // this is for diabling locale detection AND cookie setting
  // if you want to enable locale detection, set it to true
   localeDetection: false,
   localeCookie: false
});