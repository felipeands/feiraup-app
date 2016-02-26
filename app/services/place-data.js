import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class PlaceData {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  loadFromCity(city_id) {
    if (this.data) {
      // return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://feiraup.ngrok.com/places/city/'+ city_id).subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  processData(data) {
    return data;
  }

  getPlacesFromCity(city_id) {
    return this.loadFromCity(city_id).then(data => {
      return data.places;
    });
  }

}