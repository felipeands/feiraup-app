import {Page, NavController, Alert} from 'ionic-framework/index';
import {MapData} from '../../services/map-data';
import {GalleryData} from '../../services/gallery-data';
import {RouteData} from '../../services/route-data';
import {ShopData} from '../../services/shop-data';
import {FieldCategories} from '../../components/field-categories';

@Page ({
  templateUrl: 'build/pages/shop/new-shop.html',
  styles: [`
  #map {
    width: 100%;
    height: 100%;
  }
  field-categories {
    margin-top: 20px;
  }
  `],
  directives: [FieldCategories]
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
  selectedCategories : array = [];

  static get parameters() {
    return [[NavController],[MapData],[ShopData],[GalleryData],[RouteData]];
  }

  constructor(nav, mapData, shopData, galleryData, routeData) {
    this.nav = nav;
    this.mapData = mapData;
    this.shopData = shopData;
    this.galleryData = galleryData;
    this.routeData = routeData;
    this.galleries = [];

    this.position = {};

    this.latLng = null;
    this.currentLat = 0;
    this.currentLng = 0;

    this.updating = true;
    this.updated = false;

    this.map = null;
    this.marker = null;

    this.isGalleryModel = false;

    this.floors = [1];
    this.galleries = null;
    this.routes = null;

    this.loadGalleries();
    this.loadRoutes();

    this.mapData.waitGoogleMaps().then((win) => {
      this.mapData.getCurPlaceLatLng().then((latLng) => {
        this.updatePosition(latLng.latitude, latLng.longitude);
        this.initMap();
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
    this.addMarker(this.latLng);
    this.updated = true;
    this.updating = false;
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

    let data = {
      name: this.nameModel,
      number: this.numberModel,
      gallery: this.galleryModel,
      street: this.streetModel,
      streetCorner: this.streetCornerModel,
      floor: this.floorModel,
      route: this.routeModel,
      position: this.position,
      categories: this.selectedCategories
    }

    let alert = Alert.create({
      title: 'Finalizando',
      message: 'Incluir mesmo essa loja?',
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
    this.addPosition(latitude, longitude);
    this.updating = false;
    this.updated = true;
  }

  loadGalleries() {
    this.galleryData.loadGalleriesCurPlace().then(res => {
      this.galleries = (res.galleries) ? res.galleries : [];
    });
  }

  loadRoutes() {
    this.routeData.loadRoutesCurPlace().then(res => {
      this.routes = (res.routes) ? res.routes : [];
    })
  }

  onUpdateGallery() {
    this.galleryData.loadGalleryInfo(this.galleryModel).then(res => {
      this.floors = Array(res.gallery.floors).join().split(',').map(function(item,index){return ++index;});
    })
  }

  categoriesChange(selected) {
    this.selectedCategories = selected;
  }

}