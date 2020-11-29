import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./createListing.css";
import {
  incompleteForm,
  completeForm,
} from "../../redux/actions/loadingActions";
class TitleCL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      charleft: 40,
      maxchars: 40,
    };
  }
  //
  componentDidMount() {
    const oldTitle = this.props.listingData.CreateListing.state.title;
    const oldDif = this.state.maxchars - oldTitle.length;
    if (oldTitle === "") {
      this.props.incompleteForm();
    } else {
      this.props.completeForm();
    }

    this.setState({
      title: oldTitle,
      charleft: oldDif,
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    const dif = this.state.maxchars - value.length;
    if (value.length <= this.state.maxchars) {
      this.props.completeForm();
      this.setState({
        [name]: value,
        charleft: dif,
      });
    }
    if (value === "") {
      this.props.incompleteForm();
    }

    this.props.handle(value, name);
  };

  render() {
    return (
      <div>
        <div className="startText">Title</div>
        <br />
        <div className="questionText">
          What do you want to call this listing?
        </div>
        <br />
        <textarea
          type="text"
          name="title"
          className="textInputBox"
          value={this.state.title}
          placeholder="e.g. Beautiful apartment overlooking Central Park"
          onChange={this.handleChange}
          required
        ></textarea>
        <h3>{this.state.charleft} Characters Left</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listingData: state,
    formCompleted: state.Loading.formCompleted,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    completeForm: () => dispatch(completeForm()),
    incompleteForm: () => dispatch(incompleteForm()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TitleCL)
);
