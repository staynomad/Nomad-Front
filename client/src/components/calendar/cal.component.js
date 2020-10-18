import React, {Component} from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
//docs:
//http://react-day-picker.js.org/
export default class Calendar extends Component {
    constructor() {
        super();
        this.state ={
            date: null
        }
        this.handleDayClick = this.handleDayClick.bind(this)
    }

    handleDayClick() {
        
    }
    render() {
        return (
            <div>
                <DayPicker onDayClick={this.handleDayClick}/>
            </div>
        )
    }
}