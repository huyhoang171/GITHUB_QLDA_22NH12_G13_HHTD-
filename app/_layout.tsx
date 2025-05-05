import { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login'); 
  }, [router]);

  return <Stack />;
}

