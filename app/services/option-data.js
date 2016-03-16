import {Injectable, Inject} from 'angular2/core';

@Injectable()

export class OptionData {

  constructor() {
    this.base_url = 'http://feiraup.herokuapp.com';
    // this.base_url = 'http://localhost:3000';
    // this.base_url = 'http://feiraup.ngrok.com';
    this.gmaps_key = 'AIzaSyDEdVkgms32J_TZad9VJO-XJHWvaQRUDqg';
    this.gmaps_timeout = 100000;
    this.gmaps_accuracy = true;
    this.gmaps_sensor =  ''; // '&sensor=true';
  }

}