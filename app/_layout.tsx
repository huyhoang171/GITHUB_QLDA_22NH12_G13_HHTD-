import { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to ensure navigation is properly initialized
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaProvider>
      <Stack />
    </SafeAreaProvider>
  );
}

