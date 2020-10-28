import React, {Component} from 'react'

export default class PhotoUpload extends Component {
    constructor (props) {
        super(props);
        this.state = {
            images: []
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        this.setState({
            images: e.target.files
        })

    }

    render() {
        return (
            <div>
                <h1>upload some pictures</h1>
                <div>
                    <input type='file' onChange={this.onClick}/>
                </div>
                
                <div>
                    <input type='button' value='upload' onClick={this.props.onUpload(this.state)}/>
                </div>
            </div>
        )
    }
} 
//{this.state.images.length > 0 ? <div><img src={this.state.images}/></div>:''}