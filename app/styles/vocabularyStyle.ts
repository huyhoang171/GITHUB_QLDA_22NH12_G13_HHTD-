import {StyleSheet, Platform, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

// Palette màu theo yêu cầu
const COLORS = {
  primary: '#00C5CD',      // Màu chính đậm hơn để nút, border, icon
  primaryLight: 'rgba(1, 132, 146, 0.15)', // Màu chính nhạt hơn cho background
  primaryUltraLight: 'rgba(4, 74, 82, 0.07)', // Màu chính rất nhạt cho background
  secondary: '#20B2AA',    // Màu phụ cho các nút thứ cấp
  text: '#2D3748',         // Màu chữ chính
  textLight: '#718096',    // Màu chữ nhạt
  background: '#FFFFFF',   // Màu nền chính
  backgroundLight: '#F7FAFC', // Màu nền nhạt
  error: '#FF6B6B',        // Màu lỗi
  white: '#FFFFFF',         // Màu trắng
  red: '#FF0000',         // Màu đỏ
  blue: '#0000FF',         // Màu xanh dương
};
export const styles = StyleSheet.create({
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
    height: '100%',
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
    bottom: '30%',
    left: -width * 0.2,
    transform: [{ rotate: '-15deg' }],
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
  topicsGrid: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 18,
    marginHorizontal: 12,
    overflow: 'hidden',
    // Add colorful border
    borderWidth: 2,
    borderColor: '#0288D1',
    // Enhanced shadow for depth
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 8,
    // Subtle scale effect on press
    transform: [{ scale: 1 }],
  },
  topicImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    // Add subtle overlay to blend white background
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  topicInfo: {
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topicTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1a1c1e',
    marginBottom: 4,
  },
  topicTitleVN: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  backButton: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#0d6efd',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Subtopics
  subtopicsContainer: {
    padding: 16,
    height: 200
  },
  subtopicCard: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    // Improved shadows
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    height: 110,
    justifyContent: 'center',
  },
  subtopicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtopicTitleVN: {
    fontSize: 15,
    color: '#495057',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  containerVocabularyCard: {
    padding: 16,
    alignItems: 'center',
    minHeight: '100%',
  },
  card: {
    width: width - 32,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  wordHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  word: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  wordVN: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  pronunciationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  pronunciationCard: {
    flex: 1,
    backgroundColor: COLORS.primaryUltraLight,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 6,
  },
  pronunciationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pronunciationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  phoneticText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    marginTop: 10,
  },
  definitionBox: {
    backgroundColor: COLORS.primaryUltraLight,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  meaning: {
    fontSize: 17,
    lineHeight: 24,
    color: COLORS.text,
    fontWeight: '500',
  },
  translatedBox: {
    backgroundColor: COLORS.primaryUltraLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  translatedText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    fontStyle: 'italic',
  },
  examplesContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft: 8,
  },
  quoteIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  example: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  showAnswerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  showAnswerText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  buttonIcon: {
    marginRight: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16, 
  },
  translateButton: {
    backgroundColor: COLORS.primary,
  },
  examplesButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.textLight,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    marginBottom: 12,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  prevButton: {
    paddingLeft: 16,
  },
  nextButton: {
    paddingRight: 16,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginHorizontal: 8,
  },
  allButton: {
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allButtonText: {
    color: COLORS.white,
  },
  playButtonUK: {
    backgroundColor: '#198754',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  playButtonUS: {
    backgroundColor: '#dc3545',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  button: {
    backgroundColor: '#f1f3f5',
    padding: 16,
    borderRadius: 12,
    width: '47%',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#343a40',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  translateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  showExamplesButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: 'rgba(108, 117, 125, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  showExamplesButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  retryButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowColor: 'rgba(220, 53, 69, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Loading & Error States
  // loadingContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 16,
  // },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  icon: {
    fontSize: 24,
    color: '#495057',
  },

  // Search styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 8,
    fontFamily: 'Poppins_400Regular',
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchResultsContainer: {
    maxHeight: 200,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  searchResultsScrollView: {
    maxHeight: 200,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryUltraLight,
  },
  searchResultText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: 'Poppins_400Regular',
  },
  noResultsText: {
    padding: 16,
    textAlign: 'center',
    color: COLORS.textLight,
    fontFamily: 'Poppins_400Regular',
  },
});