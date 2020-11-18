import React, { useState } from 'react';
import Confetti from '../components/Confetti/Confetti';

export const confettiContext = React.createContext();

const ConfettiProvider = ({ children })=>{
  const [isOpen, setIsOpen] = useState(false);
  const congrat = React.useCallback(
    () => {
      setIsOpen(true);
      setTimeout(()=>setIsOpen(false),4000)
    },
    [],
  );
  return (
    <confettiContext.Provider value={{
      congrat,
    }}>
      {isOpen && <Confetti/>}
      {children}
    </confettiContext.Provider>
  )
};

export default ConfettiProvider;