import { AssetData } from './asset-data';
import { Genres } from './genres';
import { primaryNavigationModel } from './primary-navigation'
import { BitmovinResult } from './bitmovin_result'

export class Asset {
    public status: boolean;
    public type: string;
    public path: string;
    public same_for_all_geo_zone: boolean;
    public exclusion_text: string;
    public asset_name: string;
    public air_date: string;
    public end_date: string;
    public data: AssetData;
    public genre: Genres[];
    public primary_navigation: primaryNavigationModel[];
    public duration: string;
    public bitmovin_result:any;
}