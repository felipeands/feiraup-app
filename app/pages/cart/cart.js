import {NavController, Page} from 'ionic-framework/ionic';
// import {Footer} from '../components/footer';
// import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';

@Page ({
  templateUrl: 'build/pages/cart/cart.html',
  // directives: [Footer]
})

export class CartPage {

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {

    this.nav = nav;
    // this.http = http;

    // this.settings = new Settings();

    // var url = this.settings.url;

    // alert(url);

    // fetch('http://feiraup.ngrok.com/testes', {
    //   method: 'get'
    // }).then(function(response) {
    //   console.log('respondeu');
    // }).catch(function(err) {
    //   console.log('erro');
    // })

  }
}
