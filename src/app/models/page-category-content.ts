import { Orientation } from './orientation'
import {PageCategoryData} from './page-category-data'

export class PageCategoryContent {
    public path: string;
    public type: string;
    public device: string;
    public same_for_all_orientation: boolean;
    public orientation: Orientation[];
    public data: PageCategoryData[];
    public display_indexing: string;
    public display_type: string;
}