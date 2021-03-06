import {Page, NavController, Alert} from 'ionic-framework/index';
import {CityData} from '../../services/city-data';
import {PlaceData} from '../../services/place-data';
import {ButtonSearch} from '../../components/button-search';

@Page ({
  templateUrl: 'build/pages/location/location.html',
  directives: [ButtonSearch]
})

export class LocationPage {
  cityModel;
  placeModel;

  static get parameters() {
    return [[NavController], [CityData], [PlaceData]];
  }

  constructor(nav, cityData, placeData) {
    this.nav = nav;
    this.cityData = cityData;
    this.placeData = placeData;

    this.cities = [];
    this.places = [];

    this.loadCities();

    this.cityData.getCurrent().then((city) => {
      if (city) {
        this.cityModel = city;
        this.loadPlaces();
      }
    });

    this.placeData.getCurrent().then((place) => {
      this.placeModel = place;
    })

  }

  loadCities() {
    return this.cityData.getCities().then(cities => {
      this.cities = cities;
      return cities;
    });
  }

  onUpdateCity() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeData.getPlacesFromCity(this.cityModel).then(places => {
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