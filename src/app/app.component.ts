import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  retrieveData: any;
  user: any=[];
  user1: any;
  authentication: any;
  backdropDismiss: false;
  loginModal: HTMLIonModalElement;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.retrieveItem();

    });


  }

  retrieveItem() {
    this.retrieveData = localStorage.getItem("currentUser");
    console.log(this.retrieveData)
    this.user1 = JSON.parse(this.retrieveData);
    this.user.push(this.user1)
    console.log("This is current user: ", this.user);
    this.displayLogin()

  }

  displayLogin() {
    console.log(this.user)
    for (let element of this.user) {
      if (element["username"] == "") {
        this.modalCtrl.create({
          component: LoginPage,
         backdropDismiss: false,
        }).then(modal =>{
          this.loginModal = modal;
          modal.present();
        });



      }
      else{
        if(this.loginModal){
        this.loginModal.dismiss();
        }}
      }}
}
