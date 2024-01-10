import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api uniqueId = ''
    @api lable =''
    @api options =[]

    changeHandler(event){
        this.callParent(event.target.value)

    }

    callParent(value){
        this.dispatchEvent(new CustomEvent('optionhandler', {
            detail:{
                lable:this.lable,
                value:value
            }
        }));
    }
    @api
    reset(value){
        this.template.querySelector('select').value=value
        this.callParent(value)
    }
}