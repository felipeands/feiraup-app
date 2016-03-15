import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {OptionData} from './option-data';

@Injectable()
export class MapData {

  static get parameters() {
    return [[Http], [OptionData]];
  }

  constructor(http, options) {
    this.options = options;
  }

  loadSdk() {
    let mapScript = document.getElementById('mapscript');
    if(mapScript == undefined){
      script = document.createElement('script');
      script.id = 'mapscript';
      script.type = 'text/javascript';
      script.src = `http://maps.google.com/maps/api/js?sensor=true&key=${this.options.gmaps_key}`;
      document.body.appendChild(script);
    }
  }

  getUpdatedPos() {
    let options = {timeout: this.options.gmaps_timeout, enableHighAccuracy: this.options.gmaps_accuracy};
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      },()=>{}, options);
    });
  }
}