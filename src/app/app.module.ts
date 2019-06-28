import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from "ng2-dropdown";
import {GlobalNavData} from './utilities/globalNavigationData'
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgFallbackModule } from 'ng2-img-fallback';

import { NavigationService } from './globalservices/navigation/navigation.service';
import { AssetsService } from './globalservices/assets/assets.service';
import { PrimaryNavigationService } from './globalservices/primary-navigation/primary-navigation.service';
import { PageCategoryService } from './globalservices/page-category/pagecategory.service';
import { PageCategoryListingService } from './globalservices/page-category-listing/pagecategorylisting.service';
import { FavoritesService } from './globalservices/favorites/favorites.service';
import { WatchlistService } from './globalservices/watchlist/watchlist.service';
import { LoginService } from './globalservices/login/login.service';
import { GenresService } from './globalservices/genres/genres.service';
import {GenreAssetlistingComponent} from './components/genreassetlisting/genreassetlisting.component'
import {RelatedvideosService} from './globalservices/relatedvideos/relatedvideos.service'

import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account/account.component';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { WatchlistComponent } from './components/watchlist/watchlist/watchlist.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MaincontentComponent } from './components/maincontent/maincontent.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { PageCategorylistingComponent } from './components/pagecategorylisting/pagecategorylisting.component';
import { VideodetailComponent } from './components/videodetail/videodetail.component';
import { CarousalComponent } from './components/carousal/carousal.component';
import { PagecategoryComponent } from './components/pagecategory/pagecategory.component';
import { GenrelistingComponent } from './components/genrelisting/genrelisting.component';
import { SearchComponent } from './components/search/search/search.component';
import { SearchService } from './globalservices/search/search.service';
import { AccountService } from './globalservices/account/account.service';
import { DisqusModule } from "ngx-disqus";
import {
    SocialLoginModule, 
    AuthServiceConfig,
    GoogleLoginProvider, 
    FacebookLoginProvider, 
    LinkedinLoginProvider,
    AuthService
} from 'ng4-social-login';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import {TabModule} from 'angular-tabs-component';
import { FooterpageComponent } from './components/footerpage/footerpage.component';

import { LoaderService } from './globalservices/sharedservices/loader.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { CookieService } from 'ngx-cookie-service';
import { ChooseLanguageComponent } from './components/choose-language/choose-language.component';


const appRoutes: Routes = [
    { path: 'category/:name/list/:id', component: PageCategorylistingComponent },
    { path: 'video/:name/:id', component: VideodetailComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/account', component: AccountComponent },
    { path: 'user/favorites', component: FavoritesComponent },
    { path: 'user/watchlist', component: WatchlistComponent },
    { path: 'web/search/:searchterm', component: SearchComponent },
    { path: 'genres', component: GenrelistingComponent },
    { path: 'genre/:name/list/:id', component: GenreAssetlistingComponent },
    { path: 'footer/:name', component: FooterpageComponent },
    { path: 'language', component: ChooseLanguageComponent },
    {
        path: ':name', component: MaincontentComponent
    },
    
    { path: '', component: MaincontentComponent },
  
    { path: '**', component: ChooseLanguageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MaincontentComponent,
        FooterComponent,
        NavigationComponent,
        PageCategorylistingComponent,
        VideodetailComponent,
        CarousalComponent,
        PagecategoryComponent,
        LoginComponent,
        AccountComponent,
        FavoritesComponent,
        WatchlistComponent,
        LoginComponent,

        SearchComponent,
        GenrelistingComponent,
        GenreAssetlistingComponent,
        FooterpageComponent,
        ChooseLanguageComponent
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } 
        ),
        DropdownModule,
        OwlModule,
        BrowserAnimationsModule,
        DisqusModule.forRoot('dcafe-1'),
        Ng2ImgFallbackModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
        TabModule,
        InfiniteScrollModule,
        ClickOutsideModule
    ],
    providers: [NavigationService, AssetsService, PrimaryNavigationService, 
        LoginService,GlobalNavData, FavoritesService, PageCategoryService,
        PageCategoryListingService,
        WatchlistService, SearchService,GenresService, AccountService,
        RelatedvideosService, LoaderService,CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
