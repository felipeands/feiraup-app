import {Page} from 'ionic-framework/index';
import {MapData} from '../../services/map-data';
import {PlaceData} from '../../services/place-data';

@Page ({
  templateUrl: 'build/pages/place/show-place.html',
  styles: [`
  #map {
    width: 100%;
    height: 100%;
  }
  `]
})

export class ShowPlacePage {

  static get parameters() {
    return [[MapData],[PlaceData]];
  }

  constructor(mapData, placeData) {
    this.mapData = mapData;
    this.placeData = placeData;
    this.latLng = null;
    this.prepareMap();
  }

  getPositions(obj) {
    let result = [];
    for (var position in obj.positions) {
      result.push({
        lat: Number(obj.positions[position].latitude),
        lng: Number(obj.positions[position].longitude)
      });
    }
    return result;
  }

  initPlaces() {
    this.placeData.getPlaceFull(this.placeData.placeId).then((result) => {
      this.processPlaceFull(result);
    });
  }

  processPlaceFull(place) {
    this.addGalleries(place.galleries);
    this.addRoutes(place.routes);
    let latitude = Number(place.place.latitude);
    let longitude = Number(place.place.longitude);
    this.setLatLng(latitude, longitude);
  }

  addGalleries(galleries) {
    for (var gallery in galleries) {
      this.addGallery(galleries[gallery]);
    }
  }

  addGallery(gallery) {
    new google.maps.Polygon({
      map: this.map,
      path: this.getPositions(gallery)
    });
  }

  addRoutes(routes) {
    for (var route in routes) {
      this.addRoute(routes[route]);
    }
  }

  addRoute(route) {
    new google.maps.Polyline({
      map: this.map,
      path: this.getPositions(route)
    });
  }

  prepareMap() {
    this.mapData.waitGoogleMaps().then((win) => {
      this.mapData.getCurPlaceLatLng().then((latLng) => {
        this.latLng = new google.maps.LatLng(latLng.latitude, latLng.longitude);;
        this.initMap();
        this.initPlaces();
      })
    });
    let sdk = this.mapData.loadSdk();
    if (sdk==false) {
      window.initMap();
    }
  }

  initMap() {
    let mapOptions = {
      center: this.latLng,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  setLatLng(latitude, longitude) {
    let latLng = new google.maps.LatLng(latitude, longitude);
    this.map.setCenter(latLng);
  }

}