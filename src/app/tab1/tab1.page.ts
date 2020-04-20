import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Router} from'@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  inputtedUsername: string;
  inputtedPassword: string;
  determine: string;
  backdropDismiss: any;
  username: string;
  dob: string;
  profile: any = [];
  test2: any;
  retrieveData: any;
  currentUser = "test";
  savedList: any = [];
  add: any;
  medicines = [
    { "name": "blue inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];
  userLogin: any [];
  
  ngOnInit() {
    this.loginAlertPresent()
  }


  //Constructor used to import Alert Controller to allow Alerts to be displayed
  constructor(public alertController: AlertController, public navCtrl: NavController, private route: Router) { }

  loginPageRoot(){
    this.route.navigate(['/login'])
  }
  //Imports keywords using async and allows an alert to be created to warn of incorrect Username/Password being entered
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
  //Add elements to a saved Array to display them on the screen
  displayMed() {
    console.log("hello")
    this.savedList = [];
    console.log("Saved List: ", this.savedList)
    for (let med1 of this.userLogin) {
      console.log("This is the profile", med1)
      console.log("This is the username: ", med1.username);
      if (med1["username"] == this.currentUser) {
        for (let element of med1["Medication"]) {
          console.log(element);
          this.savedList.push(element);

        }
        med1
      }
    }
    console.log(this.savedList);


  }
  //Saving User Logins to the userLogins array
  saveUserLogin(logins){
    localStorage.setItem("userLogins", JSON.stringify(logins));

  }
  //Retrieving User Logins from the userLogins array
  retrieveUserLogin(){
    this.retrieveData = localStorage.getItem("userLogins");
    this.userLogin = JSON.parse(this.retrieveData);
    console.log("This is the retrieve function being called: ", this.userLogin);

  }
  //Checks if user login details are valid
  async onLogin() {
    for (let i of this.userLogin) {

      if (i.username == this.inputtedUsername) {
        if (i.password == this.inputtedPassword) {
          console.log("Gained entry")
          this.profile.push(i)
          console.log("This is profile: ", this.profile)
         // this.saveUserLogin(),
          this.saveItem(this.profile)
          console.log("Profile has been saved")
          console.log(this.profile["Medication"])
          console.log(i["Medication"])
          //Stores currentuser on local storage to allow ease of access for which user is operating the application
          //localStorage.setItem("currentUser", this.username);
          //this.displayProfile()
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
  //Allows Login Screen to be hidden and Profile Screen to be shown
  displayProfile() {
    document.getElementById('loginscreen').hidden = true;
    document.getElementById('profile').hidden = false;

  }
  //Allows Alert to be used as Sign Up box
  async presentSignUp() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Sign Up',
      inputs: [
        {
          name: 'uName',
          type: 'text',
          placeholder: 'Enter your username here'
        },
        {
          name: 'pWord',
          type: 'text',
          placeholder: 'Enter your password here'
        },
        {
          name: 'dob',
          type: 'date',
          max: '2010-01-01'
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
      //BEEN ALTERED
      prof["dob"]=result.data.values.dob;
      prof["Medication"]=this.medicines;
      prof["trackedMedicine"]=[];
      this.userLogin.push(prof);
      this.saveUserLogin(this.userLogin);
      this.retrieveUserLogin();
      console.log("This is the updated userLogins ", this.userLogin);
    }



  }
  onRegister() {

  }
  //Saves Item to local storage, depending on the profile that is entered into it
  saveItem(profile) {
    console.log(profile);
    localStorage.setItem("currentUser", JSON.stringify(profile));

  }

  //Retrieves data from the local storage depending on the profile that is present
  retrieveItem() {
    this.retrieveData = localStorage.getItem("currentUser");
    this.test2 = JSON.parse(this.retrieveData);
    console.log(this.test2);
  }
  disappear() {
    document.getElementById('loginscreen').hidden = true;
  };
  
  async loginAlertPresent() {
    const alert = await this.alertController.create({
      header: "Register/Login!",
      subHeader: "Make sure that you Register/Login before using the application, otherwise it won't work properly! The login button is at the top of this screen!",
      message: "Please just do it you moron",
      buttons: ['Dismiss']
    });}


}
