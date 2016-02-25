import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class CityData {

  static get parameters() {
    return [[Http], [UserData]];
  }

  constructor(http) {
    this.http = http;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://feiraup.ngrok.com').subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  processData(data) {

  }

}