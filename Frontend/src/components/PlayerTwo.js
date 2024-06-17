import React from "react";
import { useEffect } from "react";

export default function PlayerTwo({ onAttack }) {

  let handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    switch (event.key) {
      case 'a':
        console.log('a pressed');
        onAttack('P2-LL');
        break;
      case 'd':
        console.log('d pressed');
        onAttack('P2-LR');
        break;
      case 'k':
        console.log('k pressed');
        onAttack('P2-RL');
        break;
      case ';':
        console.log('; pressed');
        onAttack('P2-RR')
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onAttack]); // Include onAttack in the dependency array if it's used inside handleKeyPress

  return (
    <div>
      <button className="p2LH">R</button>
      <button className="p2LH">L</button>
    </div>
  );
}