# Random Number Frontend

React frontend for the Random Number Prediction Game.

## Features

- Windows-style lock screen interface
- Real-time number prediction game
- Session management
- Responsive design
- Modern UI with styled-components

## Environment Variables

The app uses the following environment variable:

- `REACT_APP_API_URL` - Backend API URL

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to Vercel

### Method 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `REACT_APP_API_URL` with your backend URL

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com`
   - **Environment**: Production (and Preview if needed)

4. Deploy!

## Build

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Game Rules

1. Predict the current time-based random number (0-99)
2. Get 3 consecutive correct predictions to unlock
3. Wrong predictions reset your progress
4. Numbers change based on current time

## Dependencies

- **react**: UI library
- **styled-components**: CSS-in-JS styling
- **axios**: HTTP client
- **react-icons**: Icon library
- **react-scripts**: Build tools and configuration