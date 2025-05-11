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
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { registerUser } from '../../services/api.service';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  const scrollViewRef = useRef<ScrollView>(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const formContainerRef = useRef(null);

  const router = useRouter();
  const navigation = useNavigation();

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

  // Hàm cuộn đến TextInput đang focus - matching login.tsx implementation
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

  const handleRegister = async () => {
    Keyboard.dismiss();
    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải dài hơn 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      if (response.success) {
        Alert.alert('Thành công', 'Đăng ký thành công!', [
          { text: 'OK', onPress: () => router.push('/login') },
        ]);
      } else {
        Alert.alert('Lỗi', response.message);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng ký tài khoản.');
    }
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Changed to 'padding' for both platforms
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
              <Text style={styles.welcomeText}>Tạo tài khoản mới</Text>
              <Text style={styles.appTitle}>Đăng ký Ezylearn</Text>
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
              {/* Username input */}
              <View
                style={[
                  styles.inputContainer,
                  usernameFocused && styles.inputContainerFocused,
                ]}
                onStartShouldSetResponder={() => true}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={usernameFocused ? '#20b584' : '#666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  ref={usernameInputRef}
                  style={styles.input}
                  placeholder="Tên tài khoản"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => {
                    setUsernameFocused(true);
                    console.log('Username input focused');
                    scrollToInput(usernameInputRef);
                  }}
                  onBlur={() => {
                    setUsernameFocused(false);
                    console.log('Username input blurred');
                  }}
                />
              </View>

              {/* Email input */}
              <View
                style={[
                  styles.inputContainer,
                  emailFocused && styles.inputContainerFocused,
                ]}
                onStartShouldSetResponder={() => true}
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
                onStartShouldSetResponder={() => true}
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

              {/* Confirm Password input */}
              <View
                style={[
                  styles.inputContainer,
                  confirmPasswordFocused && styles.inputContainerFocused,
                ]}
                onStartShouldSetResponder={() => true}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={confirmPasswordFocused ? '#20b584' : '#666'}
                  style={styles.inputIcon}
                />
                <TextInput
                  ref={confirmPasswordInputRef}
                  style={styles.input}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  onFocus={() => {
                    setConfirmPasswordFocused(true);
                    console.log('Confirm Password input focused');
                    scrollToInput(confirmPasswordInputRef);
                  }}
                  onBlur={() => {
                    setConfirmPasswordFocused(false);
                    console.log('Confirm Password input blurred');
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              {/* Register button */}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#20b584', '#18a070']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.registerButtonText}>Đăng ký tài khoản mới</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login link */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push('/login')}
                activeOpacity={0.7}
              >
                <Text style={styles.loginButtonText}>Đã có tài khoản? Đăng nhập</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Footer with policy text */}
      {!isKeyboardVisible && (
        <BlurView intensity={20} tint="light" style={styles.footerContainer}>
          <Text style={styles.policyText}>
            Bằng cách đăng ký, bạn đồng ý với{' '}
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
    marginBottom: 40, // Changed from 30 to 40 to match login.tsx
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
  registerButton: {
    borderRadius: 16,
    marginTop: 8,
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
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  loginButton: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingVertical: 13,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
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

export default RegisterScreen;