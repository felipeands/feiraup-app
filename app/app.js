import {App, IonicApp, Events, Platform, Alert} from 'ionic-framework/index';
import {Inject} from 'angular2/core';

import {RandomPage} from './pages/random/random';
import {CartPage} from './pages/cart/cart';
import {LocationPage} from './pages/location/location';
import {LoginPage} from './pages/login/login';
import {NewPlacePage} from './pages/place/new-place';
import {NewRoutePage} from './pages/route/new-route';
import {NewGalleryPage} from './pages/gallery/new-gallery';
import {ShowPlacePage} from './pages/place/show-place';
import {NewShopPage} from './pages/shop/new-shop';

import {UserData} from './services/user-data';
import {CityData} from './services/city-data';
import {PlaceData} from './services/place-data';
import {MapData} from './services/map-data';
import {RouteData} from './services/route-data';
import {GalleryData} from './services/gallery-data';
import {ShopData} from './services/shop-data';
import {CategoryData} from './services/category-data';
import {ImageData} from './services/image-data';
import {Options} from './options';


@App({
  templateUrl: './build/app.html',
  providers: [
    CityData,
    PlaceData,
    UserData,
    MapData,
    RouteData,
    GalleryData,
    ShopData,
    CategoryData,
    ImageData,
    Options
  ],
  config: {
    mode: 'md'
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

    // this.root = NewShopPage;
    this.root = LocationPage;

    this.footerPages = [
      {title: 'Aleatório', component: RandomPage, icon: 'sync', fab: 'fab-left'},
      {title: '', component: CartPage, icon: 'cart', fab: 'fab-center'},
      {title: 'Localização', component: LocationPage, icon: 'navigate', fab: 'fab-right'}
    ];

    this.adminPages = [
      {title: 'Caminhos e Galerias', component: ShowPlacePage, icon: 'map'}
      {title: 'Novo Local', component: NewPlacePage, icon: 'map'},
      {title: 'Nova Galeria', component: NewGalleryPage, icon: 'map'},
      {title: 'Novo Caminho', component: NewRoutePage, icon: 'git-branch'},
      {title: 'Nova Loja', component: NewShopPage, icon: 'flag'},
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
      nav.setRoot(page.component, {}, {animate: true, direction: 'foward'});
    }
  }

  listenToEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
      this.loggedRole = this.userData.loggedRole;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
      this.loggedRole = false;
    })

    window.addEventListener('native.keyboardshow', function(){
      document.body.classList.add('keyboard-open');
    });
    window.addEventListener('native.keyboardhide', function(){
      document.body.classList.remove('keyboard-open');
    });
  }
}
