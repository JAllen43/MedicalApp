import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  decision: boolean;
  medication: any = [];
  currentUser: any = [];
  variable: any;
  add: boolean;
  index: number;
  lock: boolean;
  saveArray: any = [];
  counter: number;
  activeUser: boolean;
  index1: number;
  remove: any = [];
  currentImage: any;

  constructor(private storage: Storage, private alertController: AlertController, private route: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.activeUser = GlobalConstants.activeUser;
    this.currentUser = GlobalConstants.currentUser;
    if (this.activeUser == false) {
      this.alertPresentLogin("Alert", "Please login", "To access all the features of the application you will need to sign up for an account and login! Please do this by following the link!")
    }
    else {
      this.retrieveAndSetMedication()
    }


  }

  //Action that occurs if the user clicks the checkmark button on a medication that has already been added to the tracked list.
  confirmation() {
    this.presentToast("This medication has already been added to the tracker, go to the Tracker screen to see it!")
  }

  //Show message about Medication being added to tracker screen for 3 seconds
  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present()
  }
  //Redirects the user to the login screen
  goToLogin() {
    this.route.navigate(['login'])
  }
  async alertPresentLogin(header, subHeader, msg) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: header,
      subHeader: subHeader,
      message: msg,
      buttons: [{
        text: 'Go to login page',
        role: "login",
        handler: () => {
          this.goToLogin()
        },
      }]
    });

    await alert.present();
    let result = await alert.onDidDismiss();

  }

  //Used to give a time delay in order for components to be retrieved from local storage before being updated
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Used to retrieve information from the user profile and set it to the medication to be displayed on the screen
  async retrieveAndSetMedication() {
    for (let element of this.currentUser) {
      this.medication = element["Medication"]
    }
  }

  //Allow sign up box for new drug to be displayed to the user for a medication to be added to the application
  async signUpNewDrug() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'New Drug',
      //Gives input boxes to be used
      inputs: [
        {
          name: 'drugName',
          type: 'text',
          placeholder: 'Enter your drug name here'
        },
        {
          name: 'drugDesc',
          type: 'text',
          placeholder: 'Enter your drug description here'
        }],
      //Sets up "Ok" and "Cancel" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.decision = false;
        }
      },
      {
        text: "Ok",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.addNewEntry(result)
  }

  //Presents an alert with a specified header, subHeader and Message
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
  //Adding a new entry to the medication list in the user profile
  addNewEntry(result) {
    this.add = true
    //Checks whether the "Ok" button was pressed. As a result it will enter the newEntry into the medicine array
    if (this.decision == true) {
      let newEntry: any = new Object();
      newEntry["name"] = result.data.values.drugName;
      newEntry["desc"] = result.data.values.drugDesc;
      newEntry["drugstate"] = false
      newEntry["timerTime"] = new Date();
      newEntry["picture"] = this.currentImage;
      //Checks whether this medicine is a duplicate or has no name, in which case an alert will be activated
      for (let med of this.medication) {
        if (newEntry["name"] == med["name"] || newEntry["name"] == "") {
          this.add = false;
          this.alertPresent("Alert", "Common Drug Entered", "Please enter a drug that is not currently on the screen")
          break;
        }
        else {
          this.add = true;
        }
      }
      if (this.add == true) {
        //newEntry pushed onto array
        this.medication.push(newEntry);
        //Updated array is assigned to the user profile that is currently active
        for (let element of this.currentUser) {
          element["Medication"] = this.medication
        }
      }
    }

  }

  //Alert for signing up new drug
  newDrug() {
    this.onRetrieveCurrentUser()
    this.signUpNewDrug()
  }


  //Save information to local storage
  onSave(location, value) {
    this.storage.set(location, value)
  }

  //Saves current user to the local storage
  onSaveCurrentUser() {
    this.storage.set("currentUser", this.currentUser)
  }

  //Retrieves items from a determined location (represented by location) and a set value (determined by the result)
  async onRetrieveCurrentUser() {
    this.storage.get("currentUser").then((result) => {
      this.currentUser = result
      this.counter = 1;
      return this.currentUser
    })
  }

  //Pressing the Information button will redirect the user to a page which has more information on the drug
  onInfoPress(med) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: med
      }
    };
    this.route.navigate(['details'], navigationExtras);
  }

  //On the add button being pressed it adds the intended medication to the trackedmedicine array
  onAddPress(med) {
    this.currentUser = GlobalConstants.currentUser



    this.lock = true;

    for (let element of this.medication) {


      if (med == element["name"]) {

        for (let section of this.currentUser) {
          GlobalConstants.counter = section["listFull"]

          if (GlobalConstants.counter == 0) {

            section["trackedMedicine"] = element
            this.presentToast("Medication was added to your Tracker screen")
            GlobalConstants.counter = 1
            section["listFull"] = GlobalConstants.counter

            element["drugstate"] = true
          }
          else {

            this.presentToast("This medication can't be added as there is already a medication in the tracker list!")

          }

        }
      }
    }
    GlobalConstants.currentUser = this.currentUser
    this.onSaveCurrentUser()

  }
  //Remove the medication that is in the tracked array from the Tracker screen/array
  async removeTracked(med) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'WARNING',
      message: 'Are you sure that you want to remove this medication from the tracked list? Your time settings for this drug will be deleted.',
      //Sets up "Yes" and "No" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.decision = false;
        }
      },
      {
        text: "Yes",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    if (this.decision == true) {
    for (let element of this.currentUser) {
      for (let section of [element["trackedMedicine"]]) {
        if (med == section["name"]) {
          this.index1 = [element["trackedMedicine"]].indexOf(section)

          this.remove = [element["trackedMedicine"]]
          this.remove.splice(this.index1, 1)

          element["trackedMedicine"] = this.remove

          GlobalConstants.counter = 0
          element["listFull"] = GlobalConstants.counter
        }
      }
      for (let section of element["Medication"]) {
        if (med == section["name"]) {
          section["drugstate"] = false

        }
      }
      GlobalConstants.currentUser = this.currentUser
    }
    this.presentToast("This medication has been removed from your tracked list")}
  }

  //Removes relevant medication from the current user's medication list and profile
  async removeMed(med) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'WARNING',
      message: 'Are you sure that you want to remove this medication? This will remove all of the data of this medication (including tracked data) from the application.',
      //Sets up "Yes" and "No" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.decision = false;
        }
      },
      {
        text: "Yes",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();

    console.log("AFTER ALERT")
    if (this.decision == true) {
      console.log("Decision is: ", this.decision)

      for (let element of this.currentUser) {
        for (let section of element["Medication"]) {
          if (section["name"] == med) {
            this.index = element["Medication"].indexOf(section);
            element["Medication"].splice(this.index, 1);
            this.medication = element["Medication"];
          }
        }
        for (let section of [element["trackedMedicine"]]) {
          if (med == section["name"]) {
            this.index1 = [element["trackedMedicine"]].indexOf(section)
            this.remove = [element["trackedMedicine"]]
            this.remove.splice(this.index1, 1)
            element["trackedMedicine"] = this.remove
            GlobalConstants.counter = 0
            element["listFull"] = GlobalConstants.counter
          }
        }

        for (let i of this.currentUser) {
          i["Medication"] = element["Medication"]
          i["trackedMedicine"] = element["trackedMedicine"]
          i["listFull"] = element["listFull"]
        }
      }

      GlobalConstants.currentUser = this.currentUser
      this.onSaveCurrentUser()
    }
  }

  //Presents an alert to check whether user wants to execute an action or not
  async actionConfirmation(msg) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'New Drug',
      message: msg,
      //Sets up "Yes" and "No" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.decision = false;
        }
      },
      {
        text: "Yes",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();

  }
}
