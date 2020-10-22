import React, {Component} from 'react'
export default class ConfirmSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = props.handle
    }
    //@Andy i will be working on this on sunday. dont touch it rn

    render () {
        return (
            <div>
                <h1>check your info</h1>
                <div>
                    {this.state.location.street}
                    {this.state.location.city}
                    {this.state.location.state}
                    {this.state.location.country}
                    {this.state.location.zipcode}
                    {this.state.details.beds}
                    {this.state.details.baths}
                    {this.state.description}
                    {this.state.price}
                    {this.state.dates.start_date}
                </div> 
            </div>
        )
    }
}

/*
location: {},
      description: "",
      details: {},
      price: 0,
      rules: "",
      dates: {},
*/