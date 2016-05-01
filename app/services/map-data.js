import {Events} from 'ionic-framework/index';
import {Injectable, Inject} from 'angular2/core';

import {PlaceData} from './place-data';
import {Options} from './../options';

@Injectable()
export class MapData {

  static get parameters() {
    return [[Options],[PlaceData]];
  }

  constructor(options, placeData) {
    this.options = options;
    this.placeData = placeData;
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

  getCurPlaceLatLng() {
    return this.placeData.getCurrent().then((placeId) => {
      return this.placeData.getPlaceInfo(placeId).then((res) => {
        return res.place;
      })
    });
  }

}