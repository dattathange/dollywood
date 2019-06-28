import {geoData} from './geo';
import {productType} from './product-type'
import {primaryNavigationData} from './primary-navigation-data';

import {PageCategory} from './page-category';
import {carousal} from './carousal';


export class primaryNavigationModel{
    status: boolean;
    type: string;
    path: string;
    alias: string;
    geoData: geoData[];
    same_for_all_geo_zone: boolean;
    exclusion_text: string;
    product_type: productType[];
    same_for_all_product_type: boolean;
    same_for_all_device_type: boolean;
    primary_navigation_data: primaryNavigationData[];
    page_category: PageCategory[];
    carousal: carousal[];
    //listing: listing[];
    seo:any;
}