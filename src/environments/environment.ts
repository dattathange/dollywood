// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    baseURI: 'https://dollywoodplay.dev.dctinc.net',
    //baseURI: 'https://admin.dollywoodplay.com',
    apiURL: '/api/v1/',
    radiantMediaPlayerKey:'a2lvZWFtdGVid0AxNTE3NDkw',
    navigationAPI: 'navigation/updated',
    primaryNavigationAPI: 'primary_navigation',
    pageCategoryAPI: 'pagecategories',
    pageCategoryListingAPI: 'page_category_listing',
    assetDetailsAPI: 'asset',
    relatedVideosAPI: 'getrelatedvideos',
    suggestedVideosAPI:'getsuggestedvideos',
    favoritesURL: 'get/favourite',
    addToFavouritesURL: 'add/favourite',
    removeFromFavouritesURL: 'remove/favourite',
    addToWatchListURL: 'add/watchlist',
    watchListURL: 'get/watchlist',
    getProfileURL: 'get/profile',
    updateProfileURL: 'profile/update',
    updateProfilePictureURL: 'update/profile/picture',
    removeProfilePictureURL: 'remove/picture',
    searchUrl : 'search',
    addToSearchURL: 'add/search',
    genreAPI: 'genre',
    genreVideosAPI: 'genrevideos',
    homePagePath: '46'
};
