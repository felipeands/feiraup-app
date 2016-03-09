import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {UserData} from '../../services/user-data';

@Page ({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  emailModel;
  passwordModel;

  static get parameters() {
    return [[NavController], [UserData]];
  }

  constructor(nav, userData) {
    var $this = this;

    this.nav = nav;
    this.userData = userData;
  }

  onSubmitLogin(form) {
    if(form.valid) {
      this.userData.login(this.emailModel, this.passwordModel).then((response) => {
        console.log(response);
      });
    }
  }

}