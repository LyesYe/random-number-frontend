import React, { useState } from 'react';
import styled from 'styled-components';
import { FiFile, FiDownload, FiX, FiFolder } from 'react-icons/fi';
import Taskbar from './Taskbar';

const DesktopContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0203f7 100%);
  position: relative;
  padding: 20px;
  padding-bottom: 68px; /* Account for taskbar */
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIG9wYWNpdHk9IjAuMDUiPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNDAiIHI9IjMwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIyNjAiIGN5PSIxNDAiIHI9IjMwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIyMDAiIHI9IjM1IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjM1IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjI4MCIgcj0iMjUiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjMwMCIgcj0iMjgiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjMwMCIgcj0iMjgiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjI4MCIgcj0iMjUiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMDAgMTQwQzE4MCAyMDAgMTYwIDI0MCAyMDAgMjgwQzI0MCAyNDAgMjIwIDIwMCAyMDAgMTQwWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4K');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    pointer-events: none;
    z-index: 0;
  }
`;

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  gap: 30px;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const FileIcon = styled.div`
  width: 140px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  padding: 16px 12px;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

const IconImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 
    0 12px 40px rgba(102, 126, 234, 0.4),
    0 6px 20px rgba(118, 75, 162, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  svg {
    width: 36px;
    height: 36px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
    border-radius: 20px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 18px;
    z-index: -1;
  }
`;

const FileName = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  text-align: center;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  line-height: 1.3;
  word-break: break-word;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 120px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  color: white;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const FileInfo = styled.div`
  margin-bottom: 24px;
  line-height: 1.6;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  strong {
    color: #0203f7;
  }
`;

const DownloadButton = styled.button`
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(2, 3, 247, 0.4);
  }
`;

const WelcomeMessage = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 255, 136, 0.9);
  color: black;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
  animation: slideIn 0.5s ease-out;
  z-index: 10;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;



function Desktop() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const files = [
    {
      id: 1,
      name: 'firebase-config.json',
      type: 'json',
      size: '1.8 KB',
      description: 'Configuration file for cloud services',
      icon: <FiFile size={24} color="white" />
    }
  ];

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleDownload = (file) => {
    // Redirect to external hosting instead of serving file directly
    // You can host the Firebase JSON file on:
    // 1. GitHub Gist (recommended)
    // 2. Pastebin with raw link
    // 3. Any file hosting service
    // 4. Your own server
    
    // GitHub Gist with actual Firebase JSON file
    const downloadUrl = 'https://gist.githubusercontent.com/LyesYe/833d5ce8d552069d91c702b6d4031cba/raw/117f9b095fefd83b5b6fdf3d5abc3f9cb96208ee/dnaserver-57c91-firebase-adminsdk-fbsvc-b21299f284.json';
    
    // Alternative: Use a simple file hosting service
    // const downloadUrl = 'https://filebin.net/your-file-id/firebase-admin-sdk.json';
    
    window.open(downloadUrl, '_blank');
    setSelectedFile(null);
  };



  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DesktopContainer>
      {showWelcome && (
        <WelcomeMessage>
          🎉 Access Granted! Welcome to the Lab System
        </WelcomeMessage>
      )}
      

      
      <DesktopGrid>
        {files.map(file => (
          <FileIcon key={file.id} onClick={() => handleFileClick(file)}>
            <IconImage>
              {file.icon}
            </IconImage>
            <FileName>{file.name}</FileName>
          </FileIcon>
        ))}
      </DesktopGrid>
      
      {selectedFile && (
        <Modal onClick={() => setSelectedFile(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {selectedFile.icon}
                {selectedFile.name}
              </ModalTitle>
              <CloseButton onClick={() => setSelectedFile(null)}>
                <FiX size={20} />
              </CloseButton>
            </ModalHeader>
            
            <FileInfo>
              <InfoRow>
                <span>File Type:</span>
                <strong>{selectedFile.type.toUpperCase()}</strong>
              </InfoRow>
              <InfoRow>
                <span>File Size:</span>
                <strong>{selectedFile.size}</strong>
              </InfoRow>
              <InfoRow>
                <span>Description:</span>
                <strong>{selectedFile.description}</strong>
              </InfoRow>
              <InfoRow>
                <span>Source:</span>
                <strong>External Hosting</strong>
              </InfoRow>
            </FileInfo>
            
            <DownloadButton onClick={() => handleDownload(selectedFile)}>
              <FiDownload size={20} />
              Download File
            </DownloadButton>
          </ModalContent>
        </Modal>
      )}
      
      <Taskbar />
    </DesktopContainer>
  );
}

export default Desktop;