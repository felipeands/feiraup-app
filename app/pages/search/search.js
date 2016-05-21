import {Page, NavController} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';
import {ShowShopPage} from '../shop/show-shop';

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
    return [[NavController],[ShopData]];
  }

  constructor(nav, shopData) {
    this.nav = nav;
    this.shopData = shopData;

    this.shops = [
      {
        id: 1,
        name: 'teste',
        description: 'alguma descrição',
        image: 'http://ionicframework.com/dist/preview-app/www/img/badu-live.png'
      }
    ];
  }

  onGetShops(searchBar) {
    if (searchBar.value && searchBar.value != ""){
      this.shopData.searchShop(searchBar.value).then((data) => {
        this.shops = data.shops;
      });
    }
  }

  onOpenShop(shop) {
    this.nav.push(ShowShopPage, {
      id: shop.id
    });
  }
}
