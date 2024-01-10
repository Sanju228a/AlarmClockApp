import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png'
    ringtone = new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
    currentTime = ""
    hours =[]
    minutes= []
    meridiums = ['AM', 'PM']
    hourSelected
    meridiumSelected
    minuteSelected
    alarmTime
    isAlarmTriggered = false
    isAlarmSet=false

    get isFieldNotSelected(){      //getter to disable set alarm button when no value is present
        return !(this.hourSelected && this.minuteSelected && this.meridiumSelected)
    }
    get shakeImage(){        //shanke image handler i.e; custom styling
        return this.isAlarmTriggered ? 'shake':''
    }

    connectedCallback(){
        this.currentTimeHandler()
        this.createHourOption()
        this.createMinutesOption()
    }
    currentTimeHandler(){        //getting the current time and displaying it in the clock
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

            if(this.alarmTime === `${hour}:${min} ${ampm}`){
                this.isAlarmTriggered = true
                this.ringtone.play()
                this.ringtone.loop = true
            }
            
        }, 1000)
    }
    createHourOption(){       //append 0 when value is <10 in dropdown and passing the value to show in dropdown dynamically
        for(let i=1; i<=12; i++){
            let val = i<10 ? "0"+i: i
            this.hours.push(val)
        }
    }
    createMinutesOption(){       //append 0 when value is <10 in dropdown and passing the value to show in dropdown dynamically
        for(let i=0; i<60; i++){
            let val = i<10 ? "0"+i: i
            this.minutes.push(val)
        }
    }

    optionhandler(event){          //calling custome event from child and passing the value
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
        
    }
    setAlarmHandler(){     //to set alarm and display value and handle button click scenerio
        this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridiumSelected}`
        this.isAlarmSet = true
    }
    clearAlarmHandler(){   //calling child element function to reset value and handle the clear alarm functionality
        this.isAlarmSet = false 
        this.isAlarmTriggered = false
        this.ringtone.pause()
        this.alarmTime=''
        const elements = this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(element => {
            element.reset("")
        });
    }
}