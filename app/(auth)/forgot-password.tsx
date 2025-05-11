import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];
  const emailInputRef = useRef(null);
  const router = useRouter();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

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
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
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
    }, 300);
  };

  const handleResetPassword = () => {
    Keyboard.dismiss();
    console.log('Reset password for:', email);
    // Add API call for password reset here
    alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
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
            {/* Header */}
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.title}>Quên mật khẩu</Text>
              <Text style={styles.description}>
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
              </Text>
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
                onStartShouldSetResponder={() => true}
              >
                <Ionicons
                  name="mail-outline"
                  size= {20}
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
                    scrollToInput(emailInputRef);
                  }}
                  onBlur={() => {
                    setEmailFocused(false);
                  }}
                />
              </View>

              {/* Reset button */}
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#20b584', '#18a070']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.resetButtonText}>Gửi liên kết</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Back to login */}
              <TouchableOpacity
                style={styles.backToLoginButton}
                onPress={() => router.push('/login')}
                activeOpacity={0.7}
              >
                <Text style={styles.backToLoginText}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Footer */}
      {!isKeyboardVisible && (
        <BlurView intensity={20} tint="light" style={styles.footerContainer}>
          <Text style={styles.policyText}>
            Cần hỗ trợ? Liên hệ{' '}
            <Text style={styles.policyLink}>hỗ trợ khách hàng</Text> của chúng tôi.
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
    paddingHorizontal: 24,
    marginBottom: 40,
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#1a1c1e',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
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
  resetButton: {
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
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  backToLoginButton: {
    paddingVertical: 13,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backToLoginText: {
    color: '#20b584',
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

export default ForgotPasswordScreen;