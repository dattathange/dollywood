import { Orientation } from './orientation'
import { PageCategoryData } from './page-category-data'

export class PageCategoryListing {
    public status: boolean;
    public path: string;
    public type: string;
    public same_for_all_geo_zone: boolean;
    public display_type: string;
    public exclusion_text: string;
    public same_for_all_device_type: boolean;
    public orientation: Orientation[];
    public data: PageCategoryData[]
}