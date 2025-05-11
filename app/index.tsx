import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const StartScreen = () => {
  const router = useRouter();
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const handleStart = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Background with modern gradient */}
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
        <View style={[styles.decorBlob, styles.decorBlob3]} />
        <View style={[styles.decorCircle, styles.decorCircle1]} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
        <View style={[styles.decorCircle, styles.decorCircle3]} />
      </View>

      {/* Main content */}
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#3ce6a4', '#20b584']}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image 
                source={require('../assets/images/ezylearn_logo.jpg')} 
                style={styles.logo}
                resizeMode="cover"
              />
            </LinearGradient>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ezylearn</Text>
            <View style={styles.taglineRow}>
              <View style={styles.taglineDot} />
              <Text style={styles.tagline}>Học thông minh</Text>
            </View>
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../assets/images/learning_illustration.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>
            Học tiếng Anh dễ dàng
          </Text>
          <Text style={styles.description}>
            Phương pháp học tương tác, cá nhân hóa giúp bạn tiến bộ nhanh chóng và duy trì động lực
          </Text>
        </View>
      </View>

      {/* Action buttons with glass effect */}
      <BlurView intensity={25} tint="light" style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#20b584', '#18a070']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.startButtonText}>Bắt đầu ngay</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Tìm hiểu thêm</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Đã có tài khoản?</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
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
    backgroundColor: 'rgba(60, 230, 164, 0.1)',
    top: -width * 0.2,
    right: -width * 0.3,
    transform: [{ rotate: '35deg' }],
  },
  decorBlob2: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: 'rgba(93, 213, 227, 0.08)',
    bottom: height * 0.3,
    left: -width * 0.2,
    transform: [{ rotate: '-15deg' }],
  },
  decorBlob3: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: 'rgba(32, 181, 132, 0.06)',
    top: height * 0.4,
    right: -width * 0.1,
    transform: [{ rotate: '25deg' }],
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 100,
  },
  decorCircle1: {
    width: 12,
    height: 12,
    backgroundColor: 'rgba(32, 181, 132, 0.3)',
    top: height * 0.15,
    left: width * 0.15,
  },
  decorCircle2: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(93, 213, 227, 0.2)',
    bottom: height * 0.45,
    right: width * 0.2,
  },
  decorCircle3: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(60, 230, 164, 0.4)',
    top: height * 0.6,
    left: width * 0.4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: (StatusBar.currentHeight ?? 0) + 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginRight: 16,
    elevation: 8,
    shadowColor: '#20b584',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoBackground: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 18,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#1a1c1e',
    letterSpacing: 0.5,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taglineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#20b584',
    marginRight: 6,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#20b584',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    height: height * 0.35,
    overflow: 'hidden',
    borderRadius: 20,
  },
  illustration: {
    width: width * 0.85,
    height: height * 0.35,
    borderRadius: 20,
  },
  infoContainer: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1a1c1e',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#4a4a4a',
    lineHeight: 24,
  },
  footerContainer: {
    overflow: 'hidden',
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 36,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  startButton: {
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#20b584',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  learnMoreButton: {
    paddingVertical: 8,
  },
  learnMoreText: {
    color: '#20b584',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default StartScreen;