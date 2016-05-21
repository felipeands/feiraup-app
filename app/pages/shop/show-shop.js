import {Page, NavController, NavParams} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';

@Page({
  templateUrl: 'build/pages/shop/show-shop.html'
})

export class ShowShopPage {
  static get parameters() {
    return [[NavController],[NavParams],[ShopData]];
  }

  constructor(nav, navParams, shopData) {
    this.nav = nav;
    this.id = navParams.get('id');
    this.shopData = shopData;
    this.shop = null;
    this.loadShop();
  }

  loadShop() {
    this.shopData.loadShop(this.id).then((data) => {
      this.shop = data.shop;
    });
  }
}