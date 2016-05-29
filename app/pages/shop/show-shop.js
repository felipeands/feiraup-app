import {Page, NavController, NavParams} from 'ionic-framework/index';
import {ShopData} from '../../services/shop-data';

@Page({
  templateUrl: 'build/pages/shop/show-shop.html',
  styles: [`
    .content {
      background: #fff;
    }
    .categories {
      margin-top: 20px;
      font-weight: 700;
    }
  `]
})

export class ShowShopPage {
  static get parameters() {
    return [[NavController],[NavParams],[ShopData]];
  }

  constructor(nav, navParams, shopData) {
    this.nav = nav;
    this.categoryNames = [];
    this.shopData = shopData;
    this.shop = navParams.get('shop');
    this.loadShop();
  }

  loadShop() {
    this.shopData.loadShop(this.shop.id).then((data) => {
      this.shop = data.shop;
      this.categoryNames = data.categories.map((cat) => {
        return cat.name;
      });
    });
  }
}