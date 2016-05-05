import {Component} from 'angular2/core';

@Component()

export class Options {
  base_url: string;
  gmaps_key: string;
  gmaps_timeout: number;
  gmaps_accuracy: boolean;
  gmaps_sensor: string;

  constructor() {
    this.base_url = 'http://feiraup.herokuapp.com';
    // this.base_url = 'http://a770995e.ngrok.io';
    this.gmaps_key = 'AIzaSyDEdVkgms32J_TZad9VJO-XJHWvaQRUDqg';
    this.gmaps_timeout = 100000;
    this.gmaps_accuracy = true;
    this.gmaps_sensor =  ''; // '&sensor=true';
  }

}