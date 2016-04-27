import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/index';
import {Http, Headers} from 'angular2/http';

import {UserData} from './user-data';
import {Options} from './../options';

@Injectable()

export class ShopData {
  public headers: Headers;
  public myValue:number = 2;

  static get parameters() {
    return [[Http], [UserData], [Options]];
  }

  constructor(http, user, options) {
    this.http = http;
    this.userData = user;
    this.options = options;
  }

  setHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  addShop(data) {

    let data = [
      `email=${this.userData.loggedEmail}`,
      `access_token=${this.userData.loggedToken}`,
      `name=${data.name}`,
      `gallery=${data.gallery}`,
      `street=${data.street}`,
      `streetCorner=${data.streetCorner}`,
      `floor=${data.floor}`,
      `route=${data.route}`,
      `position=${JSON.stringify(data.position)}`,
      `categories=${JSON.stringify(data.categories)}`
    ];

    return new Promise(resolve => {
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
}