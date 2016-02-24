import {App, IonicApp, Events, Platform} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';


@App({
  templateUrl: './build/app.html',
  // template: '<ion-nav [root]="rootPage" swipe-back-enabled="false"></ion-nav>',
  prodivers: [],
  config: {
    // mode: 'ios'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {

  static get parameters() {
    return [[IonicApp], [Events]]
  }

  constructor(app, events) {
    this.app = app;
    this.events = events;
    this.loggedIn = false;

    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];

    // root.config.set('ios','url','teste');
    // alert(platform.config.get('url'));

    // platform.ready().then(() => {

    // });
  }

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
