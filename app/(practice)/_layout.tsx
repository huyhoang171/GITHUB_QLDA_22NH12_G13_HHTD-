import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PracticeLayout() {
  const router = useRouter();
  const currentPath = usePathname();

  // Hàm xác định trang cha dựa trên đường dẫn hiện tại
  const getParentRoute = (path: string): string => {
    if (path.includes('TopicDetail') || path.includes('BasicGrammarScreen')) {
      return '/grammar';
    }
    if (path === '/vocabulary' || path === '/grammar' || path === '/quizzes') {
      return '/';
    }
    const pathSegments = path.split('/').filter(segment => segment !== '');
    if (pathSegments.length > 1) {
      return '/' + pathSegments.slice(0, -1).join('/');
    }
    return '/';
  };

  // Hàm xử lý quay lại trang cha
  const goBack = () => {
    if (currentPath === '/' || currentPath === '/index') {
      return false;
    }
    const parentRoute = getParentRoute(currentPath);
    router.replace(parentRoute as any);
    return true;
  };

  // Xử lý nút back vật lý
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => backHandler.remove();
  }, [currentPath]);

  return (
    <Tabs
    screenOptions={({ route }) => ({
      headerShown: route.name !== 'index',
      tabBarActiveTintColor: '#000000',
      tabBarInactiveTintColor: '#777777',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
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
          headerTitle: '',
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
        name="ai"
        options={{
          title: 'AI',
          headerTitle: 'AI',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BasicGrammarScreen"
        options={{
          headerTitle: '',
          tabBarStyle: { display: 'none' }, 
          tabBarShowLabel: false,
          tabBarIcon: () => null,
          href: null,
        }}
      />
      <Tabs.Screen
        name="TopicDetail"
        options={{
          headerTitle: '',
          tabBarStyle: { display: 'none' }, 
          tabBarShowLabel: false,
          tabBarIcon: () => null,
          href: null,
        }}
      />
      <Tabs.Screen
        name="speakingDetail"
        options={{
          headerTitle: '',
          tabBarStyle: { display: 'none' }, 
          tabBarShowLabel: false,
          tabBarIcon: () => null,
          href: null,
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          headerTitle: '',
          tabBarStyle: { display: 'none' }, 
          tabBarShowLabel: false,
          tabBarIcon: () => null,
          href: null,
        }}
      />
    </Tabs>
  );
}