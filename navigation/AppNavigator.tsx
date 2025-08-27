import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ConsentScreen from '../screens/ConsentScreen';
import MainScreen from '../screens/MainScreen';
import TestListScreen from '../screens/TestListScreen';
import TestInterfaceScreen from '../screens/TestInterfaceScreen';
import ResultsScreen from '../screens/ResultsScreen';
import HelpScreen from '../screens/HelpScreen';
import SOSScreen from '../screens/SOSScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Consent: undefined;
  Main: undefined;
  TestList: undefined;
  TestInterface: { testId: string; testName: string };
  Results: { testId: string; testName: string; score: number };
  Help: undefined;
  SOS: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerShadowVisible: false,
        cardStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Patient Information' }}
      />
      <Stack.Screen 
        name="Consent" 
        component={ConsentScreen}
        options={{ title: 'Assessment Consent' }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TestList" 
        component={TestListScreen}
        options={{ title: 'Cognitive Tests' }}
      />
      <Stack.Screen 
        name="TestInterface" 
        component={TestInterfaceScreen}
        options={({ route }) => ({ title: route.params.testName })}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ title: 'Test Results' }}
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
      <Stack.Screen 
        name="SOS" 
        component={SOSScreen}
        options={{ title: 'Emergency Help' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 