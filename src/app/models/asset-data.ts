import { Orientation } from './orientation'
import { BitmovinResult } from './bitmovin_result'

export class AssetData {
    public path: string;
    public type: string;
    public device: string;
    public same_for_all_orientation: Boolean;
    public orientation: Orientation[];
    public order_by: string;
    public sorting: string;
    public display_indexing: string;
    public duration: string;
    public bitmovin_result: BitmovinResult[];
}
