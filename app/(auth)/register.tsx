import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { registerUser } from '../../services/api.service';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleRegister = async () => {
    if (password.length < 6) {
      Alert.alert('Error', 'Mật khẩu phải dài hơn 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      if (response.success) {
        Alert.alert('Success', 'Đăng ký thành công!');
        router.push('/login');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Đã xảy ra lỗi khi đăng ký tài khoản.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đến với App học tiếng Anh!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên tài khoản"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.backToLoginText}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backToLoginText: {
    marginTop: 20,
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;