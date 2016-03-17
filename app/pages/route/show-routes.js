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
  }

}