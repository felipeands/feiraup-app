import {Page, NavController} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';
import {PlaceData} from '../../services/place-data';
import {ShowShopPage} from '../shop/show-shop';
import {FieldCategories} from '../../components/field-categories';

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
  `],
  directives: [FieldCategories]
})

export class SearchPage {
  searchQuery;

  static get parameters() {
    return [[NavController],[ShopData],[PlaceData]];
  }

  constructor(nav, shopData, placeData) {
    this.nav = nav;
    this.shopData = shopData;
    this.placeData = placeData;
    this.shops = [];
    this.isAdvancedSearch = false;
    this.getCurrentPlace();
  }

  onGetShops(searchBar) {
    if (searchBar.value && searchBar.value != ""){
      this.search(searchBar.value);
    }
  }

  search(query) {
    this.shopData.searchShop(query, this.placeId).then((data) => {
      this.shops = data.shops;
    });
  }

  onOpenShop(shop) {
    this.nav.push(ShowShopPage, {shop: shop});
  }

  categoriesChange(selected) {
    this.selectedCategories = selected;
    console.log(this.selectedCategories);
  }

  onAdvancedSearch() {
    this.isAdvancedSearch = this.isAdvancedSearch ? false : true;
  }

  getCurrentPlace() {
    this.placeData.getCurrent().then((data) => {
      this.placeId = data;
    })
  }
}
