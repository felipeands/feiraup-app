import {Page, NavController, Alert} from 'ionic-framework/index';
import {MapData} from '../../services/map-data';
import {GalleryData} from '../../services/gallery-data';
import {RouteData} from '../../services/route-data';
import {ShopData} from '../../services/shop-data';
import {PlaceData} from '../../services/place-data';
import {FieldCategories} from '../../components/field-categories';
import {ButtonSearch} from '../../components/button-search';
import {PhotoUpload} from '../../components/photo-upload';

@Page ({
  templateUrl: 'build/pages/shop/new-shop.html',
  styles: [`
  #map {
    width: 100%;
    height: 80%;
  }
  field-categories {
    margin-top: 20px;
  }
  .obs {
    margin-bottom: 20px;
  }
  .submit {
    margin-top: 20px;
  }
  `],
  directives: [FieldCategories, ButtonSearch, PhotoUpload]
})

export class NewShopPage {
  nameModel;
  phoneModel;
  phone2Model;
  emailModel;
  isGalleryModel;
  galleryModel;
  numberModel;
  streetModel;
  isCornerModel;
  streetCornerModel;
  floorModel;
  routeModel;
  selectedCategories: array = [];
  descriptionModel;
  obsModel;

  static get parameters() {
    return [[NavController],[MapData],[ShopData],[GalleryData],[RouteData],[PlaceData]];
  }

  constructor(nav, mapData, shopData, galleryData, routeData, placeData) {
    this.nav = nav;
    this.mapData = mapData;
    this.shopData = shopData;
    this.galleryData = galleryData;
    this.routeData = routeData;
    this.placeData = placeData;
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

    this.gallery = null;
    this.route = null;
    this.photo = null;

    this.loadGalleries();
    this.loadRoutes();
    this.prepareMap();

  }

  prepareMap() {
    this.mapData.loadMap();
    this.mapData.waitGoogleMaps().then((win) => {
      this.mapData.getCurPlaceLatLng().then((latLng) => {
        this.updatePosition(latLng.latitude, latLng.longitude);
        this.initMap();
      })
    });
  }

  initMap() {
    let mapOptions = {
      center: this.latLng,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.addMarker(this.latLng);
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
    this.placeData.getCurrent().then((placeId) => {
      let data = {
        name: this.nameModel,
        email: this.emailModel,
        phone: this.phoneModel,
        phone2: this.phone2Model,
        gallery: this.galleryModel,
        street: this.streetModel,
        streetCorner: this.streetCornerModel,
        floor: this.floorModel,
        route: this.routeModel,
        position: this.position,
        categories: this.selectedCategories,
        obs: this.obsModel,
        description: this.descriptionModel,
        photo: this.photo,
        place: placeId,
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
    });
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
    this.galleryData.loadGalleryInfo(this.galleryModel).then((res) => {
      this.floors = Array(res.gallery.floors).join().split(',').map(function(item,index){return ++index;});
      this.updateMapGallery(res.positions);
    })
  }

  updateMapGallery(positions) {
    this.clearMap();
    this.gallery = new google.maps.Polygon({
      map: this.map,
      path: this.getPositions(positions),
      strokeColor: "#5fba7d",
      clickable: false
    });
  }

  onUpdateStreet() {
    this.routeData.loadRouteInfo(this.routeModel).then((res) => {
      this.updateMapRoute(res.positions);
    })
  }

  updateMapRoute(positions) {
    this.clearMap();
    this.route = new google.maps.Polyline({
      map: this.map,
      path: this.getPositions(positions),
      strokeColor: "#5fba7d",
      clickable: false
    });
  }

  clearMap() {
    if (this.gallery) {
      this.gallery.setMap(null);
    }
    if (this.route) {
      this.route.setMap(null);
    }
  }

  onIsGalleryChange() {
    this.clearMap();
    if (this.isGalleryModel) {
      if (this.galleryModel) {
        this.gallery.setMap(this.map);
      }
    } else {
      if (this.routeModel) {
        this.route.setMap(this.map);
      }
    }
  }

  getPositions(positions) {
    let result = [];
    for (var position in positions) {
      result.push({
        lat: Number(positions[position].latitude),
        lng: Number(positions[position].longitude)
      })
    }
    return result;
  }

  categoriesChange(selected) {
    this.selectedCategories = selected;
  }

  uploadedPhoto(photo) {
    this.photo = photo;
  }

  onPageDidEnter() {
    this.showMap = true;
  }

  onPageWillUnload() {
    this.showMap = false;
  }

}