import { Orientation } from './orientation'

export class GenresData
{
    public path: string;
    public type: string;
    public alias: string;
    public device: string;
    public same_for_all_orientation: boolean;
    public orientation: Orientation[];
    public order_by: string;
     
}