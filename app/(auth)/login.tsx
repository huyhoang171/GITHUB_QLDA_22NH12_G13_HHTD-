import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { checkLogin } from '../../services/api.service';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await checkLogin(username, password);
      if (response.success) {
        if (response.role === 'Admin') {
          router.push('/admin-dashboard'); 
        } else if (response.role === 'User') {
          router.push('/(tabs)/index' as any);
        }
      } else {
        Alert.alert('Login Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với App học tiếng Anh!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/forgot-password')}>
        <Text style={styles.linkText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkButton: {
    marginVertical: 8,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;