import React from 'react'
import { PaperProvider } from 'react-native-paper'
import Router from './screens/Router';

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}


