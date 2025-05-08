import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false, // ẩn header
      animation: 'slide_from_right', // kiểu chuyển cảnh
    }}
  />;
}
