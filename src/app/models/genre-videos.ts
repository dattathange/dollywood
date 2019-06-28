import { Orientation } from './orientation'
import { AssetData } from './asset-data';

export class GenreVideos {
    public status: boolean;
    public type: string;
    public orientation: Orientation[];
    public data: AssetData[];
    public duration: string;
}