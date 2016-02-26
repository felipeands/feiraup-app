import {App, IonicApp, Events, Platform} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';
import {CityData} from './services/city-data';


@App({
  templateUrl: './build/app.html',
  providers: [CityData],
  config: {
    mode: 'md'
  }
})

export class MyApp {

  static get parameters() {
    return [[IonicApp], [Events], [CityData]];
  }

  constructor(app, events, cityData) {
    this.app = app;
    this.events = events;
    this.loggedIn = false;

    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];
  }

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
