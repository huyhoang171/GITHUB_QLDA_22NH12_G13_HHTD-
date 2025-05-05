import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Slot } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

// 👇 THÊM: Redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // đường dẫn đến store Redux của bạn
import { useRouter } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            title: '',
            headerShown: false,
          }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(practice)" options={{
            title: '',
            headerShown: false,
            headerBackVisible: true,
          }} />

        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
