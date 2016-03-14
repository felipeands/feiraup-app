import {Page, Alert} from 'ionic-framework/ionic';
// import {Xs} from 'plugins/cordova-plugin-geolocation';
// import {RouteData}

@Page ({
  templateUrl: 'build/pages/route/new-route.html'
})

export class NewRoutePage {
  // Model;

  static get parameters() {
    // return [];

  }

  constructor() {
    this.mapping = false;
    this.firstPosition = false;
    this.lastPosition = false;

    this.latLng = null;
    this.currentLat = 0;
    this.currentLng = 0;

    this.map = null;

    this.loadSdk();
    this.loadMap();
  }

  loadSdk() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://maps.google.com/maps/api/js?sensor=true';
    document.body.appendChild(script);
  }

  loadMap() {
    let options = {timeout: 10000, enableHightAccuracy: false}

    navigator.geolocation.getCurrentPosition((position) => {

      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;

      console.log(position.coords);

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    },()=>{}, options);
    // navigator.geolocation.getCurrentPosition(options).then((position) => {
      // console.log(position)
    //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }

    //   this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // });
  }

  onStart() {
    this.mapping = true;
  }

  onFinish() {
    this.mapping = false;
  }

  onNewMark() { }

  updateLocation() {

  }

}