import {Events} from 'ionic-framework/ionic';
import {Injectable, Inject} from 'angular2/core';
import {Options} from './../options';

@Injectable()
export class MapData {

  static get parameters() {
    return [[Options]];
  }

  constructor(options) {
    this.options = options;
  }

  loadSdk() {
    let mapScript = document.getElementById('mapscript');
    if(mapScript == undefined){
      script = document.createElement('script');
      script.id = 'mapscript';
      script.type = 'text/javascript';
      script.src = `http://maps.google.com/maps/api/js?key=${this.options.gmaps_key}${this.options.gmaps_sensor}&callback=initMap`;
      document.body.appendChild(script);
      return true;
    } else {
      return false;
    }
  }

  waitGoogleMaps() {
    return new Promise(resolve => {
      window['initMap'] = () => {
        resolve(window);
      }
    });
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