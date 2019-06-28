import { Orientation } from './orientation'

export class Genres {
    public path: string;
    public type: string;
    public alias: string;
    public same_for_all_geo_zone: boolean;
    public exclusion_text: string;
    public device: string;
    public orientation: Orientation[];
}