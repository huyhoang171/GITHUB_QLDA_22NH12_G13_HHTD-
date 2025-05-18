import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardTextContent: {
    flex: 1,
    paddingRight: 10,
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  exploreButton: {
    backgroundColor: '#C0C0C0',
    borderRadius: 15,
    paddingVertical: 4, // Reduced padding
    paddingHorizontal: 12, // Reduced padding
    alignSelf: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginTop: 8,
  },
  exploreText: {
    fontSize: 12, // Reduced font size
    color: '#000000',
    fontWeight: '600',
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    fontWeight: '500',
  },
});
