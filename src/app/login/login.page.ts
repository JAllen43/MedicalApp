import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { GlobalConstants } from '../global-constants';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogins: any = [];
  counter: number;
  inputtedUsername: string;
  inputtedPassword: string;
  decision: string;
  add: boolean;
  newUser: any;
  profile: any = [];
  currentUser: any = [];;
  activeUser: boolean;
  delete = false;
  updateCurrentUser: any = [];
  currentImage: any;
  determine: boolean;


  constructor(private storage: Storage, private alertController: AlertController) { }


  //Saves items to a determined location (represented by location) and a set value (determined by value))
  onSave(location, value) {
    this.storage.set(location, value)


  }
  save(value) {
    this.storage.set("userLogins", value)
  }

  //Retrieves items from a determined location (represented by location) and a set value (determined by the result)
  onRetrieve(location, result) {
    this.storage.get(location).then((result) => {
    })
  }

  //Allow the user to logon
  onLogin() {
    this.counter = 1
    this.userLogins = GlobalConstants.userLogins
    this.save(this.userLogins)
    try {
      if (this.userLogins.length == 0) {
        this.alertPresent("Alert", "Incorrect Username/Password", "Please make sure that you sign up for an accountenter a valid username and password combination");
        this.counter = 0
      }

      else {
        for (let i of this.userLogins) {
          //Checks whether login information provided is correct and whether user should be logged on
          if (i["username"] == this.inputtedUsername) {
            if (i["password"] == this.inputtedPassword) {
              //If user logon is correct the user is saved to a currentUser profile which has all of that specific user's settings
              this.onRetrieve("currentUser", this.currentUser)
              this.currentUser = [i]

              this.onSave("currentUser", this.currentUser)
              GlobalConstants.currentUser = this.currentUser

              this.onRetrieve("currentUser", this.currentUser)
              this.activeUser = true;
              GlobalConstants.activeUser = this.activeUser
              this.counter = 0
              break

            }
          }
        }
      }
    }
    catch (Error) {

    }

    if (this.counter == 1) {
      this.alertPresent("Alert", "Incorrect Username/Password", "Please make sure that you enter a valid username and password combination");
    }

  }



  //Sign Up Alert Box
  async signUpAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Sign Up',
      subHeader: 'Please enter a username, password and your date of birth below: ',
      inputs: [

        {
          id: "Username",
          label: 'Username',
          name: 'uName',
          type: 'text',
          placeholder: 'Create your username'
        },
        {
          label: 'Password',
          name: 'pWord',
          type: 'text',
          placeholder: 'Create your password'
        },
        {
          label: 'Date of Birth',
          name: 'dob',
          type: 'date',
          placeholder: '2000-01-01',
          min: '2017-03-01',
          max: '2018-01-12'
        }
      ],
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.decision = 'Cancel';
        }
      },
      {
        text: "Ok",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = 'Ok';

        }
      }
      ],
    })
    await alert.present();
    let result = await alert.onDidDismiss();

    this.userLogins = GlobalConstants.userLogins
    //Checks whether a user exists then adds it to the userLogins array if it doesn't
    this.checkUserExists(result)
    this.addingUserLogin(result)
  }

  //Retrieves User Logins
  onRetrieveUserLogins() {
    this.storage.get("userLogins").then((result) => {
      this.userLogins = result
    })
  }


  //Saves User Logins 
  onSaveUserLogins() {
    this.storage.set("userLogins", this.userLogins)
  }


  //Adds a user login to the userLogins array
  addingUserLogin(result) {
    if (this.decision == "Ok" && this.add == true && result.data.values.pWord !="") {
      let prof: any = new Object();
      prof["username"] = result.data.values.uName;
      prof["password"] = result.data.values.pWord;
      prof["dob"] = result.data.values.dob;
      prof["Medication"] = [];
      prof["trackedMedicine"] = [];
      prof["listFull"] = 0
      prof["activeTimer"] = false
      this.onRetrieve("userLogins", this.userLogins)
      this.userLogins.push(prof);
      this.userLogins = this.userLogins
      this.onSaveUserLogins()

      GlobalConstants.userLogins = this.userLogins
      this.alertPresent("Sign Up Complete", "Registration successful", "You can now login by using your username and password in the respective boxes")

    }
    else{
      this.alertPresent("Invalid Password", "Registration unsuccessful","Please enter a valid password")
    }
  }

  //Checking whether a user exists before adding them to the user Login list is updated
  checkUserExists(result) {
    this.onRetrieveUserLogins()

    try {
      for (let element of this.userLogins) {

        if (element["username"] == result.data.values.uName) {
          this.add = false;

        }

      }
    }
    catch (Error) {

    }
    if (this.add == false) {
      this.alertPresent("Alert", "Username already exists", "Please choose another username to sign up as someone nabbed the other one!")
    }
  }


  //Whole present signUp function
  presentSignUp() {
    this.add = true;
    this.signUpAlert()
  }




  //Generic alert set up, which can have modified headers, subHeaders, msg's depending on user preference
  async alertPresent(header, subHeader, msg) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: msg,
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  //Log Out function saving the current user's settings to the userLogins array
  async onLogOut() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'WARNING',
      message: 'Are you sure that you want to log out of the application?',
      //Sets up "Yes" and "No" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.determine = false;
        }
      },
      {
        text: "Yes",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.determine = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if (this.determine == true) {
    this.activeUser = false;
    GlobalConstants.activeUser = this.activeUser
    this.currentUser = GlobalConstants.currentUser
    this.delete = false;
    this.onRetrieveUserLogins()
    await this.delay(1000)
    this.onRetrieve("userLogins", this.userLogins)

    for (let element of this.userLogins) {
      for (let section of this.currentUser) {
        if (element["username"] == section["username"]) {
          element["username"] = section["username"]
          element["password"] = section["password"]
          element["dob"] = section["dob"]
          element["Medication"] = section["Medication"]
          element["trackedMedicine"] = section["trackedMedicine"]
          this.onSave("userLogins", this.userLogins)
          this.delete = true
        }
      }
    }







    this.deletecurrentUser()

    this.onSave("currentUser", this.currentUser)
    this.onRetrieve("currentUser", this.currentUser)}

  }

  //Deletes the current user from the system
  deletecurrentUser() {
    this.onRetrieve("currentUser", this.currentUser)

    this.currentUser = [{ "username": "", "password": "", "section": "", "Medication": [], "trackedMedicine": [] }]

    this.onSave("currentUser", this.currentUser)
    this.onRetrieve("currentUser", this.currentUser)

  }


  ngOnInit() {
    this.activeUser = GlobalConstants.activeUser;
    this.currentUser = GlobalConstants.currentUser;
    this.delay(1000)

  }

  //Delay set up
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
