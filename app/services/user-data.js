import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';

@Injectable()
export class UserData {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
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

    var data = {username: username, password: password}

    return new Promise(resolve => {
      this.http.post('http://feiraup.ngrok.com/user/login/', data).subscribe(res => {
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