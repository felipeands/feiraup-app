import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {Options} from './../options';

@Injectable()
export class PlaceData {

  static get parameters() {
    return [[Http], [Options]];
  }

  constructor(http, options) {
    this.http = http;
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

}