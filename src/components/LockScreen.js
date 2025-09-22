import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FiUser, FiLock, FiActivity } from 'react-icons/fi';
import Taskbar from './Taskbar';

const LockScreenContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0203f7 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 48px; /* Account for taskbar */
`;

const UserAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #0203f7, #4a4aff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border: 4px solid rgba(255, 255, 255, 0.2);
`;

const UserName = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 300;
  margin: 0 0 8px 0;
  font-family: 'Segoe UI', sans-serif;
`;

const StatusText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0 0 32px 0;
  text-align: center;
`;

const PredictionPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const PredictionTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PredictionInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 16px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #0203f7;
    box-shadow: 0 0 20px rgba(2, 3, 247, 0.3);
  }
`;

const PredictButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(45deg, #0203f7, #4a4aff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(2, 3, 247, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const ProgressDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => {
    if (props.status === 'correct') return '#00ff88';
    if (props.status === 'incorrect') return '#ff4444';
    return 'rgba(255, 255, 255, 0.3)';
  }};
  transition: all 0.3s ease;
`;





const LogsSection = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const LogsTitle = styled.h4`
  color: white;
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 600;
`;

const LogEntry = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LogText = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const LogStatus = styled.span`
  font-weight: 600;
  ${props => props.correct ? `
    color: #00ff88;
  ` : `
    color: #ff4444;
  `}
`;

const ServerTimeDisplay = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: center;
`;



const ProgressCircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #00ff88 0deg,
    #00ff88 ${props => props.progress * 3.6}deg,
    rgba(255, 255, 255, 0.1) ${props => props.progress * 3.6}deg,
    rgba(255, 255, 255, 0.1) 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ProgressContent = styled.div`
  position: relative;
  z-index: 1;
  color: #00ff88;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ProgressLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-align: center;
