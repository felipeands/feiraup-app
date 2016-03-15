import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Http, Headers} from 'angular2/http';
import {OptionData} from './option-data';

@Injectable()
export class UserData {
  public headers: Headers;

  static get parameters() {
    return [[Http],[Events],[OptionData]];
  }

  constructor(http, events, options, headers) {
    this.http = http;
    this.options = options;
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.getCurrent();
  }

  getLogin(username, password) {
    var data = "username="+ username +"&password="+ password;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.options.base_url}/user/login`, data, {
        headers: this.headers
      })
      .subscribe(
        res => {
          resolve(res.json());
          this.setCurrentUserData(res.json());
        },
        (err) => {
          if(err){
            resolve(err.json());
          }
        },
        () => {}
        );
    });
  }

  login(username, password) {
    return this.getLogin(username, password).then(data => {
      return data;
    });
  }

  logout() {
    this.loggedIn = false;
    this.loggedToken = false;
    this.loggedEmail = false;
    this.loggedRole = false;
    this.loggedName = false;

    this.updateStorage();
    this.events.publish('user:logout');
  }

  setCurrentUserData(userData) {
    this.loggedIn = true;
    this.loggedToken = userData.access_token;
    this.loggedEmail = userData.email;
    this.loggedRole = userData.role;
    this.loggedName = userData.name;

    this.updateStorage();
    this.events.publish('user:login');
  }

  updateStorage() {
    this.storage.set('loggedIn', this.loggedIn);
    this.storage.set('loggedToken', this.loggedToken);
    this.storage.set('loggedEmail', this.loggedEmail);
    this.storage.set('loggedRole', this.loggedRole);
    this.storage.set('loggedName', this.loggedName);
  }

  getCurrent() {
    this.storage.get('loggedIn').then((value) => {
      this.loggedIn = value;

      if(this.loggedIn == 'true') {
        this.storage.get('loggedToken').then((value) => {
          this.loggedToken = value;
        });

        this.storage.get('loggedEmail').then((value) => {
          this.loggedEmail = value;
        });


        this.storage.get('loggedName').then((value) => {
          this.loggedName = value;
        });

        this.storage.get('loggedRole').then((value) => {
          this.loggedRole = value;
          this.events.publish('user:login');
        });
      }
    });
  }

  hasLoggedIn() {
    this.loggedIn;
  }

}