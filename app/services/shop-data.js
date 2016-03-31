import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http, Headers} from 'angular2/http';

import {UserData} from './user-data';
import {Options} from './../options';

@Injectable()

export class ShopData {
  public headers: Headers;

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

  addShop(info, position) {

    let data = [
      `email=${this.userData.loggedEmail}`,
      `access_token=${this.userData.loggedToken}`,
      `info=${JSON.stringify(info)}`
    ];

    return new Promise((resolve) => {
      this.setHeaders();
      this.http.post(`${this.options.base_url}/shop/add`, data.join('&'), {
        headers: this.headers
      })
      .subscribe(
        res => {
          resolve(res.json())
        },
        (err) => {
          if(err) {
            resolve(err.json());
          }
        },
        () => {}
      );
    })

  }
}