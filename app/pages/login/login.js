import {Page, NavController, Alert} from 'ionic-framework/index';
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
    this.nav = nav;
    this.userData = userData;
  }

  onSubmitLogin(form) {
    if(form.valid) {

      this.userData.login(this.emailModel, this.passwordModel)
      .then((res) => {

        if(res.hasOwnProperty('access_token')) {

          let alert = Alert.create({
            title: 'Ola...',
            message: `Bem vindo(a) ${res.name}`,
            buttons: ['OK']
          });
          this.nav.present(alert);
          this.passwordModel = '';

        } else if(res.hasOwnProperty('error')) {

          let alert = Alert.create({
            title: 'Ops...',
            message: res.error,
            buttons: ['OK']
          });
          this.nav.present(alert);
          this.passwordModel = '';

        } else {

          let alert = Alert.create({
            title: 'Ops...',
            message: 'Não foi possível logar.',
            buttons: ['OK']
          });
          this.nav.present(alert);

        }

      });
    } else {
      let alert = Alert.create({
        title: 'Ops...',
        message: 'Você precisa preencher com seu email e senha cadastrados.',
        buttons: ['OK']
      });
      this.nav.present(alert);
    }

  }

}