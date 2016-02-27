import {Page} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/ionic';
import {CityData} from '../../services/city-data';
import {PlaceData} from '../../services/place-data';

@Page ({
  templateUrl: 'build/pages/location/location.html'
})

export class LocationPage {
  cityModel;
  placeModel;

  static get parameters() {
    return [[CityData], [PlaceData]];
  }

  constructor(cityData, placeData) {

    this.cityData = cityData;
    this.cityModel = this.cityData.getCurrent();
    this.cities = [];

    this.placeData = placeData;
    this.placeModel = this.placeData.getCurrent();
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
      this.places = places;
    });
  }

  save() {
    this.cityData.setCurrent(this.cityModel);
    this.placeData.setCurrent(this.currentPlace);
  }
}