import React from "react";
import { useEffect } from "react";

export default function PlayerOne({ onAttack }) {

  let handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    switch (event.key) {
      case 'q':
        console.log('q pressed');
        onAttack('P1-LL');
        break;
      case 'e':
        console.log('e pressed');
        onAttack('P1-LR');
        break;
      case 'i':
        console.log('i pressed');
        onAttack('P1-RL');
        break;
      case 'p':
        console.log('p pressed');
        onAttack('P1-RR')
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