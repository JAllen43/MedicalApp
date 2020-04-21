import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


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
  activeUser = false;
  delete = false;
  updateCurrentUser: any=[];

  constructor(private storage: Storage, private alertController: AlertController) { }


  //Saves items to a determined location (represented by location) and a set value (determined by value))
  onSave(location, value) {
    this.storage.set(location, value)


  }

  //Retrieves items from a determined location (represented by location) and a set value (determined by the result)
  onRetrieve(location, result) {
    this.storage.get(location).then((result) => {
    })
  }

  //Allow the user to logon
  async onLogin() {
    this.counter = 0
    this.onRetrieve("userLogins", this.userLogins)
    if (this.userLogins.length == 0) {
      this.alertPresent("Alert", "Incorrect Username/Password", "Please make sure that you enter a valid username and password combination");
    }
    else {
      for (let i of this.userLogins) {
        //Checks whether login information provided is correct and whether user should be logged on
        if (i["username"] == this.inputtedUsername) {
          if (i["password"] == this.inputtedPassword) {
            //If user logon is correct the user is saved to a currentUser profile which has all of that specific user's settings
            this.onRetrieve("currentUser", this.currentUser)
            this.currentUser=[i]
            console.log("This is current user: ", i)
            this.onSave("currentUser", this.currentUser)
            this.onRetrieve("currentUser", this.currentUser)
            this.activeUser = true;
            this.onSave("activeUser", this.activeUser)
            console.log(this.activeUser)

          }
          else {
            //Checks if alert has already been processed (due to iteration of loop)
            if (this.counter != 1) {
              this.counter = this.counter + 1
              this.alertPresent("Alert", "Incorrect Username/Password", "Please make sure that you enter a valid username and password combination");
            }

          }
        }

        else {
          //Checks if alert has already been processed (due to iteration of loop)
          if (this.counter != 1) {
            this.counter = this.counter + 1
            this.alertPresent("Alert", "Incorrect Username/Password", "Please make sure that you enter a valid username and password combination");
          }
        }



      }
    }

  }

  //Sign Up Alert Box
  async signUpAlert() {
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
    console.log("This is result inside:", result);
    //Checks whether a user exists then adds it to the userLogins array if it doesn't
    this.checkUserExists(result)
    this.addingUserLogin(result)
  }
  //Adds a user login to the userLogins array
  addingUserLogin(result) {
    if (this.decision == "Ok" && this.add == true) {
      let prof: any = new Object();
      prof["username"] = result.data.values.uName;
      prof["password"] = result.data.values.pWord;
      prof["dob"] = result.data.values.dob;
      prof["Medication"] = [];
      prof["trackedMedicine"] = [];
      this.onRetrieve("userLogins", this.userLogins)
      this.userLogins.push(prof);
      this.onSave("userLogins", this.userLogins)
      this.onRetrieve("userLogins", this.userLogins)
      this.alertPresent("Sign Up Complete", "Registration successful", "You can now login by using your username and password in the respective boxes")
      console.log("This is after sign up alert: ", this.userLogins)
    }
  }

  //Checking whether a user exists before adding them to the user Login list is updated
  checkUserExists(result) {
    this.onRetrieve("userLogins", this.userLogins)
    if (this.userLogins.length != 0) {
      for (let element of this.userLogins) {
        if (element["username"] == result.data.values.uName) {
          this.add = false;

        }

      }
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
    console.log(result);

  }

  onLogOut() {
    this.activeUser = false;
    this.delete = false;
    this.onRetrieve("currentUser", this.currentUser);
    this.onRetrieve("userLogins", this.userLogins)
    console.log("This is the userLogins after retrieved", this.userLogins)
    console.log("This is the currentUser after retrieved", this.currentUser)

    for (let element of this.userLogins) {
      for (let section of this.currentUser) {
        if (element["username"] == section["username"]) {
          console.log("They are the same!!!!")
          element["username"] = section["username"]
          element["password"] = section["password"]
          element["dob"] = section["dob"]
          element["Medication"] = section["Medication"]
          element["trackedMedicine"] = section["trackedMedicine"]
          console.log("User logins after update: ", this.userLogins)
          this.onSave("userLogins", this.userLogins)
          this.delete = true
        }
      }
    }


    console.log("User Logins after: ", this.userLogins)
    this.deletecurrentUser()

    this.onSave("currentUser", this.currentUser)
    this.onRetrieve("currentUser", this.currentUser)

  }
  deletecurrentUser() {
    this.onRetrieve("currentUser", this.currentUser)
    console.log("Inside deletion: ", this.currentUser)
    this.currentUser=[{"username": "", "password": "", "section": "", "Medication": [], "trackedMedicine":[]}]
    console.log(this.currentUser)
    this.onSave("currentUser", this.currentUser)
    this.onRetrieve("currentUser", this.currentUser)
    console.log("This is the current user: ", this.currentUser)
    /*if (this.delete == true) {
      for (let section of this.currentUser) {
        console.log(section)
        section["username"] = "";
        section["password"] = "";
        section["dob"] = "";
        section["Medication"] = [];
        section["trackedMedicine"] = []
      }
    }*/
  }
  ngOnInit() {
  }

}
