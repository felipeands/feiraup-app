import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {UserData} from './user-data';
import {PlaceData} from './place-data';
import {Options} from './../options';

@Injectable()

export class GalleryData {
  public headers: Headers;

  static get parameters() {
    return [[Http],[UserData],[PlaceData],[Options]];
  }

  constructor(http, user, place, options) {
    this.http = http;
    this.options = options;
    this.userData = user;
    this.placeData = place;
  }

  addGallery(data) {

    let data = [
      `email=${this.userData.loggedEmail}`,
      `access_token=${this.userData.loggedToken}`,
      `name=${data.name}`,
      `floors=${data.floors}`,
      `address=${data.address}`,
      `place_id=${this.placeData.placeId}`,
      `positions=${JSON.stringify(data.positions)}`,
      `doors=${JSON.stringify(data.doors)}`
    ];

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise(resolve => {
      this.http.post(`${this.options.base_url}/gallery/add`, data.join('&'), {
        headers: this.headers
      })
      .subscribe(
        res => {
          resolve(res.json())
        },
        (err) => {
          if(err) {
            resolve(err.json());
          }
        },
        () => {}
      );
    })
  }

  loadGalleriesFromPlace(placeId) {
    return new Promise(resolve => {
      this.http.get(`${this.options.base_url}/gallery/place/${placeId}`).subscribe(res => {
        resolve(res.json());
      })
    })
  }

  loadGalleriesCurPlace() {
    return this.placeData.getCurrent().then((placeId) => {
      return this.loadGalleriesFromPlace(placeId);
    })
  }

  loadGalleryInfo(galleryId) {
    return new Promise(resolve => {
      this.http.get(`${this.options.base_url}/gallery/${galleryId}`).subscribe(res => {
        resolve(res.json());
      })
    })
  }

}