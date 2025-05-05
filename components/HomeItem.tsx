// components/HomeItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import CategoryData from '../app/(practice)/grammar';

// Define the type for CategoryData
interface CategoryData {
  title: string;
  description: string;
  progress: number;
  total: number;
}

interface HomeItemProps {
  category: CategoryData;
  onPress: () => void;
}

const HomeItem: React.FC<HomeItemProps> = ({ category, onPress }) => {
  const progressPercentage = category.total > 0 
    ? Math.round((category.progress / category.total) * 100) 
    : 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description}>{category.description}</Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressPercentage} />
          <Text style={styles.progressText}>
            {category.progress}/{category.total} ({progressPercentage}%)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#888',
  },
});

export default HomeItem;