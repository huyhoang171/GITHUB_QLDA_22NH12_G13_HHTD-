import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PracticeLayout() {
  const router = useRouter();

  // Hàm xử lý quay lại
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
    screenOptions={({ route }) => ({
      headerShown: route.name !== 'index',
      tabBarActiveTintColor: '#000000',
      tabBarInactiveTintColor: '#777777',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        height: 70,
        paddingBottom: 10, // Giảm paddingBottom để căn chỉnh tốt hơn
        paddingTop: 10, // Thêm paddingTop để cân đối
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        justifyContent: 'center', // Căn giữa ngang
        alignItems: 'center', // Căn giữa dọc
      },
      tabBarIconStyle: {
        justifyContent: 'center', // Căn giữa biểu tượng theo chiều dọc
        alignItems: 'center', // Căn giữa biểu tượng theo chiều ngang
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5, // Khoảng cách giữa nhãn và đáy tabBar
        textAlign: 'center', // Căn giữa nhãn
      },
      headerLeft: () =>
        route.name !== 'index' && (
          <TouchableOpacity onPress={goBack} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
        ),
    })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: 'Vocabulary',
          headerTitle: 'Vocabulary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grammar"
        options={{
          title: 'Grammar',
          headerTitle: 'Grammar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quizzes"
        options={{
          title: 'Quizzes',
          headerTitle: 'Quizzes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="reader" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          title: 'Speaking',
          headerTitle: 'Speaking',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BasicGrammarScreen"
        options={{
          href: null, // Không cho phép điều hướng trực tiếp đến màn hình này từ URL
          // tabBarButton: () => null, // Ẩn hoàn toàn khỏi tab bar
        }}
      />
      <Tabs.Screen
        name="TopicDetail"
        options={{
          href: null, // Không cho phép điều hướng trực tiếp đến màn hình này từ URL
          // tabBarButton: () => null, // Ẩn hoàn toàn khỏi tab bar
        }}
      />
      <Tabs.Screen
        name="speakingDetail"
        options={{
          href: null, // Không cho phép điều hướng trực tiếp đến màn hình này từ URL
          // tabBarButton: () => null, // Ẩn hoàn toàn khỏi tab bar
        }}
      />
    </Tabs>
  );
}