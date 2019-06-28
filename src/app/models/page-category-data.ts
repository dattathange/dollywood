import { Orientation } from './orientation'

export class PageCategoryData
{
    public path: string;
    public type: string;
    public device: string;
    public same_for_all_orientation: boolean;
    public orientation: Orientation[];
    public order_by: string;
    public sorting: string;
    public display_indexing: number;
    public duration: string;
}