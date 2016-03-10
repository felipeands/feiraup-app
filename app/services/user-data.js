import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http, Headers} from 'angular2/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class UserData {
  public headers: Headers;

  static get parameters() {
    return [[Http]];
  }

  constructor(http, headers) {
    this.http = http;
    this.storage = new Storage(LocalStorage);
    this.storage.get('loggedIn').then((value) => {
      this.loggedIn = JSON.parse(value);
    });
    this.storage.get('loggedToken').then((value) => {
      this.loggedToken = JSON.parse(value);
    });
    this.storage.get('loggedRole').then((value) => {
      this.loggedRole = JSON.parse(value);
    });



    this.userData = false;
  }

  getLogin(username, password) {
    var data = "username="+ username +"&password="+ password;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post('http://feiraup.ngrok.com/user/login', data, {headers: this.headers}).subscribe(res => {
        this.userData = this.processData(res.json());
        this.setCurrentUserData(this.userData);
        resolve(this.userData);
      });
    });
  }

  login(username, password) {
    return this.getLogin(username, password).then(data => {
      return (data) ? true : false;
    });
  }

  processData(data) {
    return data;
  }

  setCurrentUserData(userData) {
    // this.storage.set('cityId', userData);
    console.log(userData);
  }

  getCurrent() {
    return this.cityId;
  }

  hasLoggedIn() {
    this.loggedIn;
  }

}