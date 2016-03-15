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

    this.updating = true;
    this.updated = false;

    this.map = null;
    this.poly = null;

    this.mapData.loadSdk();
    this.loadMap();
  }



  loadMap() {
    this.mapData.getUpdatedPos().then((position) => {
      this.updatePosition(position.latitude, position.longitude);

      let mapOptions = {
        center: this.latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    });

  }

  addMarker(latLng) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.map.setCenter(this.latLng);
  }

  addPosition(latitude, longitude) {
    let pos = {
      latitude: latitude,
      longitude: longitude
    }
    this.positions.push(pos);
    this.updated = false;

    let path = this.poly.getPath();
    path.push(this.latLng);
    this.poly.setPath(path);

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
    this.poly = new google.maps.Polyline({
      map: this.map,
      path: []
    });
    this.addPosition(this.currentLat, this.currentLng);
    this.addMarker(this.latLng);
  }

  onUpdateLocation() {
    this.updating = true;
    this.mapData.getUpdatedPos().then((position) => {
      if(position.latitude && position.longitude) {
        this.updatePosition(position.latitude, position.longitude);
        this.addMarker(this.latLng);
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

    let alert = Alert.create({
      title: 'Finalizando',
      message: 'Informe um nome para esse novo caminho.',
      inputs: [{
        name: 'name',
        placeholder: 'Nome'
      }],
      buttons: [{
        text: 'Cancelar',
        handler: data => {}
      }, {
        text: 'OK',
        handler: data => {
          console.log(data.name);
        }
      }]
    });
    this.nav.present(alert);

  }

  onNewMark() {
    this.addPosition(this.currentLat, this.currentLng);
  }

  updatePosition(latitude, longitude) {
    this.currentLat = latitude;
    this.currentLng = longitude;
    this.latLng = new google.maps.LatLng(latitude, longitude);
    this.updating = false;
    this.updated = true;
  }

}