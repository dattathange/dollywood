import { Component, OnInit } from '@angular/core';
import {favoriteItem, favoriteItemsData} from '../../../models/favoritesItem';
import {FavoritesService} from '../../../globalservices/favorites/favorites.service'
import { Router, ActivatedRoute } from '@angular/router';
import {defaultAssetImage} from '../../../configurations/configuration'
import {Navigationshared} from '../../../globalservices/sharedservices/navigationshared.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  userFavorites: favoriteItem = new favoriteItem(); 
  removeFavoriteClicked: boolean = false;
  itemToBeRemoved = '' ;

  constructor(private favoritesService: FavoritesService,
  private route: Router,
private navigationSharedService: Navigationshared) { }

  ngOnInit() {
    this.navigationSharedService.receiveNavigationChanged('favorites');
    this.bindUserFavorites();
    this.bindPageTitle();
  }

  bindUserFavorites() {

    let uid = sessionStorage.getItem('ud');
    //console.log(uid);
    if (uid !== undefined && uid != null) {
          this.favoritesService.getUserFavorites(uid)
            .subscribe(
                result => {
                    //console.log(result);

                    let watchListData = [];
                    if(result.data != undefined)
                      for(let item of result.data) {
                        if(item.orientation[0].image == undefined || item.orientation[0].image.length == 0)
                          item.orientation[0].image = defaultAssetImage;
                        watchListData.push(item);
                      }

                    
                    if(result.data != undefined) 
                      this.userFavorites.data = watchListData;
                    else
                      this.userFavorites.data = [];
                }
            );
          }
          else {
            this.route.navigate(['']);
          }
  }

  itemClicked(slide) {
    //console.log(slide);
        let _t = slide.orientation[0].name.trim().toLowerCase();
        _t = _t.replace(/\s+/g, '-');
        this.route.navigate(['video/'+ _t + '/' + slide.path ]);
    
  }

  removeFromFavoriteClicked(item) {
    this.removeFavoriteClicked = true;
    this.itemToBeRemoved = item.path;
  }

  confirmRemoveFavorite () {
     let uid = sessionStorage.getItem('ud');
     this.favoritesService.removeUserFavorite(uid, this.itemToBeRemoved)
     .subscribe(
         result => {
          //console.log(result);
          this.bindUserFavorites();
      })
      this.removeFavoriteClicked = false;
      this.itemToBeRemoved = '';
  }

  cancelRemoveFavorite() {
    this.removeFavoriteClicked = false;
    this.itemToBeRemoved = '';
  }

    bindPageTitle() {
        this.navigationSharedService.routerDataLoaded('Favourites');
    }

}
