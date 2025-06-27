import {getRequestConfig} from 'next-intl/server';

// This file provides the messages for each request based on the `locale` param.
// next-intl looks for a default export of `getRequestConfig`.
export default getRequestConfig(async ({locale}) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
