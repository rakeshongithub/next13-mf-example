import { commonDataService } from '../commonUtils';
import { getAemContent } from '../jsUtils';
import logger from '@/src/utils/logger';
import { fallbackMetaData } from './fallbackMetadata';
import { Metadata } from 'next';
import statePageMetaTags from './statePageMetaTags';
import defaultMetaTags from './defaultMetaTags';
import essentialMetaTags from './essentialMetaTags';
import cityPageMetaTags from './cityPageMetaTags';
import branchPageMetaTags, { getBranchData } from './branchPageMetaTags';
import { locationsType } from '@/model/locatorApi/LoationsType';

const moduleName = 'APP_LAYOUT_META_DATA';

type ParamsProps = {
    locale: string;
    state?: string;
    city?: string;
    branchName?: string;
};

type MetaDataProps = {
    params: ParamsProps
};

export async function generateMetaData({params}: MetaDataProps): Promise<Metadata> {
    let branchData: locationsType | null = null;
    const pageMetaTags = {
        ...fallbackMetaData,
        ...essentialMetaTags
    };

    try {
        const { locale, branchName } = params;
        const { locationResponse, allBranches } = await commonDataService({locale});

        if(branchName) {
            branchData = await getBranchData(params, allBranches);
        }

        const { metaTags } = locationResponse ?? {};
        const defaultMetaProps = {
            title: getAemContent(metaTags, 'ltpLandingPageTitle'),
            description: getAemContent(metaTags, 'ltpLandingPageDesc')
        };

        return {
            ...pageMetaTags,
            ...defaultMetaTags({locale, metaProps: defaultMetaProps}),
            ...statePageMetaTags(metaTags, params),
            ...cityPageMetaTags(metaTags, params),
            ...branchPageMetaTags(metaTags, params, branchData),
            icons: {
                icon: getAemContent(locationResponse, 'favIconPath')
            }
        }
    } catch (err: any) {
        logger.error({
            moduleName,
            message: 'Failed to generate meta data',
            errorMessage: err?.message,
            errorStack: err
        });
        return pageMetaTags;
    }
}