import React, { Component } from "react";

class CheckBox extends Component {
  state = {
    checked: false
  };
  render() {
    return (
      <div className="form-check-inline">
        <input
        style={checkBoxStyle}
          type="checkbox"
          value={this.state.checked}
          onClick={() => {
            this.setState(prevState => ({
              checked: !prevState.checked
            }));

            this.props.calculateTotal(this.props.price, !this.state.checked);
          }}
        />
        <div>{"I want this room ! "}</div>
      </div>
    );
  }
}

const checkBoxStyle={
    width:"10px",
    height:"10px",
    marginBottom:"0px",
    marginRight:"10px"
};

export default CheckBox;
