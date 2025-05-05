import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CategoryData } from '../types/navigation';

const CATEGORIES: CategoryData[] = [
  {
    id: 1,
    title: 'Tenses',
    description: '13 tenses in English',
    progress: 0,
    total: 13,
    image: require('../../assets/png/png_topics/communication.png'),
    lessons: [
      { id: 1, title: 'Simple Present', subTitle: 'S + to be/V + O', path: 'present__simple__present__tense' , image: require('../../assets/images/Tenses/Simple_Present.jpeg') },
      { id: 2, title: 'Present Continuous', subTitle: 'S + to be + V-ing + O', path: 'present__present__continuous__tense' , image: require('../../assets/images/Tenses/Present_Continuous.jpeg') },
      { id: 3, title: 'Present Perfect', subTitle: 'S + have/has + V3 + O', path: 'present__present__perfect__tense' , image: require('../../assets/images/Tenses/Present_Perfect.jpeg') },
      { id: 4, title: 'Present Perfect Continuous', subTitle: 'S + have/has + been + V-ing + O', path: 'present__present__perfect__continuous__tense' , image: require('../../assets/images/Tenses/Present_Perfect_Continuous.jpeg') },
      { id: 5, title: 'Simple Past', subTitle: 'S + V2 + O', path: 'past__simple__past__tense' , image: require('../../assets/images/Tenses/Simple_Past.jpeg') },
      { id: 6, title: 'Past Continuous', subTitle: 'S + was/were + V-ing + O', path: 'past__past__continuous__tense' , image: require('../../assets/images/Tenses/Past_Continuous.jpeg') },
      { id: 7, title: 'Past Perfect', subTitle: 'S + had + V3 + O', path: 'past__past__perfect__tense' , image: require('../../assets/images/Tenses/Past_Perfect.jpeg') },
      { id: 8, title: 'Past Perfect Continuous', subTitle: 'S + had + been + V-ing + O', path: 'past__past__perfect__continuous__tense' , image: require('../../assets/images/Tenses/Past_Perfect_Continuous.jpeg') },
      { id: 9, title: 'Simple Future', subTitle: 'S + will + V + O', path: 'future__future__simple__tense' , image: require('../../assets/images/Tenses/Simple_Future.jpeg') },
      { id: 10, title: 'Future Continuous', subTitle: 'S + will + be + V-ing + O', path: 'future__future__continuous__tense' , image: require('../../assets/images/Tenses/Future_Continuous.jpeg') },
      { id: 11, title: 'Future Perfect', subTitle: 'S + will + have + V3 + O', path: 'future__future__perfect__tense', image: require('../../assets/images/Tenses/Future_Perfect.jpeg') },
      { id: 12, title: 'Future Perfect Continuous', subTitle: 'S + will + have + been + V-ing + O', path: 'future__future__perfect__continuous__tense' , image: require('../../assets/images/Tenses/Future_Perfect_Continuous.jpeg') },
      { id: 13, title: 'Near Future', subTitle: 'S + to be + going to + V + O', path: 'future__near__future' , image: require('../../assets/images/Tenses/Near_Future.png') },
    ]
  },
  {
    id: 2,
    title: 'Sentences',
    description: 'Sentences in English',
    image: require('../../assets/images/Sentences/Sentences.png'),
    progress: 0,
    total: 8,
    lessons: [
      { id: 14, title: 'Passive Voice', subTitle: 'Emphasize the action rather than the doer', path: 'sentences__passive__voice' , image: require('../../assets/images/Sentences/Passive Voice.png') },
      { id: 15, title: 'Reported Speech', subTitle: 'Report what someone else said', path: 'sentences__reported__speech' , image: require('../../assets/images/Sentences/Reported Speech.png') },
      { id: 16, title: 'Conditional Sentences', subTitle: '4 types of conditional sentences', path: 'sentences__conditional__sentences' , image: require('../../assets/images/Sentences/Conditional Sentences.png') },
      { id: 17, title: 'Wish Sentences', subTitle: 'Express regret or desire', path: 'sentences__wish__sentences' , image: require('../../assets/images/Sentences/Wish Sentences.png') },
      { id: 18, title: 'Question Tags', subTitle: 'Short questions at the end of a sentence', path: 'sentences__question__tags' , image: require('../../assets/images/Sentences/Question Tags.png') },
      { id: 19, title: 'Imperative Sentences', subTitle: 'Give orders or instructions', path: 'sentences__imperative__sentences' , image: require('../../assets/images/Sentences/Imperative Sentences.png') },
      { id: 20, title: 'Comparison Sentences', subTitle: 'Compare two or more things', path: 'sentences__comparison__sentences' , image: require('../../assets/images/Sentences/Exclamatory Sentences.png') },
      { id: 21, title: 'Exclamatory Sentences', subTitle: 'Express strong feelings', path: 'sentences__exclamatory__sentences' , image: require('../../assets/images/Sentences/Exclamatory Sentences.png') },
    ]
  },
  {
    id: 3,
    title: 'Words',
    description: 'Words in English',
    image: require('../../assets/png/png_topics/communication.png'),
    progress: 0,
    total: 9,
    lessons: [
      { id: 22, title: 'Nouns', subTitle: 'Person, place, thing, or idea', path: 'word__families__nouns' },
      { id: 23, title: 'Pronouns', subTitle: 'Replace nouns', path: 'words__pronouns' },
      { id: 24, title: 'Adjectives', subTitle: 'Describe nouns', path: 'word__families__adjectives' },
      { id: 25, title: 'Adverbs', subTitle: 'Describe verbs, adjectives, or other adverbs', path: 'word__families__adverbs' },
      { id: 26, title: 'Prepositions', subTitle: 'Show the relationship between a noun and another word', path: 'words__preposition' },
      { id: 27, title: 'Conjunctions', subTitle: 'Connect words, phrases, or clauses', path: 'words__conjunction' },
      { id: 28, title: 'Interjections', subTitle: 'Express strong feelings or emotions', path: 'words__interjection' },
      { id: 29, title: 'Articles', subTitle: 'A, an, the', path: 'words__article' },
      { id: 32, title: 'Modals Verbs', subTitle: 'Can, could, may, might, must, shall, should, will, would', path: 'words__modal__verbs' },
    ]
  },
  {
    id: 4,
    title: 'Others',
    description: 'Other grammar topics',
    progress: 0,
    image: require('../../assets/png/png_topics/communication.png'),
    total: 5,
    lessons: [
      { id: 33, title: 'Word Families', subTitle: 'Words that are related to each other', path: 'word__families__word__families' },
      { id: 34, title: 'Phrasal Verbs', subTitle: 'Verb + preposition or adverb', path: 'grammar__phrasal__verbs' },
      { id: 35, title: 'Idioms', subTitle: 'Expressions that have a meaning different from the meaning of the individual words', path: 'grammar__idioms' },
      { id: 36, title: 'Proverbs', subTitle: 'Short sayings that give advice or express a belief', path: 'grammar__proverbs' },
      { id: 37, title: 'Quantifiers', subTitle: 'Words that describe quantity', path: 'grammar__quantifiers' },
    ]
  }
  // ... rest of the categories ...
];
// export const options = {
//   headerShown: false, // Tắt header mặc định của navigation
// };
const GrammarScreen = () => {
  const [categories] = useState<CategoryData[]>(CATEGORIES);
  const router = useRouter();

  const navigateToLessons = (category: CategoryData): void => {
    router.push({
      pathname: '/(practice)/BasicGrammarScreen',
      params: { category: JSON.stringify(category) }
    });
    // console.log('Navigating to BasicGrammar with category:', category);
  };

  const renderItem = ({ item }: { item: CategoryData }): React.ReactElement => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigateToLessons(item)}>
      <View style={styles.cardRow}>
        <View style={styles.cardTextContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explore topics →</Text>
          </View>
        </View>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grammar</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => `category-${item.id}`}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default GrammarScreen;