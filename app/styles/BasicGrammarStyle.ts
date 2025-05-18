import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  topicCard: {
    width: '48%',
    height: 170,
    backgroundColor: '#DEE2E6', // đậm hơn một bậc so với #E9ECEF
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  
    // Bóng sắc nét hơn
    elevation: 5, // Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  
  topicIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  topicDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerImage: {
    alignSelf: 'center',
    width: '95%',
    height: 350,
    marginVertical: 15,
    resizeMode: 'cover', 
    borderRadius: 40,
    overflow: 'hidden', 
  },
  completionIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  noLessonsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});