import { Component, OnInit } from '@angular/core';
import {favoriteItem, favoriteItemsData} from '../../../models/favoritesItem';
import {WatchlistService} from '../../../globalservices/watchlist/watchlist.service'
import { Router, ActivatedRoute } from '@angular/router';
import {defaultAssetImage} from '../../../configurations/configuration'
import { Navigationshared } from '../../../globalservices/sharedservices/navigationshared.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  userWatchList: favoriteItem = new favoriteItem;

  constructor(private watchListService: WatchlistService,
  private route: Router,
private navigationSharedService: Navigationshared) {

  }

  ngOnInit() {
      this.navigationSharedService.receiveNavigationChanged('watchlist');
      this.bindUserWatchList();

      this.bindPageTitle();

  }

  bindUserWatchList() {

    let uid = sessionStorage.getItem('ud');
            //console.log(uid);
    if (uid !== undefined && uid != null) {
      this.watchListService.getUserWatchList(uid)
        .subscribe(
          result => {
              //console.log(result);

              let watchListData = [];
              if(result.data != undefined)
                for(let item of result.data) {
                  if(item.orientation[0].image == undefined || item.orientation[0].image.length == 0)
                    item.orientation[0].image = defaultAssetImage;
                    item.url = 'video/'+ item.orientation[0].title.trim().toLowerCase().replace(/\s+/g, '-') + '/' + item.path
                  watchListData.push(item);
                }

              if(result.data != undefined)
                this.userWatchList.data = watchListData;
              else
                this.userWatchList.data = [];
          }
      );
    }
    else {
      this.route.navigate(['']);
    }
  }

  itemClicked(slide) {
//    console.log(slide);
        let _t = slide.orientation[0].title.trim().toLowerCase();
        _t = _t.replace(/\s+/g, '-');
        this.route.navigate(['/video/'+ _t + '/' + slide.path ]);

  }

    bindPageTitle() {
        this.navigationSharedService.routerDataLoaded('Watch List');
    }



}
