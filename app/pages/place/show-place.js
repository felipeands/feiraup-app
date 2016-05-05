import {Page} from 'ionic-framework/index';
import {MapData} from '../../services/map-data';
import {PlaceData} from '../../services/place-data';
import {ShopData} from '../../services/shop-data';

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
    return [[MapData],[PlaceData],[ShopData]];
  }

  constructor(mapData, placeData, shopData) {
    this.mapData = mapData;
    this.placeData = placeData;
    this.shopData = shopData;
    this.latLng = null;
    this.doorImage = 'build/images/door.png';
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
    this.placeData.getPlaceFull(this.placeData.placeId).then((place) => {
      this.processPlaceFull(place);
    });
  }

  processPlaceFull(place) {
    if(place.galleries) {
      this.addGalleries(place.galleries);
    }
    if(place.routes) {
      this.addRoutes(place.routes);
    }
    if(place.shops) {
      this.addShops(place.shops);
    }
  }

  addShops(shops) {
    for (var shop in shops) {
      this.addShop(shops[shop]);
    }
  }

  addShop(shop) {
    let latLng = this.setLatLng(shop.latitude, shop.longitude);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: shop.name,
      // animation: google.maps.Animation.DROP,
      draggable: false,
      clickable: true
    });

    let popupContent = `<b>Loja:</b> ${shop.name}`
    this.createInfoWindow(marker, popupContent);
  }

  addGalleries(galleries) {
    for (var gallery in galleries) {
      this.addGallery(galleries[gallery]);
    }
  }

  addGallery(gallery) {
    let polygon = new google.maps.Polygon({
      map: this.map,
      path: this.getPositions(gallery),
      title: gallery.info.name,
      strokeColor: "#ff0000",
      fillColor: "#ff0000",
      strokeOpacity: 0.4
    });
    let popupContent = `<b>Galeria:</b> ${gallery.info.name}`
    this.createInfoWindow(polygon, popupContent);
    this.addDoors(gallery.doors);
  }

  addDoors(doors) {
    for (var door in doors) {
      this.addDoor(doors[door]);
    }
  }

  addDoor(door) {
    let latLng = this.setLatLng(door.latitude, door.longitude);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      // animation: google.maps.Animation.DROP,
      icon: this.doorImage,
      draggable: false,
      clickable: false
    });
  }

  addRoutes(routes) {
    for (var route in routes) {
      this.addRoute(routes[route]);
    }
  }

  addRoute(route) {
    let = polyline = new google.maps.Polyline({
      map: this.map,
      path: this.getPositions(route),
      title: route.info.name,
      strokeColor: "#5fba7d",
      strokeOpacity: 0.8
    });
    let popupContent = `<b>Caminho:</b> ${route.info.name}`
    this.createInfoWindow(polyline, popupContent);
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
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.infoWindow = new google.maps.InfoWindow();
  }

  setLatLng(latitude, longitude) {
    let latLng = new google.maps.LatLng(latitude, longitude);
    this.map.setCenter(latLng);
    return latLng;
  }

  createInfoWindow (el, popupContent) {
    el.info = new google.maps.InfoWindow({
      content: popupContent
    });

    el.info.setPosition(this.latLng);

    google.maps.event.addListener(el, 'click', function() {
      el.info.open(this.map, el);
    });
  }

}