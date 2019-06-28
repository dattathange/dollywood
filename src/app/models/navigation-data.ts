import { Orientation } from './orientation'
import { MenuCategory } from './menu-category';

export class NavigationData
{
    public path: string;
    public alias: string;
    public type: string;
    public device: string;
    public same_for_all_orientation: boolean;
    public orientation: Orientation[];
    public order_by: string;
    public sorting: string;
    public display_indexing: number;
    public menu_category: MenuCategory[];
    public extraStyle: any = {};
     
}