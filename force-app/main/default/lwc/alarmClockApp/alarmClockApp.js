import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png'
    currentTime = ""
    hours =[]
    minutes= []
    meridiums = ['AM', 'PM']
    connectedCallback(){
        this.currentTimeHandler()
        this.createHourOption()
        this.createMinutesOption()
    }
    currentTimeHandler(){
        setInterval(()=>{
            let dateTime = new Date()
            let hour = dateTime.getHours()
            let min = dateTime.getMinutes()
            let sec = dateTime.getSeconds()
            let ampm = "AM"
            if(hour === 0){
                hour = 12
            }
            else if(hour === 12){
                ampm = 'PM'
            }
            else if(hour >= 12){
                hour = hour - 12
                ampm = "PM"
            }
            hour = hour < 10 ? "0"+ hour: hour;
            min = min < 10 ? "0"+ min: min;
            sec = sec < 10 ? "0"+ sec: sec;
            this.currentTime = `${hour}:${min}:${sec} ${ampm}`
            
        }, 1000)
    }
    createHourOption(){
        for(let i=1; i<=12; i++){
            let val = i<10 ? "0"+i: i
            this.hours.push(val)
        }
    }
    createMinutesOption(){
        for(let i=0; i<60; i++){
            let val = i<10 ? "0"+i: i
            this.minutes.push(val)
        }
    }

    optionhandler(event){
        const {lable, value} = event.detail
        if(lable === "Hour(s)"){
            this.hourSelected = value
        }else if(lable === "Minute(s)"){
            this.minuteSelected = value
        }
        else if(lable === "AM/PM"){
            this.meridiumSelected = value
        }
        else{}
        
    console.log('this.hourSelected:', this.hourSelected);
    console.log('this.minuteSelected:', this.minuteSelected);
    console.log('this.meridiumSelected:', this.meridiumSelected);
    }
}