import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  currentUser: any = [];
  displayArray: any = [];
  userLogins: any = [];
  inputHours: any;
  inputMinutes: any;
  inputSeconds: any;
  inputtedTime = new Date();
  currentTime = new Date();
  currentMinutes: any;
  currentHours: any;
  currentSeconds: any;
  startDuration: number;
  state: 'start' | 'stop' = 'stop';
  timer: number;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  hours: any;
  hoursLeft: any;
  minutes: any;
  result1: any;
  hours1: any;
  interval;
  activeUser: boolean;
  backdropDismiss: false;
  countdownTime = new Date();
  drugName: string;
  activeTimer: boolean;
  index: number;
  remove: any=[];
  counter: number;
  decision: boolean;

  constructor(private storage: Storage, private alertController: AlertController, private route: Router, private localNotifications: LocalNotifications, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.onRetrieve("activeUser", this.activeUser)
    this.activeUser = GlobalConstants.activeUser;
    this.currentUser = GlobalConstants.currentUser
    this.countdownTime = GlobalConstants.countdownTime
    this.counter=GlobalConstants.counter

    for (let element of this.currentUser) {
      this.activeTimer = element["activeTimer"]
      
      this.displayArray = [element["trackedMedicine"]]
      for (let section of [element["trackedMedicine"]]) {
     
      }
    }

    if (this.activeUser == false) {
      this.alertPresent("Alert", "Please login", "To access all the features of the application you will need to sign up for an account and login! Please do this by following the link!")
    }
    if (this.activeTimer == true) {
      for (let element of this.displayArray) {
        this.drugName=element["name"]
        this.inputtedTime=element["timerTime"]

        this.onClick(this.drugName)

      }

    }
  }
  //Redirects the user to the login screen
  goToLogin() {
    this.route.navigate(['login'])
  }
  //Set up local notification with custom message
  Notification(msg) {
    this.localNotifications.schedule({
      id: 1,
      text: msg,
    })
  }

  //Alert set up to be presented with custom header, subheader and message
  async alertPresent(header, subHeader, msg) {
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
  onRetrieve(location, value) {
    this.storage.get(location).then((value) => {

    })
  }
  onSave(location, value) {
    this.storage.set(location, value)
  }

  //Delay function that can be used for a time interval
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  //Calculates seconds needed to start countdown
  calculateTime() {
    //Calculates Hours/Minutes required for the timer to function
    this.inputHours = this.inputtedTime
    this.inputMinutes = this.inputtedTime
    this.inputHours = this.inputHours.substring(0, 2)
    this.inputHours = parseInt(this.inputHours, 10)
    this.inputMinutes = this.inputMinutes.substring(3, 5)
    this.inputMinutes = parseInt(this.inputMinutes)
    this.currentMinutes = this.currentTime.getMinutes();
    this.currentHours = this.currentTime.getHours();
    this.currentSeconds = this.currentTime.getSeconds();
    this.inputSeconds = 60 - this.currentTime.getSeconds();

    //Checking values to assign them correctly and in the correct format
    if (this.currentHours > this.inputHours) {
      this.inputHours = 24 - ((this.currentHours - this.inputHours) + 1)
    }

    else {

      if (this.inputHours == this.currentHours) {
        this.inputHours = 0
      }

      else {
        this.inputHours = (this.inputHours - this.currentHours)
      }
    }

    if (this.inputMinutes == this.currentMinutes) {
      this.inputMinutes = 0;
    }

    else if (this.inputMinutes > this.currentMinutes) {
      this.inputMinutes = (this.inputMinutes - this.currentMinutes) - 1
    }

    else {
      this.inputMinutes = this.inputMinutes + (60 - this.currentMinutes)

    }

    this.startDuration = (this.inputHours * 3600) + (this.inputMinutes * 60) + (this.inputSeconds)
    for (let element of this.currentUser) {
      for (let section of [element["trackedMedicine"]]) {
        section["timerTime"] = this.inputtedTime
      }
    }
    GlobalConstants.currentUser = this.currentUser
    
  }

  //On Button being clicked the timer is started
  onClick(name) {
    for (let element of this.currentUser) {
      element["activeTimer"] = true
    }
 
    GlobalConstants.currentUser = this.currentUser
    this.drugName = name
    
    this.calculateTime()
    this.state = 'start';
    this.startTimer(this.startDuration, this.drugName);
    this.delay(1000)
  }
  async startTimer(startDuration, name) {

    this.timer = startDuration;
   
    this.updateTimeValue(name);
    while (this.timer > 0) {
      await this.delay(1000)
      this.updateTimeValue(name)
    }
  }
  //Stops the timer when actioned
  stopTimer() {
    this.state = 'stop';
    this.time.next('00:00:00')

  }
  //Updates the timer value countdown time
  updateTimeValue(name) {
    this.hours = this.timer / 3600;

    this.hours = Math.floor(this.hours)
    this.hoursLeft = this.hours

    this.hoursLeft = this.hoursLeft * 3600

    this.result1 = this.timer - this.hoursLeft

    this.minutes = Math.floor(this.result1 / 60)
    if (this.minutes == 60) {
      this.minutes = 59
      this.hours = this.hours - 1
 
    }


    let seconds: any = this.timer % 60;




    this.minutes = String('0' + Math.floor(this.minutes)).slice(-2);
    seconds = String('0' + seconds).slice(-2);


    if (this.state == 'start') {
      const text = this.hours + ":" + this.minutes + ':' + seconds;
  
      this.time.next(text);
      this.timer = this.timer - 1;
    }

    if (this.timer <= 0) {
      this.Notification("Time to take your " + name + " medication!")
      this.startTimer(86400, name)
    }






  }

//Removes a medication from the tracked list
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
          this.index = [element["trackedMedicine"]].indexOf(section)
          this.remove = [element["trackedMedicine"]]
          this.remove.splice(this.index, 1)
          element["trackedMedicine"] = this.remove
          this.displayArray=this.remove
          GlobalConstants.counter = 0
          element["listFull"] = GlobalConstants.counter
          this.counter=GlobalConstants.counter
        }
      }
      for (let section of element["Medication"]) {
        if (med == section["name"]) {
          section["drugstate"] = false

        }
      }
      GlobalConstants.currentUser=this.currentUser
    }

    this.presentToast("This medication has been removed from your tracked list")}
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
}
