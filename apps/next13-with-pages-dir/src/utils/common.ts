import stateCityAdvisors from "@/_mocks_/stateCityAdvisors.json";
import { i18nConfig } from "@/i18nConfig";
import flatMapDeep from "lodash/flatMapDeep";
import uniqBy from "lodash/unionBy";

export const transformStateCity = () => {
  const arrayOfObj = Object.values(stateCityAdvisors.stateCityAdvisors);
  const allAdvisorsData = arrayOfObj?.map((item) => Object.values(item));
  const allAdvisors = flatMapDeep(allAdvisorsData);
  const stateLists = uniqBy(allAdvisors, "state");
  return { allAdvisors, stateLists };
};

export const createPageRoutes = (stateLists: any) => {
  return stateLists.map((item: any) => {
    return {
      state: item.state,
      city: item.city,
    };
  });
};

export const getPathSegments = (pathname: string) => {
  // Split the path into parts
  let parts = pathname.split('/').filter(Boolean);

  // Initialize the result object with default values
  let result: {
    locale: string;
    landingPage: string | null;
    state: string | null
    city: string | null;
    branch: string | null
  } = {
      locale: i18nConfig.defaultLocale,
      landingPage: null,
      state: null,
      city: null,
      branch: null
  };

  // Check if the first part is a locale
  if (parts[0] === 'es') {
      result.locale = parts.shift() ?? i18nConfig.defaultLocale;
  }

  // Check if the first part is a landingPage
  if (parts[0] === 'search') {
      result.landingPage = parts.shift() ?? null;
  }

  // Assign the rest of the parts to the result object
  if (parts.length) result.state = parts.shift() ?? null;
  if (parts.length) result.city = parts.shift() ?? null;
  if (parts.length) result.branch = parts.shift() ?? null;

  return result;
}
