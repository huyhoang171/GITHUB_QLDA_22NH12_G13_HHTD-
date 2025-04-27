// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

// import GrammarScreen from '../(practice)/grammar';
// import BasicGrammarScreen from '../(practice)/BasicGrammarScreen';
// import TopicDetail from '../(practice)/TopicDetail';

// // Define interfaces
// interface GrammarTopic {
//   id: number;
//   title: string;
//   description: string;
//   icon: any;
// }

// interface Lesson {
//   id: number;
//   title: string;
//   subTitle: string;
//   path: string;
// }

// interface CategoryData {
//   id: number;
//   title: string;
//   description: string;
//   progress: number;
//   total: number;
//   image: any;
//   lessons: Lesson[];
// }

// export type RootStackParamList = {
//   Grammar: undefined;
//   BasicGrammar: { category: CategoryData };
//   TopicDetail: { topic: GrammarTopic };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Grammar"
//         screenOptions={{
//           headerShown: false,
//           headerStyle: {
//             backgroundColor: '#FFFFFF',
//           },
//           headerTintColor: '#000000',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       >
//         <Stack.Screen
//           name="Grammar"
//           component={GrammarScreen}
//           options={{
//             title: 'Grammar',
//           }}
//         />
//         <Stack.Screen
//           name="BasicGrammar"
//           component={BasicGrammarScreen}
//           options={{
//             title: 'Basic Grammar',
//           }}
//         />
//         <Stack.Screen
//           name="TopicDetail"
//           component={TopicDetail}
//           options={({ route }) => ({
//             title: route.params.topic.title,
//           })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator; 