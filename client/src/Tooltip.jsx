// source: https://codepen.io/andrewerrico/pen/OjbvvWs

import React from 'react';

class Tooltip extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        displayTooltip: false
      }
      this.hideTooltip = this.hideTooltip.bind(this)
      this.showTooltip = this.showTooltip.bind(this)
    }
    
    hideTooltip () {
      this.setState({displayTooltip: false})
      
    }
    showTooltip () {
      this.setState({displayTooltip: true})
    }
  
    render() {
      let message = this.props.message
      return (
        <span className='tooltip'
            onMouseLeave={this.hideTooltip}
          >
          {this.state.displayTooltip &&
          <div className='tooltip-bubble tooltip-left'>
            <div className='tooltip-message'>{message}</div>
          </div>
          }
          <span 
            className='tooltip-trigger'
            onMouseOver={this.showTooltip}
            >
            {this.props.children}
          </span>
        </span>
      )
    }
  }

export default Tooltip;