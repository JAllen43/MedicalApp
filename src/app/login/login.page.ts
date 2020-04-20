import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import{Router} from'@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})




export class LoginPage implements OnInit {
  inputtedUsername: string;
  inputtedPassword: string;
  determine: string;
  backdropDismiss: any;
  username: string;
  dob: string;
  profile: any = [];
  test2: any;
  retrieveData: any;
  addLogin: any;
  counter = 0;
  testArray = []

  currentUser = "test";
  savedList: any = [];
  add: any;
  add1: boolean;
  medicines = [
    { "name": "blue inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];
  userLogin = [{"username:": "test", "password:": "test" }];

  constructor(public alertController: AlertController, private route: Router) { }
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



  //Saving User Logins to the userLogins array
  saveUserLogin(logins) {
    localStorage.setItem("userLogins", JSON.stringify(logins));

  }
  //Retrieving User Logins from the userLogins array
  retrieveUserLogin() {
    this.retrieveData = localStorage.getItem("userLogins");
    this.userLogin = JSON.parse(this.retrieveData);
    console.log("This is the retrieve function being called: ", this.userLogin);
  }

  validation() {

  }
  //Checks if user login details are valid
  async onLogin() {
    this.counter = 0;
    this.retrieveUserLogin()
    console.log("This is user Login: ", this.userLogin)
    for (let i of this.userLogin) {

      if (i["username"] == this.inputtedUsername) {
        if (i["password"] == this.inputtedPassword) {
          console.log("Gained entry")
          this.profile.push(i)
          console.log("This is profile: ", this.profile)
          this.saveItem(this.profile)
          console.log("Profile has been saved")
          //window.location.reload()
          console.log(this.profile["Medication"])
          console.log(i["Medication"])
          this.tab1PageRoot()


          //Stores currentuser on local storage to allow ease of access for which user is operating the application
          //localStorage.setItem("currentUser", this.username);
          //this.displayProfile()
        }
        else {
          if (this.counter != 1) {
            this.counter = this.counter + 1
            this.alertPresent();
          }

        }
      }

      else {
        if (this.counter != 1) {
          this.counter = this.counter + 1
          this.alertPresent();
        }



      }
    }
  }

tab1PageRoot(){
    this.route.navigate(['./tab1'])
  }
  //Allows Alert to be used as Sign Up box
  async presentSignUp() {
    this.add1 = false;
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
          placeholder: 'Placeholder2'
        },
        {
          name: 'dob',
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
    console.log("This is previous userLogin :", this.userLogin)
    this.retrieveUserLogin()

    console.log("This is the first userLogins ", this.userLogin);
    for (let element of this.userLogin) {
      console.log("Element speaking: ", element)
      console.log(element["username"])
      console.log(result.data.values.uName)
      if (element["username"] == result.data.values.uName) {
        this.add1 = true;
      }
    }
    if (this.determine == "Ok" && this.add1 != true) {
      let prof: any = new Object();
      prof["username"] = result.data.values.uName;
      prof["password"] = result.data.values.pWord;
      prof["dob"] = result.data.values.dob;
      prof["Medication"] = [];
      prof["trackedMedicine"] = [];
      this.userLogin.push(prof);
      this.saveUserLogin(this.userLogin);
      this.retrieveUserLogin();
      console.log("This is the updated userLogins ", this.userLogin);
    }
    else {
      this.invalidLoginDetails()

    }
    console.log("NOT UPDATE USER LOGINS", this.userLogin)



  }

  //Saves Item to local storage, depending on the profile that is entered into it
  saveItem(profile) {

    localStorage.setItem("currentUser", JSON.stringify(profile));
    console.log("This is the profile to be saved: ", console.log(profile))
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
  deleteUserData() {
    this.profile = []
    console.log(this.profile)
    this.userLogin = []
    this.saveUserLogin(this.userLogin)
    this.retrieveUserLogin()
    console.log("This is the user Logins", this.userLogin)
  }
  async invalidLoginDetails() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Username already taken",
      message: "This username has already been taken, please try another username",
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }
  ngOnInit() {
    console.log("THIS IS ON INITIALISATION")
    console.log(this.userLogin)
    this.saveUserLogin(this.userLogin)
    this.testArray = ["apples", "pears"]
  }

}
