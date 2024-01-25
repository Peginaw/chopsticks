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
      <div>
        <p>Press the Enter key:</p>
        <input
          type="text"
          onKeyDown={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default PlayerOneLeftHand;