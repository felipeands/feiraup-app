import {Page} from 'ionic-framework/ionic';
import {CityData} from '../../services/city-data';

@Page ({
  templateUrl: 'build/pages/location/location.html'
})

export class LocationPage {

  static get parameters() {
    return [[CityData]];
  }

  constructor(cityData) {

    this.cityData = cityData;
    this.cities = [];

    cityData.getCities().then(cities => {
      this.cities = cities;
    })

    // this.footer = footer;
    // console.log('run');
  }
}