import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {MapData} from '../../services/map-data';

@Page ({
  templateUrl: 'build/pages/route/new-route.html',
  styles: [`
  #map {
    width: 100%;
    height: 200px;
  }
  `]
})

export class NewRoutePage {
  // Model;

  static get parameters() {
    return [[NavController],[MapData]];

  }

  constructor(nav, mapData) {
    this.nav = nav;
    this.mapData = mapData;

    this.mapping = false;
    this.firstPosition = false;
    this.lastPosition = false;
    this.positions = [];

    this.latLng = null;
    this.currentLat = 0;
    this.currentLng = 0;

    this.updated = false;

    this.map = null;

    this.mapData.loadSdk();
    this.loadMap();
  }



  loadMap() {
    this.mapData.getUpdatedPos().then((position) => {
      this.updatePosition(position.latitude, position.longitude);

      let mapOptions = {
        center: this.latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    });

  }

  addPosition(latitude, longitude) {
    let pos = {
      latitude: latitude,
      longitude: longitude
    }
    this.positions.push(pos);
    this.updated = false;

    this.map.setCenter(this.latLng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.latLng
    });

    let content = `lat: ${latitude}, lng: ${longitude}`;

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.open(this.map, marker);
    });
  }

  onStart() {
    this.mapping = true;
    this.addPosition(this.currentLat, this.currentLng);
  }

  onUpdateLocation() {
    this.mapData.getUpdatedPos().then((position) => {
      if(position.latitude && position.longitude) {
        this.updatePosition(position.latitude, position.longitude);
        let alert = Alert.create({
          title: 'OK...',
          message: 'Localização atualizada.',
          buttons: ['OK']
        });
        this.nav.present(alert);
      }
    });
  }

  onFinish() {
    this.mapping = false;
  }

  onNewMark() {
    this.addPosition(this.currentLat, this.currentLng);
  }

  updatePosition(latitude, longitude) {
    this.currentLat = latitude;
    this.currentLng = longitude;
    this.latLng = new google.maps.LatLng(latitude, longitude);
    this.updated = true;
  }

}