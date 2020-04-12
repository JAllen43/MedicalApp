import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  inputtedUsername: string;
  inputtedPassword: string;
  num = 0;
  determine: string;
  backdropDismiss: any;
  
  constructor(public alertController: AlertController) { }
  userLogin = [
    { "username": "test", "password": "test" }
  ];
  //Imports keywords using async
  async alertPresent() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Incorrect Username/Password",
      message: "Please make sure that you enter a valid username and password combination",
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }

  async onLogin() {
    for (let i of this.userLogin) {
      if (i.username == this.inputtedUsername) {
        if (i.password == this.inputtedPassword) {
          console.log("Gained entry")
        }
        else {
          this.alertPresent();
        }
      }

      else {
        this.alertPresent();
      }
    }
  }
  async presentSignUp() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Sign Up',
      inputs: [
        {
          name: 'uName',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'pWord',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder2'
        },
        {
          name: 'name3',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        }
      ],
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.determine = 'Cancel';
        }
      },
      {
        text: "Ok",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.determine = 'Ok';
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
    console.log("This is the role: " + result.data.values.uName);
    console.log("This is the first userLogins ", this.userLogin);
    if (this.determine == "Ok") {
      let prof: any = new Object();
      prof["username"] = result.data.values.uName;
      prof["password"] = result.data.values.pWord;
      this.userLogin.push(prof);
      console.log("This is the updated userLogins ", this.userLogin);
    }



  }
  onRegister() {

  }
  disappear(){
    document.getElementById('loginscreen').hidden = true;
  }

}
