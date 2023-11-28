import React from 'react';
import Router from './screens/Router';
import { PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}

