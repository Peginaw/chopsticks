import React from 'react';
import zero from './pic.png';
import { useEffect } from 'react';


function PlayerOneRightHand({ onAttack }){
  let handleKeyPress = (event) => {
    // Check if the key pressed is the 'Enter' key
    switch (event.key) {
        case 'q':
            onAttack('P1-LL');
            break;
        case 'e':
            console.log('e pressed');
            break;
        case 'i':
            console.log('i pressed');
            break ;
        case 'p':
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
        <img src={zero} />
        <p>ATTACK with q,e,i, or p</p>
        
      </div>
    );
}


export default PlayerOneRighttHand;