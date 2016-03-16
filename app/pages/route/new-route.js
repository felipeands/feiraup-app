import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {MapData} from '../../services/map-data';
import {RouteData} from '../../services/route-data';

@Page ({
  templateUrl: 'build/pages/route/new-route.html',
  styles: [`
  #map {
    width: 100%;
    height: 250px;
  }
  `]
})

export class NewRoutePage {

  static get parameters() {
    return [[NavController],[MapData],[RouteData]];

  }

  constructor(nav, mapData, routeData) {
    this.nav = nav;
    this.mapData = mapData;
    this.routeData = routeData;

    this.mapping = false;
    this.positions = [];

    this.latLng = null;
    this.currentLat = 0;
    this.currentLng = 0;

    this.updating = true;
    this.updated = false;

    this.map = null;
    this.market = null;
    this.poly = null;

    this.mapData.waitGoogleMaps().then((win) => {
      this.initMap();
      this.loadFirstPos();
    });

    let sdk = this.mapData.loadSdk();
    if (sdk==false) {
      window.initMap();
    }

  }

  initMap() {
    let mapOptions = {
      center: new google.maps.LatLng(-16.6667, -49.2500),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }


  loadFirstPos() {
    this.mapData.getUpdatedPos().then((position) => {
      this.updatePosition(position.latitude, position.longitude);
      this.addMarker(this.latLng);
    });

  }

  addMarker(latLng) {
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true
    });

    $this = this;

    this.marker.addListener('dragend', function(e) {
      $this.updatePosition(e.latLng.lat(), e.latLng.lng());
    });

    this.map.setCenter(this.latLng);
  }

  updateMarker() {
    this.marker.setPosition(this.latLng);
    this.map.setCenter(this.latLng);
  }

  updatePoly() {
    let path = this.poly.getPath();
    path.push(this.latLng);
    this.poly.setPath(path);
  }

  addPosition(latitude, longitude) {
    let pos = {
      latitude: latitude,
      longitude: longitude
    }
    this.positions.push(pos);
    this.updated = false;

    this.updatePoly();

  }

  onStart() {
    this.mapping = true;
    this.poly = new google.maps.Polyline({
      map: this.map,
      path: []
    });
    this.addPosition(this.currentLat, this.currentLng);
  }

  onUpdateLocation() {
    this.updating = true;
    this.mapData.getUpdatedPos().then((position) => {

      if(position.latitude && position.longitude) {

        this.updatePosition(position.latitude, position.longitude);
        this.updateMarker(this.latLng);

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
        handler: (form) => {
          this.routeData.addRoute(form.name, this.positions).then((response) => {

            if(response.hasOwnProperty('message')) {

              var alert = Alert.create({
                title: 'OK...',
                message: response.message,
                buttons: ['OK']
              });

            } else if(response.hasOwnProperty('error')) {

              var alert = Alert.create({
                title: 'Ops...',
                message: response.error,
                buttons: ['OK']
              });

            } else {

              var alert = Alert.create({
                title: 'Ops...',
                message: 'Não foi possível salvar!',
                buttons: ['OK']
              });

            }
            let nav = this.nav;
            setTimeout(function() {
              nav.present(alert);
            }, 500);

          });
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