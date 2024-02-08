import React from 'react';


class PlayerOneLeftHand extends React.Component {
  handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    if (event.key === 'Enter') {
      console.log('Enter key pressed!');
      // Perform your desired action here
    }
  };

  render() {
    return (
      <div onKeyDown={this.handleKeyPress}>
        <p>ATTACK with q,e,i, or p</p>
        
      </div>
    );
  }
}

export default PlayerOneLeftHand;