import {primaryNavigationOrientationData} from './primary-navigation-configuration'
export class menuCategoryItem {
        constructor() {
            
        }
        path: string;
        alias:string;
        type: string;
        same_for_all_orientation: boolean;
        orientation: primaryNavigationOrientationData[];
    
}