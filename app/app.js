import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {LocationPage} from './pages/location/location';


@App({
  template: '<ion-nav [root]="rootPage" swipe-back-enabled="false"></ion-nav>',
  config: {
    // mode: 'ios'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {

  constructor(app: IonicApp, @Inject(Platform) platform) {

    this.app = app;
    this.rootPage = LocationPage;

    // root.config.set('ios','url','teste');
    // alert(platform.config.get('url'));

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}
