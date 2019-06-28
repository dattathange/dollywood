export class favoriteItemsData {
    image: string;
    desc: string;
    name: string;
    path: string;
    id: string;
    asset_id: string;
    orientation: any[];
    url: string;
}

export class favoriteItem {
    status: boolean;
    msg: string;
    data: favoriteItemsData[]
}