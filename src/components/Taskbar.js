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

const OverlapContainer = styled.span`
  display: inline-block;
  position: relative;
  width: auto;
  height: 16px;
  vertical-align: baseline;
`;

const ColonChar = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
`;

const XChar = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: transparent;
  line-height: 1;
  
  ::selection {
    color: white;
    background-color: rgba(0, 123, 255, 0.3);
  }
  
  ::-moz-selection {
    color: white;
    background-color: rgba(0, 123, 255, 0.3);
  }
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
    const now = new Date();
    const minute = now.getMinutes();
    // Show the modulo value being used: 97 for even minutes, 17 for odd minutes
    return minute % 2 === 0 ? 97 : 17;
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
        Démarrer
      </StartButton>
      
      <SystemTray>
        <IconContainer>
          <FiWifi size={16} />
          <FiVolume2 size={16} />
        </IconContainer>
        
        <TimeDisplay>
              {(() => {
                const hour = currentTime.getHours();
                const minute = currentTime.getMinutes();
                
                return (
                  <>
                    {hour.toString().padStart(2, '0')}
                    <span style={{ marginLeft: '4px', marginRight: '8px' }}>
                <OverlapContainer>
                  <ColonChar>:</ColonChar>
                  <XChar>x</XChar>
                </OverlapContainer>
              </span>
                    {minute.toString().padStart(2, '0')}
                  </>
                );
              })()}
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