`;





function LockScreen({ onUnlock }) {
  const [prediction, setPrediction] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionLogs, setPredictionLogs] = useState([]);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  // Timer states for progress circle
  const [timerProgress, setTimerProgress] = useState(0);
  const [previousNumber, setPreviousNumber] = useState(null);
  const [showPreviousNumber, setShowPreviousNumber] = useState(false);
  // Removed sessionId as it's no longer needed for local operation



  // Generate time-based number
  const generateTimeBasedNumber = useCallback(() => {
    const now = new Date();
    const hour = now.getHours() || 24; // Use 24 if hour is 0
    const minute = now.getMinutes() || 60; // Use 60 if minute is 0
    
    // Calculate result using only hour and minute
    const product = hour * minute;
    return product % 100;
  }, []);
  



  
  // Calculate current number using local time
  const calculateCurrentNumber = useCallback(() => {
    const now = new Date();
    const hour = now.getHours() || 24; // Use 24 if hour is 0
    const minute = now.getMinutes() || 60; // Use 60 if minute is 0
    
    // Calculate result using only hour and minute
    const product = hour * minute;
    return product % 100;
  }, []);
  
  // Timer effect for progress circle and number updates
  useEffect(() => {
    let lastMinute = -1;
    let currentNum = calculateCurrentNumber();
    
    const interval = setInterval(() => {
      const now = new Date();
      const currentMinute = now.getMinutes();
      const seconds = now.getSeconds();
      
      // Calculate progress based on seconds (0-59 seconds = 0-100%)
      const progress = (seconds / 60) * 100;
      setTimerProgress(progress);
      
      // When minute changes, update the previous number
      if (lastMinute !== -1 && currentMinute !== lastMinute) {
        setPreviousNumber(currentNum);
        setShowPreviousNumber(true);
        currentNum = calculateCurrentNumber(); // Get new current number
      }
      
      // Hide previous number when new minute starts (at 0 seconds)
      if (seconds === 0 && showPreviousNumber) {
        setShowPreviousNumber(false);
      }
      
      lastMinute = currentMinute;
    }, 100); // Update every 100ms for smooth progress
    
    return () => clearInterval(interval);
  }, [calculateCurrentNumber, showPreviousNumber]);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldownActive && cooldownTimeLeft > 0) {
      const timer = setTimeout(() => {
        setCooldownTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (cooldownTimeLeft === 0 && cooldownActive) {
      setCooldownActive(false);
    }
  }, [cooldownActive, cooldownTimeLeft]);



  const submitPrediction = () => {
    if (cooldownActive) {
      alert(`Veuillez attendre ${cooldownTimeLeft} secondes avant de faire une autre prédiction`);
      return;
    }

    if (!prediction || isNaN(prediction) || prediction < 0 || prediction > 99) {
      alert('Veuillez entrer un nombre valide entre 0 et 99');
      return;
    }

    setIsLoading(true);
    
    // Calculate actual number using local time
    const actualNumber = generateTimeBasedNumber();
    const predictedNumber = parseInt(prediction);
    const isCorrect = predictedNumber === actualNumber;
    
    const newPrediction = {
      predicted: predictedNumber,
      actual: actualNumber,
      correct: isCorrect,
      timestamp: new Date()
    };

    // Add to logs
    setPredictionLogs(prev => [newPrediction, ...prev]);

    setPredictions(prev => [newPrediction, ...prev.slice(0, 2)]);
    
    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      
      // Check if we have 3 consecutive correct predictions
      const recentPredictions = [newPrediction, ...predictions.slice(0, 2)];
      const consecutiveCorrect = recentPredictions.every(p => p.correct) && recentPredictions.length === 3;
      
      if (consecutiveCorrect || newCorrectCount === 3) {
        setTimeout(() => {
          onUnlock();
        }, 1000);
        return;
      }
    } else {
      setCorrectCount(0); // Reset consecutive count on wrong prediction
      setPredictions([]); // Clear history on wrong prediction
    }
    
    // Start 1-minute cooldown
    setCooldownActive(true);
    setCooldownTimeLeft(60);
    
    setPrediction('');
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitPrediction();
    }
  };

  return (
    <LockScreenContainer>
      <UserAvatar>
        <FiUser size={48} color="white" />
      </UserAvatar>
      
      <UserName>Accès BASE DE DONNÉES ADN</UserName>
      <StatusText>Entrez 3 prédictions consécutives correctes pour déverrouiller</StatusText>
      
      <PredictionPanel>
        <PredictionTitle>
          <FiLock size={20} />
          Verrou de Sécurité
        </PredictionTitle>
        
        <ServerTimeDisplay>
          <ProgressCircleContainer>
            <ProgressCircle progress={timerProgress}>
              <ProgressContent>
              {previousNumber !== null ? previousNumber : 0}
            </ProgressContent>
          </ProgressCircle>
          <ProgressLabel>
            Ancien Numéro Généré
          </ProgressLabel>
          </ProgressCircleContainer>
        </ServerTimeDisplay>
        
        <ProgressContainer>
          {[0, 1, 2].map(index => (
            <ProgressDot 
              key={index}
              status={
                index < predictions.length 
                  ? (predictions[predictions.length - 1 - index]?.correct ? 'correct' : 'incorrect')
                  : 'pending'
              }
            />
          ))}
        </ProgressContainer>
        
        <PredictionInput
          type="number"
          min="0"
          max="99"
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          placeholder={cooldownActive ? `Attendez ${cooldownTimeLeft}s` : "Entrez votre prédiction (0-99)"}
          onKeyPress={handleKeyPress}
          disabled={isLoading || cooldownActive}
        />
        
        <PredictButton onClick={submitPrediction} disabled={isLoading || cooldownActive}>
          {isLoading ? (
            <>
              <div className="spinner" />
              Traitement...
            </>
          ) : cooldownActive ? (
            <>
              <FiActivity />
              Attendre {cooldownTimeLeft}s
            </>
          ) : (
            <>
              <FiActivity />
              Prédire
            </>
          )}
        </PredictButton>
        
        <LogsSection>
          <LogsTitle>Historique de Prédictions</LogsTitle>
          {predictionLogs.length === 0 ? (
            <LogText>Aucune prédiction pour le moment...</LogText>
          ) : (
            predictionLogs.map((log, index) => (
              <LogEntry key={index}>
                <LogText>Prédiction: {log.predicted} | Généré: {log.actual}</LogText>
                <LogStatus correct={log.correct}>
                  {log.correct ? 'CORRECT' : 'FAUX'}
                </LogStatus>
              </LogEntry>
            ))
          )}
        </LogsSection>
      </PredictionPanel>
      
      <Taskbar />
    </LockScreenContainer>
  );
}

export default LockScreen;