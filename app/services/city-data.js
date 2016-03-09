import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Injectable()
export class CityData {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    this.storage = new Storage(LocalStorage);
    this.getCurrent();

    this.cities = false;
  }

  load() {
    if (this.cities) {
      return Promise.resolve(this.cities);
    }

    return new Promise(resolve => {
      this.http.get('http://feiraup.ngrok.com/cities').subscribe(res => {
        this.cities = this.processData(res.json());
        resolve(this.cities);
      });
    });
  }

  processData(data) {
    return data;
  }

  getCities() {
    return this.load().then(data => {
      return data.cities;
    });
  }

  setCurrent(cityId) {
    this.cityId = cityId;
    this.storage.set('cityId', cityId);
  }

  getCurrent() {
    return this.storage.get('cityId').then((value) => {
      this.cityId = JSON.parse(value);
      return this.cityId;
    })
  }

}