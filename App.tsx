import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CardProvider} from './src/contexts/card';
import {Home} from './src/screens/Home';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#F2F2F4" />
      <CardProvider>
        <Home />
      </CardProvider>
    </GestureHandlerRootView>
  );
};

export default App;
