import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  currentUser: any = [];
  displayArray: any = [];
  userLogins: any=[];
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

  constructor(private storage: Storage, private alertController: AlertController, private route: Router) { }

  ngOnInit() {
    this.onRetrieve("activeUser", this.activeUser)
    this.activeUser = GlobalConstants.activeUser;
    console.log("ACTIVE USER: ", this.activeUser)
    this.currentUser=GlobalConstants.currentUser
    console.log("CURRENT USER: ",this.currentUser)
    for (let element of this.currentUser){
      this.displayArray=[element["trackedMedicine"]]
    }
    console.log("DISPLAY ARRAY: ",this.displayArray)
    if (this.activeUser == false) {
      this.alertPresent("Alert", "Please login", "To access all the features of the application you will need to sign up for an account and login! Please do this by following the link!")
    }
    //this.retrieveAndSetMedication()
  }
//Redirects the user to the login screen
  goToLogin() {
    this.route.navigate(['login'])
  }

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
          console.log("Confirming login press")
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

  //retrieve tracked medicine to be set onto the page
  async retrieveAndSetMedication() {
    console.log("This should be happening first!")
    this.storage.get("currentUser").then((result) => {
      this.currentUser = result
      console.log("Inside retrieval: ", this.currentUser)


    })
    console.log("Hello", this.currentUser)
    await this.delay(50);
    for (let element of this.currentUser) {
      this.displayArray = element["trackedMedicine"]
      console.log(this.displayArray)
    }



  }
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
  }

  onClick(name) {
    //this.saveInputtedTime(name)
    this.calculateTime()
    this.state = 'start';
    this.startTimer(this.startDuration);
    //this.delay(1000)
  }
  startTimer(startDuration) {

    this.timer = startDuration;
    console.log("This is the timer: ", this.timer)
    this.updateTimeValue();
    while (this.timer > 0) {
      this.delay(1000)
      this.updateTimeValue()
    }
    //this.delay(1000)
    //setInterval(() => {
    // this.updateTimeValue();

    // }, 1000);

  }
  stopTimer() {
    this.state = 'stop';
    this.time.next('00:00:00')

  }
  updateTimeValue() {
    this.hours = this.timer / 3600;

    this.hours = Math.floor(this.hours)
    this.hoursLeft = this.hours

    this.hoursLeft = this.hoursLeft * 3600

    this.result1 = this.timer - this.hoursLeft

    this.minutes = Math.floor(this.result1 / 60)
    if (this.minutes == 60) {
      this.minutes = 59
      this.hours = this.hours - 1
      console.log("Gone through")
    }


    let seconds: any = this.timer % 60;



    //hours1 = String('0' + hour1).slice(-2);
    this.minutes = String('0' + Math.floor(this.minutes)).slice(-2);
    seconds = String('0' + seconds).slice(-2);

    //if (seconds>9){
    // seconds=String(seconds)
    // }
    //else{
    //seconds=String("0"+seconds)
    //}
    console.log("This is the hours: ", this.hours)
    if (this.state == 'start') {
      const text = this.hours + ":" + this.minutes + ':' + seconds;
      console.log(text)
      this.time.next(text);
      //console.log(seconds)
      this.timer = this.timer - 1;
      this.delay(1000)



    }


    if (this.timer < 0) {
      this.startTimer(this.startDuration)

    }






  }
 async userLogins1(){
    this.retrieve()
    await this.delay(50)
    console.log("USER LOGINS: ", this.userLogins)
  }
  retrieve(){
    this.storage.get("userLogins").then((result) => {
      this.delay(10000)
      this.userLogins=result
      
      

    })
  }
}
