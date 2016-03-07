import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {CityData} from '../../services/city-data';
import {PlaceData} from '../../services/place-data';

@Page ({
  templateUrl: 'build/pages/location/location.html'
})

export class LocationPage {
  cityModel;
  placeModel;

  static get parameters() {
    return [[NavController], [CityData], [PlaceData]];
  }

  constructor(nav, cityData, placeData) {
    var $this = this;

    this.nav = nav;
    this.cityData = cityData;
    this.cityModel = this.cityData.getCurrent();
    this.cities = [];

    this.placeData = placeData;
    setTimeout(function(){
        $this.placeModel = $this.placeData.getCurrent();
      }, 2000);
    this.places = [];

    this.loadCities();

    if(this.cityModel) {
      this.loadPlaces();
    }


  }

  loadCities() {
    this.cityData.getCities().then(cities => {
      this.cities = cities;
    });
  }

  onUpdateCity() {
    this.cityModel = this.cityModel;
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeData.getPlacesFromCity(this.cityModel).then(places => {
      this.placeModel = null;
      this.places = places;
    });
  }

  onUpdateLocation(form) {
    if(form.valid) {
      this.cityData.setCurrent(this.cityModel);
      this.placeData.setCurrent(this.placeModel);
      this.doSuccessAlert();
    }else{
      this.doValidateAlert();
    }
  }

  doSuccessAlert() {
    let alert = Alert.create({
      title: 'OK',
      message: 'Dados atualizados',
      buttons: [{
        text: 'OK',
        handler: () => {
          // this.nav.push();
        }
      }]
    });
    this.nav.present(alert);
  }

  doValidateAlert() {
    let alert = Alert.create({
      title: 'Ops.. Verifique',
      message: 'Precisa selecionar Cidade e Local',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

}