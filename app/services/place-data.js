import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Injectable()
export class PlaceData {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
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
      this.http.get('http://feiraup.ngrok.com/places/city/' + cityId).subscribe(res => {
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