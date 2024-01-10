import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api uniqueId = ''
    @api lable =''
    @api options =[]

    changeHandler(event){
        this.callParent(event.target.value)

    }

    callParent(value){
        this.dispatchEvent(new CustomEvent('optionHandler', {
            detail:{
                lable:this.lable,
                value:value
            }
        }));
    }
}