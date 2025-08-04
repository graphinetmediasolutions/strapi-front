export const mapFrontendLocaleToStrapi = (locale: string) => {
  switch (locale) {
    case "hi":
      return "hi-IN";
      
    case "en":
    default:
      return "en";
  }
};