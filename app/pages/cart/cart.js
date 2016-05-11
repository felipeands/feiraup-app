import {NavController, Page} from 'ionic-framework/index';
import {ButtonSearch} from '../../components/button-search';

@Page ({
  templateUrl: 'build/pages/cart/cart.html',
  directives: [ButtonSearch]
})

export class CartPage {

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
  }
}
