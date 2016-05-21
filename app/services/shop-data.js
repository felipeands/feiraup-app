import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/index';
import {Http, Headers} from 'angular2/http';

import {UserData} from './user-data';
import {ImageData} from './image-data';
import {Options} from './../options';

@Injectable()

export class ShopData {
  public headers: Headers;

  static get parameters() {
    return [[Http], [UserData], [ImageData], [Options]];
  }

  constructor(http, user, image, options) {
    this.http = http;
    this.userData = user;
    this.imageData = image;
    this.options = options;
  }

  setHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getPlaceShops(placeId) {
    return new Promise((resolve) => {
      this.http.get(`${this.options.base_url}/place/shops`)
    });
  }

  addShop(data) {

    let data = [
      `email=${this.userData.loggedEmail}`,
      `access_token=${this.userData.loggedToken}`,
      `name=${data.name}`,
      `shop_email=${data.email}`,
      `phone=${data.phone}`,
      `phone2=${data.phone2}`,
      `gallery_id=${data.gallery}`,
      `street=${data.street}`,
      `street_corner=${data.streetCorner}`,
      `floor=${data.floor}`,
      `route_id=${data.route}`,
      `position=${JSON.stringify(data.position)}`,
      `categories=${JSON.stringify(data.categories)}`,
      `place_id=${data.place}`,
      `obs=${data.obs}`,
      `description=${data.description}`,
      `photo=${data.photo}`
    ];

    return new Promise((resolve) => {
      this.setHeaders();
      this.http.post(`${this.options.base_url}/shop/add`, data.join('&'), {
        headers: this.headers
      })
      .subscribe(
        (res) => {
          resolve(res.json())
        },
        (err) => {
          resolve(err.json());
        }
      );
    })

  }

  searchShop(query) {

    let data = [
      `q=${query}`
    ];

    return new Promise((resolve) => {
      this.http.get(`${this.options.base_url}/shop/search/?${data.join('&')}`).subscribe((res) => {
        let obj = this.processSearch(res.json());
        resolve(obj);
      });
    })
  }

  processSearch(obj) {
    obj.shops.map((shop) => {
      return this.processShop(shop);
    });
    return obj;
  }

  loadShop(id) {
    return new Promise((resolve) => {
      this.http.get(`${this.options.base_url}/shop/${id}`).subscribe((res) => {
        let obj = this.processShop(res.json().shop);
        resolve(obj);
      })
    })
  }

  processShop(shop) {
    shop.image = this.imageData.getImageUrlPreview(shop.photo);
    return shop;
  }

}