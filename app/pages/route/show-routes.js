import {Page} from 'ionic-framework/ionic';
import {MapData} from '../../services/map-data';
import {RouteData} from '../../services/route-data';

@Page ({
  templateUrl: 'build/pages/route/show-routes.html',
  styles: [`
  #map {
    width: 100%;
    height: 100%;
  }
  `]
})

export class ShowRoutesPage {

  static get parameters() {
    return [[MapData],[RouteData]];
  }

  constructor(mapData, routeData) {
    this.mapData = mapData;
    this.routeData = routeData;

    this.routeData.getPlaceRoutes().then((result) => {
      this.routes = result;
    });

    this.prepareMap();

    let sdk = this.mapData.loadSdk();
    if (sdk==false) {
      window.initMap();
    }

  }

  prepareMap() {
    this.mapData.waitGoogleMaps().then((win) => {
      this.initMap();
    });
  }

  initMap() {
    let mapOptions = {
      center: new google.maps.LatLng(-16.6667, -49.2500),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

}