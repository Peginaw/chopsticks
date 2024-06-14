import React from "react";
import { useEffect } from "react";

export default function PlayerOne({ onAttack }) {

  let handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    switch (event.key) {
      case 'q':
        onAttack('P1-LL');
        console.log('q pressed');
        break;
      case 'e':
        onAttack('P1-LR');
        console.log('e pressed');
        break;
      case 'i':
        onAttack('P1-RL');
        console.log('i pressed');
        break;
      case 'p':
        onAttack('P1-RR')
        console.log('p pressed');
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
      <button className="p1LH">R</button>
      <button className="p1LH">L</button>
    </div>
  );
}