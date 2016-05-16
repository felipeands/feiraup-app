import {Page} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';

@Page ({
  templateUrl: 'build/pages/search/search.html',
  styles: [`
  .icon {
    position: relative;
    z-index: 10;
  }
  [fab-top] {
    top: -34px;
  }
  .results {
    margin: 20px 0 50px;
  }
  `]
})

export class SearchPage {
  searchQuery;

  static get parameters() {
    return [[ShopData]];
  }

  constructor(shopData) {
    this.shopData = shopData;

    this.shops = [
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/badu-live.png'},
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/advance-card-map-mario.png'},
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/card-sf.png'},
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/badu-live.png'},
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/advance-card-map-mario.png'},
    {name: 'teste', image: 'http://ionicframework.com/dist/preview-app/www/img/card-sf.png'},
    ];
  }

  onGetShops(searchBar) {
    if (searchBar.value && searchBar.value != ""){
      this.shopData.searchShop(searchBar.value).then((data) => {
        this.shops = data.shops;
      });
    }
  }
}
