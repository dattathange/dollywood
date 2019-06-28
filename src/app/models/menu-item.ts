import { menuCategoryItem } from './menu-category-item'
import { primaryNavigationOrientationData } from './primary-navigation-configuration'

export class menuItem {

    constructor() {
        this.orientation = [];
    }

    path: string;
    alias: string;
    type: string;
    same_for_all_orientation: boolean;
    is_header: boolean;
    is_burger: boolean;
    orientation: primaryNavigationOrientationData[];
    menu_category: menuCategoryItem[];
    order_by: string;
    sorting: string;
    display_indexing: number
}
