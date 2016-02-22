import {App, IonicApp, Platform} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';
// import {Http} from 'angular2/http';


@App({
  // templateUrl: 'build/app.html',
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  constructor(platform: Platform) {
    this.rootPage = TabsPage;

    // this.http = http;


    platform.ready().then(() => {

      // this.http.get('teste.json').subscribe((res:Response) => console.log(res) );
      // console.log('get');
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
