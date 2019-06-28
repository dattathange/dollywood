import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Headers} from '@angular/http'

export const primNavigationKey: string = "primary_navigation";
export const menuCategoryKey: string = "";
export const assetCategoryKey: string = "";
export const pageCategoryKey: string = "page_category_listing";
export const assetGroupKey: string = "";
export const assetKey: string = "asset";
export const carousalKey: string = "";
export const homePageNameKey: string = "home";
export const homePagePathKey: string = "46";
export const navigationKey: string = "navigation";
export const deviceTypeKey: string = "2"
export const defaultAssetImage: string = "/assets/images/default_image.png";
export const defaultAssetThumbnail: string = "/assets/images/favicon.png";
export const defaultUserImage: string = "/assets/images/profile.png"


export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  };

export const httpOptionsImage = {
    headers: new HttpHeaders({
        'Accept': 'application/json'
      })
  };
/*
export const bitmovinConfig: any = {
    "key": "c205d1e6-70ff-45b7-af5a-d6084de8c6ed" 
}


export const bitmovinconfigWithAnalytics:any = Object.assign({}, bitmovinConfig, {
    analytics: {
      key: '26008b07-dea7-4705-b6f8-6819e1db26c7',
      videoId: 'Getting Started Player'
    }
});
*/