import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {OptionData} from './option-data';
import {UserData} from './user-data';
import {PlaceData} from './place-data';

@Injectable()
export class RouteData {
  public headers: Headers;

  static get parameters() {
    return [[Http],[OptionData],[UserData],[PlaceData]];
  }

  constructor(http, options, user, place, win) {

    this.http = http;
    this.options = options;
    this.userData = user;
    this.placeData = place;
  }

  addRoute(name, positions) {

    let data = [
      `email=${this.userData.loggedEmail}`,
      `access_token=${this.userData.loggedToken}`,
      `name=${name}`,
      `place_id=${this.placeData.placeId}`,
      `positions=${JSON.stringify(positions)}`
    ];

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.options.base_url}/route/add`, data.join('&'), {
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