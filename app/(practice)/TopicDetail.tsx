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
import { styles} from '../styles/TopicDetailStyle';
import { markdownStyles } from '../styles/TopicDetailStyle';


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
  let lesson: Lesson = {
    id: 0,
    title: 'Unknown Topic',
    subTitle: 'Topic information not available',
    path: 'default',
    image: null
  };
  
  try {
    if (params.lesson && typeof params.lesson === 'string') {
      const lessonParam = params.lesson;
      console.log('Lesson param:', lessonParam);
      lesson = JSON.parse(lessonParam);
    } else {
      console.log('Lesson param:', params.lesson);
    }
  } catch (error) {
    console.error('Error parsing lesson parameter:', error);
    // Sử dụng lesson mặc định đã khởi tạo
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



export default TopicDetail;