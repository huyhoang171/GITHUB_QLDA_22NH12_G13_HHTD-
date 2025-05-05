import { CategoryData } from "@/app/types/navigation";
export const CATEGORIES: CategoryData[] = [
  {
    id: 1,
    title: 'Tenses',
    description: '13 tenses in English',
    progress: 0,
    total: 13,
    image: require('../assets/images/Tenses/Tenses.png'),
    lessons: [
      { id: 1, title: 'Simple Present', subTitle: 'S + to be/V + O', path: 'present__simple__present__tense' , image: require('../assets/images/Tenses/Simple_Present.jpeg') },
      { id: 2, title: 'Present Continuous', subTitle: 'S + to be + V-ing + O', path: 'present__present__continuous__tense' , image: require('../assets/images/Tenses/Present_Continuous.jpeg') },
      { id: 3, title: 'Present Perfect', subTitle: 'S + have/has + V3 + O', path: 'present__present__perfect__tense' , image: require('../assets/images/Tenses/Present_Perfect.jpeg') },
      { id: 4, title: 'Present Perfect Continuous', subTitle: 'S + have/has + been + V-ing + O', path: 'present__present__perfect__continuous__tense' , image: require('../assets/images/Tenses/Present_Perfect_Continuous.jpeg') },
      { id: 5, title: 'Simple Past', subTitle: 'S + V2 + O', path: 'past__simple__past__tense' , image: require('../assets/images/Tenses/Simple_Past.jpeg') },
      { id: 6, title: 'Past Continuous', subTitle: 'S + was/were + V-ing + O', path: 'past__past__continuous__tense' , image: require('../assets/images/Tenses/Past_Continuous.jpeg') },
      { id: 7, title: 'Past Perfect', subTitle: 'S + had + V3 + O', path: 'past__past__perfect__tense' , image: require('../assets/images/Tenses/Past_Perfect.jpeg') },
      { id: 8, title: 'Past Perfect Continuous', subTitle: 'S + had + been + V-ing + O', path: 'past__past__perfect__continuous__tense' , image: require('../assets/images/Tenses/Past_Perfect_Continuous.jpeg') },
      { id: 9, title: 'Simple Future', subTitle: 'S + will + V + O', path: 'future__future__simple__tense' , image: require('../assets/images/Tenses/Simple_Future.jpeg') },
      { id: 10, title: 'Future Continuous', subTitle: 'S + will + be + V-ing + O', path: 'future__future__continuous__tense' , image: require('../assets/images/Tenses/Future_Continuous.jpeg') },
      { id: 11, title: 'Future Perfect', subTitle: 'S + will + have + V3 + O', path: 'future__future__perfect__tense', image: require('../assets/images/Tenses/Future_Perfect.jpeg') },
      { id: 12, title: 'Future Perfect Continuous', subTitle: 'S + will + have + been + V-ing + O', path: 'future__future__perfect__continuous__tense' , image: require('../assets/images/Tenses/Future_Perfect_Continuous.jpeg') },
      { id: 13, title: 'Near Future', subTitle: 'S + to be + going to + V + O', path: 'future__near__future' , image: require('../assets/images/Tenses/Near_Future.png') },
    ]
  },
  {
    id: 2,
    title: 'Sentences',
    description: 'Sentences in English',
    image: require('../assets/images/Sentences/Sentences.png'),
    progress: 0,
    total: 8,
    lessons: [
      { id: 14, title: 'Passive Voice', subTitle: 'Emphasize the action rather than the doer', path: 'sentences__passive__voice' , image: require('../assets/images/Sentences/Passive Voice.png') },
      { id: 15, title: 'Reported Speech', subTitle: 'Report what someone else said', path: 'sentences__reported__speech' , image: require('../assets/images/Sentences/Reported Speech.png') },
      { id: 16, title: 'Conditional Sentences', subTitle: '4 types of conditional sentences', path: 'sentences__conditional__sentences' , image: require('../assets/images/Sentences/Conditional Sentences.png') },
      { id: 17, title: 'Wish Sentences', subTitle: 'Express regret or desire', path: 'sentences__wish__sentences' , image: require('../assets/images/Sentences/Wish Sentences.png') },
      { id: 18, title: 'Question Tags', subTitle: 'Short questions at the end of a sentence', path: 'sentences__question__tags' , image: require('../assets/images/Sentences/Question Tags.png') },
      { id: 19, title: 'Imperative Sentences', subTitle: 'Give orders or instructions', path: 'sentences__imperative__sentences' , image: require('../assets/images/Sentences/Imperative Sentences.png') },
      { id: 20, title: 'Comparison Sentences', subTitle: 'Compare two or more things', path: 'sentences__comparison__sentences' , image: require('../assets/images/Sentences/Exclamatory Sentences.png') },
      { id: 21, title: 'Exclamatory Sentences', subTitle: 'Express strong feelings', path: 'sentences__exclamatory__sentences' , image: require('../assets/images/Sentences/Exclamatory Sentences.png') },
    ]
  },
  {
    id: 3,
    title: 'Words',
    description: 'Words in English',
    image: require('../assets/images/Words/Words.png'),
    progress: 0,
    total: 9,
    lessons: [
      { id: 22, title: 'Nouns', subTitle: 'Person, place, thing, or idea', path: 'word__families__nouns' , image: require('../assets/images/Words/Nouns.png') },
      { id: 23, title: 'Pronouns', subTitle: 'Replace nouns', path: 'words__pronouns' , image: require('../assets/images/Words/Pronouns.png')},
      { id: 24, title: 'Adjectives', subTitle: 'Describe nouns', path: 'word__families__adjectives' , image: require('../assets/images/Words/Adjectives.png') },
      { id: 25, title: 'Adverbs', subTitle: 'Describe verbs, adjectives, or other adverbs', path: 'word__families__adverbs' , image: require('../assets/images/Words/Adverbs.png') },
      { id: 26, title: 'Prepositions', subTitle: 'Show the relationship between a noun and another word', path: 'words__preposition' , image: require('../assets/images/Words/Prepositions.png') },
      { id: 27, title: 'Conjunctions', subTitle: 'Connect words, phrases, or clauses', path: 'words__conjunction' , image: require('../assets/images/Words/Conjunctions.png') },
      { id: 28, title: 'Interjections', subTitle: 'Express strong feelings or emotions', path: 'words__interjection' , image: require('../assets/images/Words/Interjections.png') },
      { id: 29, title: 'Articles', subTitle: 'A, an, the', path: 'words__article' , image: require('../assets/images/Words/Articles.png') },
      { id: 32, title: 'Modals Verbs', subTitle: 'Can, could, may, might, must, shall, should, will, would', path: 'words__modal__verbs' , image: require('../assets/images/Words/Modals Verbs.png') },
    ]
  },
  {
    id: 4,
    title: 'Others',
    description: 'Other grammar topics',
    progress: 0,
    image: require('../assets/images/Others/Others.png'),
    total: 5,
    lessons: [
      { id: 33, title: 'Word Families', subTitle: 'Words that are related to each other', path: 'word__families__word__families', image: require('../assets/images/Others/Word Families.png') },
      { id: 34, title: 'Phrasal Verbs', subTitle: 'Verb + preposition or adverb', path: 'grammar__phrasal__verbs', image: require('../assets/images/Others/Phrasal Verbs.png') },
      { id: 35, title: 'Idioms', subTitle: 'Expressions that have a meaning different from the meaning of the individual words', path: 'grammar__idioms', image: require('../assets/images/Others/Idioms.png') },
      { id: 36, title: 'Proverbs', subTitle: 'Short sayings that give advice or express a belief', path: 'grammar__proverbs', image: require('../assets/images/Others/Proverbs.png') },
      { id: 37, title: 'Quantifiers', subTitle: 'Words that describe quantity', path: 'grammar__quantifiers', image: require('../assets/images/Others/Quantifiers.png') },
    ]
  }
  // ... rest of the categories ...
];