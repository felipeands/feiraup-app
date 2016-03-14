import {App, IonicApp, Events, Platform, Alert} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';

import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';
import {LoginPage} from './pages/login/login';
import {NewRoutePage} from './pages/route/new-route';

import {UserData} from './services/user-data';
import {CityData} from './services/city-data';
import {PlaceData} from './services/place-data';
import {OptionData} from './services/option-data';


@App({
  templateUrl: './build/app.html',
  providers: [CityData, PlaceData, UserData, OptionData],
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
    this.loggedRole = false;
    this.cityData = cityData;
    this.userData = userData;

    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];

    this.adminPages = [
      {title: 'Novo local', component: NewRoutePage, icon: 'map'}
    ];

    this.loggedOutPages = [
      {title: 'Entrar', component: LoginPage, icon: 'log-in'}
    ];

    this.loggedInPages = [
      {title: 'Deslogar', component: LoginPage, icon: 'log-out'}
    ];

    this.listenToEvents();

  }

  openPage(page) {
    let nav = this.app.getComponent('nav');

    if(page.title === 'Deslogar') {
      let alert = Alert.create({
        title: 'Confirmação',
        message: 'Deseja mesmo sair da sua conta?',
        buttons: ['Não',
          {
            text: 'Sim',
            handler: () => {
              this.userData.logout();
            }
          }
        ]
      });
      nav.present(alert);
    } else {
      nav.setRoot(page.component);
    }
  }

  listenToEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
      this.loggedRole = this.userData.loggedRole;
    });

    this.events.subscribe('user:logout', () => {
      console.log('deslogou');
      this.loggedIn = false;
      this.loggedRole = false;
    })
  }
}
