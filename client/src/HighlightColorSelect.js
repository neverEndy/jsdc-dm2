import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import {
  yellow500, orange300, redA100, purpleA100, blueA100, cyanA100, lightGreenA700, lightGreenA200,
} from 'material-ui/styles/colors';

export default class HighlightColorSelect extends Component {
  render() {
    return (
      <span style={{ zIndex: '3001' }}>
        <div
          onClick={this.props.toggleColorPicker}
          style={{
            padding: '2px', borderRadius: '1px', boxShadow: '0 0 0 1px rgba(0,0,0,.1)', display: 'inline-block', cursor: 'pointer', marginRight: '8px', backgroundColor: '#FFF',
          }}
        >
          <div style={{
            height: '16px', width: '32px', background: this.props.highlightColor, borderRadius: '2px',
          }}
          />
        </div>
        {this.props.displayColorPicker
          && (
          <div style={{ position: 'absolute' }}>
            <GithubPicker
              width="250px"
              colors={[yellow500, orange300, redA100, purpleA100, blueA100, cyanA100, lightGreenA700, lightGreenA200, 'white', 'black']}
              color={this.props.highlightColor}
              onChange={(color) => { this.props.setHighlightColor(color.hex); }}
            />
          </div>
          )}
      </span>
    );
  }
}
