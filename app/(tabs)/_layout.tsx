import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { BackHandler, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  // Định nghĩa hàm goBack để xử lý cả nút back trên header
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return true;
    }
    return false;
  };

  // Xử lý nút back vật lý
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => backHandler.remove();
  }, []);
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Thay đổi thành true để hiển thị header và nút back
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#777777',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={goBack} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false, // Trang chính không cần nút back
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: 'Vocabulary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grammar"
        options={{
          title: 'Grammar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quizzes"
        options={{
          title: 'Quizzes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}