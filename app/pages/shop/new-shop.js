import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {MapData} from '../../services/map-data';
import {GalleryData} from '../../services/gallery-data';
import {ShopData} from '../../services/shop-data';

@Page ({
  templateUrl: 'build/pages/shop/new-shop.html',
  styles: [`
  #map {
    width: 100%;
    height: 100%;
  }
  `]
})

export class NewShopPage {
  nameModel;
  isGalleryModel;
  galleryModel;
  numberModel;
  streetModel;
  isCornerModel;
  streetCornerModel;
  floorModel;
  routeModel;

  static get parameters() {
    return [[NavController],[MapData],[ShopData],[GalleryData]];
  }

  constructor(nav, mapData, shopData, galleryData) {
    this.nav = nav;
    this.mapData = mapData;
    this.shopData = shopData;
    this.galleryData = galleryData;
    this.galleries = [];

    this.mapping = false;
    this.position = {};

    this.latLng = null;
    this.currentLat = 0;
    this.currentLng = 0;

    this.updating = true;
    this.updated = false;

    this.map = null;
    this.marker = null;

    this.isGalleryModel = false;

    this.floors = 1;

    this.mapData.waitGoogleMaps().then((win) => {
      this.initMap();
      this.loadFirstPos();
    });

    let sdk = this.mapData.loadSdk();
    if (sdk==false) {
      window.initMap();
    }

    this.loadGalleries();

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

  addPosition(latitude, longitude) {
    this.position = {
      latitude: latitude,
      longitude: longitude
    }
    this.updated = false;
  }

  onStart() {
    this.mapping = true;
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

    let data = {
      name: this.nameModel,
      number: this.numberModel,
      gallery: this.galleryModel,
      street: this.streetModel,
      streetCorner: this.streetCornerModel,
      floor: this.floorModel,
      route: this.routeModel,
      position: this.position
    }

    let alert = Alert.create({
      title: 'Finalizando',
      message: 'Informe um nome para essa loja.',
      buttons: [{
        text: 'Cancelar',
        handler: data => {}
      }, {
        text: 'OK',
        handler: (form) => {
          this.shopData.addShop(data).then((response) => {

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

  updatePosition(latitude, longitude) {
    this.currentLat = latitude;
    this.currentLng = longitude;
    this.latLng = new google.maps.LatLng(latitude, longitude);
    this.updating = false;
    this.updated = true;
  }

  loadGalleries() {
    this.galleryData.loadGalleriesCurPlace().then(res => {
      this.galleries = (res.galleries) ? res.galleries : [];
    });
  }

  onUpdateGallery() {
    this.galleryData.loadGalleryInfo(this.galleryModel).then(res => {
      this.floors = res.floors;
    })
  }

}