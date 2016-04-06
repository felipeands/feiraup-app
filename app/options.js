import {Component} from 'angular2/core';

@Component()

export class Options {

  constructor() {
    // this.base_url = 'http://feiraup.herokuapp.com';
    // this.base_url = 'http://localhost:3000';
    this.base_url = 'http://97c278dc.ngrok.io';
    // this.base_url = 'http://feiraup.ngrok.com';
    // this.base_url = 'http://192.168.1.12:3000';
    this.gmaps_key = 'AIzaSyDEdVkgms32J_TZad9VJO-XJHWvaQRUDqg';
    this.gmaps_timeout = 100000;
    this.gmaps_accuracy = true;
    this.gmaps_sensor =  ''; // '&sensor=true';  }

}