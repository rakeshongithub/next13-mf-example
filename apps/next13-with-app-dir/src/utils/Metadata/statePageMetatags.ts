import { pageMetaProps } from '@/models/aemModels';
import envConfig from '@src/environments/environment';
import { replaceContent } from '../commonUtils';
import { getAemContent, getLocalStr } '../jsUtils';
import { toCamelCase } from '../stateCityAddress';
import defaultMetaTags from './defaultMetaTags';
import { type } from 'os';


export type PathSegmentType = {
    locale: string;
    state?: string;
    city?: string;
    branchName?: string;
}

const statePageMetaTags = (metaTags: pageMetaProps, params: PathSegmentType) => {
    const { state, city, branchName, locale } = params;
    const localeStr = getLocalStr(locale);

    if(state && !city && !branchName) {
        const stateName = toCamelCase(state);
        const ltpTitle = getAemContent(metaTags, 'lptStateCityPageTitle');
        const ltpDesc = getAemContent(metaTags, 'ltpStateCityPageDesc');
        const title = replaceContent(ltpTitle, /{stateCityName}/, stateName);
        const description = replaceContent(ltpDesc, /{stateCityName}/, stateName);
        const metaProps = { title, description };
        const pageUrl = `${envConfig.appHostName}${envConfig.basePath}${localeStr}/${state}/`;
        return {
            ...defaultMetaTags({locale, metaProps}),
            openGraph: {
                url: pageUrl,
                siteName: `${envConfig.appHostName}${envConfig.basePath}/`,
                title,
                description
            },
            twitter: {
                title,
                description
            },
            alternates: {
                canonical: pageUrl
            }
        };
    }

    return {};
};

export default statePageMetaTags;