import React from "react";
import { useEffect } from "react";

export default function PlayerTwo({ onAttack }) {

  let handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    switch (event.key) {
      case 'a':
        onAttack('P2-LL');
        console.log('a pressed');
        break;
      case 'd':
        onAttack('P2-LR');
        console.log('d pressed');
        break;
      case 'k':
        onAttack('P2-RL');
        console.log('k pressed');
        break;
      case ';':
        onAttack('P2-RR')
        console.log('; pressed');
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