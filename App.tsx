import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {CardProvider} from './src/contexts/card';
import {HomeScreen} from './src/screens';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#F2F2F4" />
      <CardProvider>
        <HomeScreen />
      </CardProvider>
    </GestureHandlerRootView>
  );
};

export default App;
