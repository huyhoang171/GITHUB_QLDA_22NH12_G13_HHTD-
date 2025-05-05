import {StyleSheet, Platform} from 'react-native';
export const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Headers & Titles
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#212529',
    padding: 20,
    paddingBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Topic Grid & Cards
  topicsGrid: {
    padding: 12,
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
    // Semi-transparent gradient background for info section
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    // Subtle inner shadow
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  topicTitleVN: {
    fontSize: 14,
    color: '#6c757d',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Header & Navigation
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

  // Word Cards
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  word: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.4,
  },
  wordVN: {
    fontSize: 24,
    fontWeight: '600',
    color: '#198754',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Pronunciation
  pronunciationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 8,
  },
  pronunciation: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
  },
  pronunciationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  phoneticText: {
    fontSize: 18,
    color: '#343a40',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Sound Buttons
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

  // Definition & Examples
  meaning: {
    fontSize: 18,
    color: '#343a40',
    marginBottom: 18,
    lineHeight: 26,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.2,
  },
  example: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 24,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: 'black',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  translatedText: {
    fontSize: 18,
    color: '#343a40',
    marginBottom: 16,
    lineHeight: 26,
    backgroundColor: 'rgba(25, 135, 84, 0.05)',
    padding: 12,
    borderRadius: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Buttons
  showAnswerButton: {
    backgroundColor: '#0d6efd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: 'rgba(13, 110, 253, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  showAnswerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
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

  // Translation/Action Buttons
  translateButton: {
    backgroundColor: '#0d6efd',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: 'rgba(13, 110, 253, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(220, 53, 69, 0.05)',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: 15,
  },
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
  }
});