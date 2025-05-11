import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { checkLogin } from '../../services/api.service';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const router = useRouter();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const formContainerRef = useRef(null);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    // Animation on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        console.log('Keyboard shown');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        console.log('Keyboard hidden');
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [fadeAnim, slideAnim, navigation]);

  const scrollToInput = (ref: React.RefObject<TextInput>) => {
    setTimeout(() => {
      ref.current?.measure((fx, fy, width, height, px, py) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: py - 80,
            animated: true,
          });
        }
      });
    }, 300); // đợi bàn phím hiện ra
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      const response = await checkLogin(email, password);
      if (response.success) {
        if (response.role === 'Admin') {
          router.push('/admin-dashboard');
        } else if (response.role === 'User') {
          router.push('/(practice)');
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

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#f0f7ff', '#eefbf5', '#f7f8fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      {/* Decorative elements */}
      <View style={styles.decorContainer}>
        <View style={[styles.decorBlob, styles.decorBlob1]} />
        <View style={[styles.decorBlob, styles.decorBlob2]} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Sử dụng padding cho cả hai
        style={styles.keyboardAvoidView}
        enabled
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            <View ref={formContainerRef} style={{ flex: 1 }}>
              {/* Nội dung ScrollView */}
            </View>
            {/* Header with logo and welcome text */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#3ce6a4', '#20b584']}
                  style={styles.logoBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image
                    source={require('../../assets/images/ezylearn_logo.jpg')}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                </LinearGradient>
              </View>
              <Text style={styles.welcomeText}>Chào mừng trở lại</Text>
              <Text style={styles.appTitle}>Đăng nhập vào Ezylearn</Text>
            </Animated.View>

            {/* Form container */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Email input */}
              <View
                style={[
                  styles.inputContainer,
                  emailFocused && styles.inputContainerFocused,
                ]}
                onStartShouldSetResponder={() => true} // Ngăn sự kiện chạm lan tỏa
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={emailFocused ? '#20b584' : '#666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => {
                    setEmailFocused(true);
                    console.log('Email input focused');
                    scrollToInput(emailInputRef);
                  }}
                  onBlur={() => {
                    setEmailFocused(false);
                    console.log('Email input blurred');
                  }}
                />
              </View>

              {/* Password input */}
              <View
                style={[
                  styles.inputContainer,
                  passwordFocused && styles.inputContainerFocused,
                ]}
                onStartShouldSetResponder={() => true} // Ngăn sự kiện chạm lan tỏa
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordFocused ? '#20b584' : '#666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => {
                    setPasswordFocused(true);
                    console.log('Password input focused');
                    scrollToInput(passwordInputRef);
                  }}
                  onBlur={() => {
                    setPasswordFocused(false);
                    console.log('Password input blurred');
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot password link */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>

              {/* Login button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#20b584', '#18a070']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Register button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.7}
              >
                <Text style={styles.registerButtonText}>Tạo tài khoản mới</Text>
              </TouchableOpacity>

              {/* Social login */}
              <View style={styles.socialLoginContainer}>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>Hoặc đăng nhập với</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsRow}>
                  <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="google" size={20} color="#DB4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="facebook" size={20} color="#4267B2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="apple" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Footer với policy text */}
      {!isKeyboardVisible && (
        <BlurView intensity={20} tint="light" style={styles.footerContainer}>
          <Text style={styles.policyText}>
            Bằng cách đăng nhập, bạn đồng ý với{' '}
            <Text style={styles.policyLink}>Điều khoản dịch vụ</Text> và{' '}
            <Text style={styles.policyLink}>Chính sách bảo mật</Text> của chúng tôi
          </Text>
        </BlurView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  decorContainer: {
    position: 'absolute',
    width: width,
    height: height,
  },
  decorBlob: {
    position: 'absolute',
    borderRadius: 100,
  },
  decorBlob1: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: 'rgba(60, 230, 164, 0.08)',
    top: -width * 0.2,
    right: -width * 0.3,
    transform: [{ rotate: '35deg' }],
  },
  decorBlob2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: 'rgba(93, 213, 227, 0.07)',
    bottom: height * 0.3,
    left: -width * 0.2,
    transform: [{ rotate: '-15deg' }],
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#20b584',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 18,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 6,
  },
  appTitle: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#1a1c1e',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 53,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: '#20b584',
    borderWidth: 1.5,
    shadowColor: '#20b584',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#20b584',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  loginButton: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#20b584',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  registerButton: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingVertical: 13,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  registerButtonText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  footerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  policyText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  policyLink: {
    color: '#20b584',
    fontFamily: 'Poppins_500Medium',
  },
});

export default LoginScreen;