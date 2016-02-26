import {Page} from 'ionic-framework/ionic';
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
    this.cities = [];
    this.currentCity = false;

    this.placeData = placeData;
    this.places = [];
    this.currentPlace = false;

    this.loadCities();

  }

  loadCities() {
    this.cityData.getCities().then(cities => {
      this.cities = cities;
    });
  }

  onUpdateCity() {
    console.log(this.cityModel);
    this.currentCity = this.cityModel;
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeData.getPlacesFromCity(this.currentCity).then(places => {
      this.places = places;
    });
  }
}