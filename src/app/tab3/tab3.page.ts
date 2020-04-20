import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  displayArray: any = [];
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  user: any;
  retrieveData: any;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  state: 'start' | 'stop' = 'stop';
  startDuration: number;
  circleR = circleR;
  circleDasharray = circleDasharray;
  inputtedTime = new Date();
  currentTime = new Date();
  currentMinutes: any;
  currentHours: any;
  currentSeconds: any;
  result: any;
  inputHours: any;
  inputMinutes: any;
  inputSeconds: any;
  calculation: any;
  hours: any;
  minutes: any;
  hoursLeft: any;
  result1: any;
  hours1: any;
  timeRemaining: any;
  
  constructor(private localNotifications: LocalNotifications) { 


  }
  convertTime(n) {
    return n > 9 ? "" : "0" + n;
  }
  ngOnInit() {
    this.updateItems()
  }
  //Allows the timer to work
  saveInputtedTime(name){
    console.log("This is the med name ", name)
    console.log(this.inputtedTime)
    this.retrieveItem()
    for(let element of this.user)
    {
      for(let element1 of element["trackedMedicine"]){
        if (element1["name"] == name){
          console.log(element1["timerTime"])
          element1["timerTime"]=this.inputtedTime
          console.log(element1["timerTime"])

          console.log("It went through!")
        }
      }
    }
    this.saveItem(this.user)
  }
  datetime() {
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
    console.log("This is inputSeconds",this.inputSeconds)
    //Checking values to assign them correctly and in the correct format
    if (this.currentHours > this.inputHours) {
      this.inputHours = 24 - ((this.currentHours - this.inputHours) + 1)
      console.log("This is input hours: ", this.inputHours)
    }
    else {

      if (this.inputHours == this.currentHours) {
        this.inputHours = 0
        console.log("SAME HOURS: ", this.inputHours)
      }
      else {
        this.inputHours = (this.inputHours - this.currentHours)
        console.log("Input hours when different", this.inputHours)
      }
    }
    if (this.inputMinutes == this.currentMinutes) {
      console.log("This is input hours when same: ", this.inputHours)
      this.inputMinutes = 0;
    }
    else if (this.inputMinutes > this.currentMinutes) {
      console.log(this.inputMinutes)
      console.log(this.currentMinutes)

      this.inputMinutes = (this.inputMinutes - this.currentMinutes)-1
      console.log("This is input minutes111 ", this.inputMinutes)

    }
    else {
      this.inputMinutes = this.inputMinutes + (60 - this.currentMinutes)
      console.log("This is input minutes: ", this.inputMinutes)

    }
    
    this.startDuration = (this.inputHours * 3600) + (this.inputMinutes * 60) + (this.inputSeconds)
    console.log(this.startDuration)




  }
  onClick(name) {
    //this.saveInputtedTime(name)
    this.datetime()
    this.state = 'start';
    this.startTimer(this.startDuration);
    clearInterval(this.interval);
  }
  startTimer(startDuration) {
    clearInterval(this.interval);
    this.timer = startDuration;
    console.log("This is the timer: ", this.timer)
    this.updateTimeValue();
    setInterval(() => {
      this.updateTimeValue();
      clearInterval(this.interval)
    }, 1000);

  }
  stopTimer() {
    this.state = 'stop';
    clearInterval(this.interval)
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
      clearInterval(this.interval);



    }

   
    if (this.timer < 0) {
      this.startTimer(this.startDuration)

    }






  }
  //Updates the Tracker list to show which medications are to be tracked
  updateItems() {
    this.retrieveItem()
    for (let element of this.user) {
      console.log("This is the element: ", element)
      console.log("This is the tracked Medication of element:", element["trackedMedicine"])
      this.displayArray = element["trackedMedicine"]
      console.log(this.displayArray)

    }
  }

  //Used to retrieve the current user and the relevant data from local Storage
  retrieveItem() {
    this.retrieveData = localStorage.getItem("currentUser");
    console.log(this.retrieveData)
    this.user = JSON.parse(this.retrieveData);
    console.log("This is current user: ", this.user);

  }
  test() {
    this.retrieveTime()
    for (let x of this.user) {
      console.log("This is x: ", x)
      for (let i of x["trackedMedicine"]) {
        console.log("This is i: ", i)
        console.log(i["timerTime"])
        this.startDuration = i["timerTime"]
        this.timeRemaining = i["timeRemaining"]
        console.log("This is time remaining: ", this.timeRemaining)
        console.log(this.startDuration)
      }

    }
  }
  saveItem(profile) {
    console.log(profile);
    localStorage.setItem("currentUser", JSON.stringify(profile));

  }

  retrieveTime() {
    this.retrieveData = localStorage.getItem("currentUser");
    console.log(this.retrieveData)
    this.user = JSON.parse(this.retrieveData);
    console.log("This is current user: ", this.user);


  }


  scheduleNotif(time: number){
    this.localNotifications.schedule({id: 5, 
      title: "Tester", 
      text: "This is a test",
      trigger:{
        in: time, 
        unit: ELocalNotificationTriggerUnit.SECOND
      }


  })

}
}
