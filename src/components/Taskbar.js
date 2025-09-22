import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiBattery, FiWifi, FiVolume2 } from 'react-icons/fi';

const TaskbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
`;

const StartButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-size: 14px;
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  color: white;
  font-weight: 400;
  height: 100%;
`;

const BatteryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  color: white;
  height: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  
  svg {
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryPercentage, setBatteryPercentage] = useState(0);

  // Get constant battery percentage for testing
  const getCurrentBattery = () => {
    return 100;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Update battery percentage
      setBatteryPercentage(getCurrentBattery());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <TaskbarContainer>
      <StartButton>
        <span style={{ fontSize: '16px', marginRight: '4px' }}>⊞</span>
        Start
      </StartButton>
      
      <SystemTray>
        <IconContainer>
          <FiWifi size={16} />
          <FiVolume2 size={16} />
        </IconContainer>
        
        <TimeDisplay>
              ({(() => {
                const hour = currentTime.getHours() || 24;
                const minute = currentTime.getMinutes() || 60;
                
                return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              })()})
            </TimeDisplay>
        
        <BatteryContainer>
           <span>%{batteryPercentage}</span>
           <FiBattery size={16} />
         </BatteryContainer>
      </SystemTray>
    </TaskbarContainer>
  );
}

export default Taskbar;