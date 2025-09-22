import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

function App() {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = () => {
    setIsLocked(false);
  };



  return (
    <div className="App">
      {isLocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;