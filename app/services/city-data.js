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
    this.cityId = false;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://feiraup.ngrok.com/cities').subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
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
    this.storage.get('cityId').then((cityId) => {
      return cityId;
    });
  }

}