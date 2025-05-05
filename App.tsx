import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GrammarScreen from './app/(practice)/grammar';
import BasicGrammarScreen from './app/(practice)/BasicGrammarScreen';
import TopicDetail from './app/(practice)/TopicDetail';
import { RootStackParamList } from './app/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Grammar"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Grammar" 
        component={GrammarScreen}
        options={{
          title: 'Grammar',
        }}
      />
      <Stack.Screen 
        name="BasicGrammar" 
        component={BasicGrammarScreen}
        options={{
          // title: 'Basic Grammar',
        }}
      />
      <Stack.Screen 
        name="TopicDetail" 
        component={TopicDetail}
        options={({ route }) => ({ 
          title: route.params.topic.title,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 