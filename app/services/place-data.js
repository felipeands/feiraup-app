import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http, Headers} from 'angular2/http';

import {UserData} from './user-data';
import {CityData} from './city-data';
import {Options} from './../options';

@Injectable()
export class PlaceData {
  public headers: Headers;

  static get parameters() {
    return [[Http], [UserData], [CityData], [Options]];
  }

  constructor(http, user, city, options) {
    this.http = http;
    this.userData = user;
    this.cityData = city;
    this.options = options;
    this.storage = new Storage(LocalStorage);
    this.getCurrent();
    this.places = false;
  }

  loadFromCity(cityId) {
    if (this.places) {
      // guardar locais das cidades para offline
      // return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(`${this.options.base_url}/places/city/${cityId}`).subscribe(res => {
        this.places = this.processData(res.json());
        resolve(this.places);
      });
    });
  }

  processData(data) {
    return data;
  }

  getPlacesFromCity(cityId) {
    return this.loadFromCity(cityId).then(data => {
      return data.places;
    });
  }

  setCurrent(placeId) {
    this.placeId = placeId;
    this.storage.set('placeId', placeId);
  }

  getCurrent() {
    return this.storage.get('placeId').then((value) => {
      this.placeId = JSON.parse(value);
      return this.placeId;
    })
  }

  getPlaceFull(placeId) {
    return new Promise((resolve) => {
      this.http.get(`${this.options.base_url}/place-full/${placeId}`).subscribe((res) => {
        resolve(res.json());
      });
    });
  }

  addPlace(data) {

    let data = [
    `email=${this.userData.loggedEmail}`,
    `access_token=${this.userData.loggedToken}`,
    `name=${data.name}`,
    `city_id=${this.cityData.cityId}`,
    `position=${JSON.stringify(data.position)}`
    ];

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.options.base_url}/place/add`, data.join('&'), {
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