import {App, IonicApp, Events, Platform, Alert} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';

import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';
import {LoginPage} from './pages/login/login';
import {NewRoutePage} from './pages/route/new-route';
import {ShowRoutesPage} from './pages/route/show-routes';
import {NewGalleryPage} from './pages/gallery/new-gallery';

import {UserData} from './services/user-data';
import {CityData} from './services/city-data';
import {PlaceData} from './services/place-data';
import {MapData} from './services/map-data';
import {RouteData} from './services/route-data';
import {GalleryData} from './services/gallery-data';
import {Options} from './options';



@App({
  templateUrl: './build/app.html',
  providers: [CityData, PlaceData, UserData, MapData, RouteData, GalleryData, Options],
  config: {
    // mode: 'md'
  }
})

export class MyApp {

  static get parameters() {
    return [[IonicApp], [Events], [UserData]];
  }

  constructor(app, events, userData) {
    this.app = app;
    this.events = events;
    this.loggedIn = false;
    this.loggedRole = false;
    this.userData = userData;

    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];

    this.adminPages = [
      {title: 'Caminhos e Galerias', component: ShowRoutesPage, icon: 'map'}
      {title: 'Novo caminho', component: NewRoutePage, icon: 'map'},
      {title: 'Nova galeria', component: NewGalleryPage, icon: 'map'},
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
