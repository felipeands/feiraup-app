import {App, IonicApp, Events, Platform} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';
import {LoginPage} from './pages/login/login';

import {UserData} from './services/user-data';
import {CityData} from './services/city-data';
import {PlaceData} from './services/place-data';


@App({
  templateUrl: './build/app.html',
  providers: [CityData, PlaceData, UserData],
  config: {
    mode: 'md'
  }
})

export class MyApp {

  static get parameters() {
    return [[IonicApp], [Events], [CityData], [UserData]];
  }

  constructor(app, events, cityData, userData) {
    this.app = app;
    this.events = events;
    this.loggedIn = false;
    this.cityData = cityData;
    this.userData = userData;

    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];

    this.loggedOutPages = [
      {title: 'Entrar', component: LoginPage, icon: 'log-in'}
    ];

    this.loggedIn = this.userData.hasLoggedIn();

    if(this.loggedIn) {
      console.log('true');
    }

    console.log(this.userData.hasLoggedIn());

    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
      // console.log(hasLoggedIn);
      // this.loggedIn = (hasLoggedIn == 'true');
    // });

  }

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
