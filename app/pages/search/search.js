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
    this.shops = [];
  }

  onGetShops(searchBar) {
    if (searchBar.value && searchBar.value != ""){
      this.search(searchBar.value);
    }
  }

  search(query) {
    this.shopData.searchShop(query).then((data) => {
      this.shops = data.shops;
    });
  }

  onOpenShop(shop) {
    this.nav.push(ShowShopPage, {shop: shop});
  }
}
