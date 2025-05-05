import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { Asset } from 'expo-asset';
import { Lesson } from '../types/navigation';

// Create a static mapping of all possible paths to their respective module
// This prevents using dynamic requires which Metro bundler doesn't support
const markdownMapping = {
  // Present tense
  present__simple__present__tense: require('../../assets/md/grammar/tenses/present/simple__present__tense.md'),
  present__present__continuous__tense: require('../../assets/md/grammar/tenses/present/present__continuous__tense.md'),
  present__present__perfect__tense: require('../../assets/md/grammar/tenses/present/present__perfect__tense.md'),
  present__present__perfect__continuous__tense: require('../../assets/md/grammar/tenses/present/present__perfect__continuous__tense.md'),
  
  // Past tense
  past__simple__past__tense: require('../../assets/md/grammar/tenses/past/simple__past__tense.md'),
  past__past__continuous__tense: require('../../assets/md/grammar/tenses/past/past__continuous__tense.md'),
  past__past__perfect__tense: require('../../assets/md/grammar/tenses/past/past__perfect__tense.md'),
  past__past__perfect__continuous__tense: require('../../assets/md/grammar/tenses/past/past__perfect__continuous__tense.md'),
  
  // Future tense
  future__future__simple__tense: require('../../assets/md/grammar/tenses/future/future__simple__tense.md'),
  future__future__continuous__tense: require('../../assets/md/grammar/tenses/future/future__continuous__tense.md'),
  future__future__perfect__tense: require('../../assets/md/grammar/tenses/future/future__perfect__tense.md'),
  future__future__perfect__continuous__tense: require('../../assets/md/grammar/tenses/future/future__perfect__continuous__tense.md'),
  future__near__future: require('../../assets/md/grammar/tenses/future/near__future.md'),

  // Sentences
  sentences__passive__voice: require('../../assets/md/grammar/sentences/passive__voice.md'),
  sentences__reported__speech: require('../../assets/md/grammar/sentences/reported__speech.md'),
  sentences__conditional__sentences: require('../../assets/md/grammar/sentences/conditional__sentences.md'),
  sentences__wish__sentences: require('../../assets/md/grammar/sentences/wish__sentences.md'),
  sentences__question__tags: require('../../assets/md/grammar/sentences/question__tags.md'),
  sentences__imperative__sentences: require('../../assets/md/grammar/sentences/imperative__sentences.md'),
  sentences__comparison__sentences: require('../../assets/md/grammar/sentences/comparison__sentences.md'),
  sentences__exclamatory__sentences: require('../../assets/md/grammar/sentences/exclamatory__sentences.md'),

  // Words
  word__families__nouns: require('../../assets/md/grammar/words/word__families/nouns.md'),
  words__pronouns: require('../../assets/md/grammar/words/pronouns.md'),
  word__families__adjectives: require('../../assets/md/grammar/words/word__families/adjectives.md'),
  word__families__adverbs: require('../../assets/md/grammar/words/word__families/adverbs.md'),
  words__preposition: require('../../assets/md/grammar/words/preposition.md'),
  words__conjunction: require('../../assets/md/grammar/words/conjunction.md'),
  words__interjection: require('../../assets/md/grammar/words/interjection.md'),
  words__article: require('../../assets/md/grammar/words/article.md'),
  words__modal__verbs: require('../../assets/md/grammar/words/modal__verbs.md'),

  // Others
  word__families__word__families: require('../../assets/md/grammar/words/word__families/word__families.md'),
  grammar__phrasal__verbs: require('../../assets/md/grammar/others/phrasal__verbs.md'),
  grammar__idioms: require('../../assets/md/grammar/others/idioms.md'),
  grammar__proverbs: require('../../assets/md/grammar/others/proverbs.md'),
  grammar__quantifiers: require('../../assets/md/grammar/others/quantifiers.md'),

  // Default fallback
  default: require('../../assets/md/grammar/others/quantifiers.md')
};

const TopicDetail = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Parse the lesson parameter
  let lesson: Lesson;
  
  try {
    const lessonParam = params.lesson as string;
    console.log('Lesson param:', lessonParam);
    lesson = JSON.parse(lessonParam);
  } catch (error) {
    console.error('Error parsing lesson parameter:', error);
    // Provide a default lesson if parsing fails
    lesson = {
      id: 0,
      title: 'Unknown Topic',
      subTitle: 'Topic information not available',
      path: 'default',
      image: null
    };
  }
  
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load markdown content
  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        
        // Get the markdown module from our static mapping
        const markdownModule = lesson.path && (lesson.path in markdownMapping) ? 
          markdownMapping[lesson.path as keyof typeof markdownMapping] : 
          markdownMapping.default;

        const asset = Asset.fromModule(markdownModule);
        await asset.downloadAsync();
        const response = await fetch(asset.uri);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error loading markdown:', error);
        console.log('Lesson path attempted:', lesson.path);
        setMarkdownContent('# Content not available\n\nSorry, the content for this topic is not available at the moment.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, [lesson.path]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.description}>{lesson.subTitle}</Text>
        </View>

        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : (
            <Markdown style={markdownStyles}>
              {markdownContent || '# Content not available'}
            </Markdown>
          )}
        </View>

        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => {
            // Navigate to practice screen when implemented
            console.log('Navigate to practice for lesson:', lesson.id);
          }}
        >
          <Text style={styles.practiceButtonText}>Start Practice</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6C757D',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  practiceButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  practiceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 8,
  },
  code: {
    backgroundColor: '#F8F9FA',
    padding: 2,
    borderRadius: 4,
  },
  codeBlock: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
};

export default TopicDetail;