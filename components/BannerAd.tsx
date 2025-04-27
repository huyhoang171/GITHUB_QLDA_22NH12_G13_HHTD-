// components/BannerAd.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BannerAdProps {
  isPremium: boolean;
}

const BannerAd: React.FC<BannerAdProps> = ({ isPremium }) => {
  if (isPremium) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Advertisement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  text: {
    color: '#999',
  },
});

export default BannerAd;