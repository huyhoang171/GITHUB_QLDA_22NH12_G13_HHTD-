import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { checkLogin } from '../../services/api.service';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await checkLogin(email, password);
      if (response.success) {
        if (response.role === 'Admin') {
          router.push('/admin-dashboard');
        } else if (response.role === 'User') {
          router.push('/(tabs)/index' as any);
        }
      } else {
        alert('Đăng nhập không thành công. Vui lòng thử lại.');
      }
    } catch (error) {
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Chào mừng bạn đến với</Text>
        <Text style={styles.appTitle}>App học tiếng Anh Ezylearn!</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Đăng ký tài khoản mới</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>Đăng nhập bằng Google / Facebook</Text>
          <View style={styles.socialButtonsRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/png/Google__G__logo.svg.png')} // Replace with your Google icon path
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png' }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#00A86B', // Brighter green
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  registerButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  socialLoginContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  orText: {
    color: '#777',
    marginBottom: 16,
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;