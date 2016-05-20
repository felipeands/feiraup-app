import {Page, NavController} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';

@Page({
  templateUrl: 'build/pages/shop/show-shop.html'
})

export class ShowShopPage {
  static get parameters() {
    return [[NavController],[ShopData]];
  }

  constructor(nav, shopData) {
    this.nav = nav;
    this.shopData = shopData;
  }
}