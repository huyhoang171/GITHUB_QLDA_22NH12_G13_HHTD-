import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface VocabularyItem {
  word: string;
  phonetic: string;
  phonetic_text: string;
  phonetic_am: string;
  phonetic_am_text: string;
  senses: {
    definition: string;
    examples: {
      x: string;
    }[];
  }[];
}

interface Topic {
  id: string;
  title: string;
  titleVN: string;
  image: any;
  subtopics?: { id: string; title: string; titleVN: string; }[];
}

const topics: Topic[] = [
  {
    id: 'Animal',
    title: 'Animal',
    titleVN: 'Động vật',
    image: require('../../assets/png/png_topics/animals_1.png'),
    subtopics: [
      {
        id: 'animals',
        title: 'Animals',
        titleVN: 'Động vật'
      },
      {
        id: 'birds',
        title: 'Birds',
        titleVN: 'Chim'
      },
      {
        id: 'fish_and_shellfish',
        title: 'Fish and Shellfish',
        titleVN: 'Cá và Động vật có vỏ'
      },
      {
        id: 'insects_worms_etc',
        title: 'Insects, Worms, etc.',
        titleVN: 'Côn trùng, Giun, v.v.'
      }
    ]
  },
  {
    id: 'Appearance',
    title: 'Appearance',
    titleVN: 'Ngoại hình',
    image: require('../../assets/png/png_topics/appearance_1.png'),
    subtopics: [
      {
        id: 'appearance',
        title: 'Appearance',
        titleVN: 'Ngoại hình'
      },
      {
        id: 'body',
        title: 'Body',
        titleVN: 'Cơ thể'
      },
      {
        id: 'clothes_and_fashion',
        title: 'Clothes and Fashion',
        titleVN: 'Quần áo và Thời trang'
      },
      {
        id: 'colours_and_shapes',
        title: 'Colours and Shapes',
        titleVN: 'Màu sắc và Hình dạng'
      }
    ]
  },
  {
    id: 'Communication',
    title: 'Communication',
    titleVN: 'Giao tiếp',
    image: require('../../assets/png/png_topics/communication.png'),
    subtopics: [
      {
        id: 'language',
        title: 'Language',
        titleVN: 'Ngôn ngữ'
      },
      {
        id: 'phones_email_and_the_internet',
        title: 'Phones, Email and Internet',
        titleVN: 'Điện thoại, Email và Internet'
      }
    ]
  },
  {
    id: 'Culture',
    title: 'Culture',
    titleVN: 'Văn hóa',
    image: require('../../assets/png/png_topics/culture.png'),
    subtopics: [
      {
        id: 'art',
        title: 'Art',
        titleVN: 'Nghệ thuật'
      },
      {
        id: 'film_and_theatre',
        title: 'Film and Theatre',
        titleVN: 'Phim và Nhà hát'
      },
      {
        id: 'music',
        title: 'Music',
        titleVN: 'Âm nhạc'
      },
      {
        id: 'literature_and_writing',
        title: 'Literature and Writing',
        titleVN: 'Văn học và Viết lách'
      },
      {
        id: 'tv_radio_and_news',
        title: 'TV, Radio and News',
        titleVN: 'Truyền hình, Radio và Tin tức'
      },
    ]
  },
  {
    id: 'Food and drink',
    title: 'Food and Drink',
    titleVN: 'Ẩm thực',
    image: require('../../assets/png/png_topics/food-and-drink.png'),
    subtopics: [
      {
        id: 'cooking_and_eating',
        title: 'Cooking and Eating',
        titleVN: 'Nấu ăn và Ăn uống'
      },
      {
        id: 'drinks',
        title: 'Drinks',
        titleVN: 'Đồ uống'
      },
      {
        id: 'food',
        title: 'Food',
        titleVN: 'Thức ăn'
      },

    ]
  },
  {
    id: 'Functions',
    title: 'Functions',
    titleVN: 'Chức năng',
    image: require('../../assets/png/png_topics/functions.png'),
    subtopics: [
      {
        id: 'discussion_and_agreement',
        title: 'Discussion and Agreement',
        titleVN: 'Thảo luận và Đồng ý'
      },
      {
        id: 'doubt-guessing_and_certainty',
        title: 'Doubt, Guessing and Certainty',
        titleVN: 'Nghi ngờ, Phỏng đoán và Chắc chắn'
      },
      {
        id: 'opinion_and_argument',
        title: 'Opinion and Argument',
        titleVN: 'Ý kiến và Tranh luận'
      },
      {
        id: 'permission_and_obligation',
        title: 'Permission and Obligation',
        titleVN: 'Sự cho phép và Nghĩa vụ'
      },
      {
        id: 'preferences_and_decisions',
        title: 'Preferences and Decisions',
        titleVN: 'Sở thích và Quyết định'
      },
      {
        id: 'suggestions_and_advice',
        title: 'Suggestions and Advice',
        titleVN: 'Gợi ý và Lời khuyên'
      }
    ]
  },
  {
    id: 'Health',
    title: 'Health',
    titleVN: 'Sức khỏe',
    image: require('../../assets/png/png_topics/health.png'),
    subtopics: [
      {
        id: 'disability',
        title: 'Disability',
        titleVN: 'Khuyết tật'
      },
      {
        id: 'health_and_fitness',
        title: 'Health and Fitness',
        titleVN: 'Sức khỏe và Thể chất'
      },
      {
        id: 'health_problems',
        title: 'Health Problems',
        titleVN: 'Các vấn đề sức khỏe'
      },
      {
        id: 'healthcare',
        title: 'Healthcare',
        titleVN: 'Chăm sóc sức khỏe'
      },
      {
        id: 'mental_health',
        title: 'Mental Health',
        titleVN: 'Sức khỏe tinh thần'
      }
    ]
  },
  {
    id: 'Homes and buildings',
    title: 'Homes and Buildings',
    titleVN: 'Nhà cửa và Công trình',
    image: require('../../assets/png/png_topics/homes-and-buildings.png'),
    subtopics: [
      {
        id: 'houses_and_homes',
        title: 'Houses and Homes',
        titleVN: 'Nhà và Căn hộ'
      },
      {
        id: 'buildings',
        title: 'Buildings',
        titleVN: 'Công trình'
      },
      {
        id: 'gardens',
        title: 'Gardens',
        titleVN: 'Vườn tược'
      }
    ]
  },
  {
    id: 'Leisure',
    title: 'Leisure',
    titleVN: 'Giải trí',
    image: require('../../assets/png/png_topics/leisure.png'),
    subtopics: [
      {
        id: 'games_and_toys',
        title: 'Games and Toys',
        titleVN: 'Trò chơi và Đồ chơi'
      },
      {
        id: 'hobbies',
        title: 'Hobbies',
        titleVN: 'Sở thích'
      },
      {
        id: 'shopping',
        title: 'Shopping',
        titleVN: 'Mua sắm'
      }
    ]
  },
  {
    id: 'Notions',
    title: 'Notions',
    titleVN: 'Khái niệm',
    image: require('../../assets/png/png_topics/notions.png'),
    subtopics: [
      {
        id: 'change_cause_and_effect',
        title: 'Change, Cause and Effect',
        titleVN: 'Thay đổi, Nguyên nhân và Kết quả'
      },
      {
        id: 'danger',
        title: 'Danger',
        titleVN: 'Nguy hiểm'
      },
      {
        id: 'difficulty_and_failure',
        title: 'Difficulty and Failure',
        titleVN: 'Khó khăn và Thất bại'
      },
      {
        id: 'success',
        title: 'Success',
        titleVN: 'Thành công'
      }
    ]
  },
  {
    id: 'People',
    title: 'People',
    titleVN: 'Con người',
    image: require('../../assets/png/png_topics/people.png'),
    subtopics: [
      {
        id: 'education',
        title: 'Education',
        titleVN: 'Giáo dục'
      },
      {
        id: 'family_and_relationships',
        title: 'Family and Relationships',
        titleVN: 'Gia đình và Mối quan hệ'
      },
      {
        id: 'feelings',
        title: 'Feelings',
        titleVN: 'Cảm xúc'
      },
      {
        id: 'life_stages',
        title: 'Life Stages',
        titleVN: 'Các giai đoạn cuộc đời'
      },
      {
        id: 'personal_qualities',
        title: 'Personal Qualities',
        titleVN: 'Phẩm chất cá nhân'
      }
    ]
  },
  {
    id: 'Politics and society',
    title: 'Politics and Society',
    titleVN: 'Chính trị và Xã hội',
    image: require('../../assets/png/png_topics/politics-and-society.png'),
    subtopics: [
      {
        id: 'crime_and_punishment',
        title: 'Crime and Punishment',
        titleVN: 'Tội phạm và Hình phạt'
      },
      {
        id: 'law_and_justice',
        title: 'Law and Justice',
        titleVN: 'Luật pháp và Công lý'
      },
      {
        id: 'people_in_society',
        title: 'People in Society',
        titleVN: 'Con người trong Xã hội'
      },
      {
        id: 'politics',
        title: 'Politics',
        titleVN: 'Chính trị'
      },
      {
        id: 'religion_and_festivals',
        title: 'Religion and Festivals',
        titleVN: 'Tôn giáo và Lễ hội'
      },
      {
        id: 'social_issues',
        title: 'Social Issues',
        titleVN: 'Các vấn đề Xã hội'
      }
    ]
  },
  {
    id: 'Science and technology',
    title: 'Science and Technology',
    titleVN: 'Khoa học và Công nghệ',
    image: require('../../assets/png/png_topics/science-and-technology.png'),
    subtopics: [
      {
        id: 'biology',
        title: 'Biology',
        titleVN: 'Sinh học'
      },
      {
        id: 'computers',
        title: 'Computers',
        titleVN: 'Máy tính'
      },
      {
        id: 'engineering',
        title: 'Engineering',
        titleVN: 'Kỹ thuật'
      },
      {
        id: 'maths_and_measurement',
        title: 'Maths and Measurement',
        titleVN: 'Toán học và Đo lường'
      },
      {
        id: 'physics_and_chemistry',
        title: 'Physics and Chemistry',
        titleVN: 'Vật lý và Hóa học'
      },
      {
        id: 'scientific_research',
        title: 'Scientific Research',
        titleVN: 'Nghiên cứu Khoa học'
      }
    ]
  },
  {
    id: 'Sport',
    title: 'Sport',
    titleVN: 'Thể thao',
    image: require('../../assets/png/png_topics/sport.png'),
    subtopics: [
      {
        id: 'sports_ball_and_racket_sports',
        title: 'Ball and Racket Sports',
        titleVN: 'Thể thao Bóng và Vợt'
      },
      {
        id: 'sports_other_sports',
        title: 'Other Sports',
        titleVN: 'Các môn thể thao khác'
      },
      {
        id: 'sports_water_sports',
        title: 'Water Sports',
        titleVN: 'Thể thao Dưới nước'
      }
    ]
  },
  {
    id: 'The natural world',
    title: 'The Natural World',
    titleVN: 'Thế giới tự nhiên',
    image: require('../../assets/png/png_topics/the-natural-world.png'),
    subtopics: [
      {
        id: 'farming',
        title: 'Farming',
        titleVN: 'Nông nghiệp'
      },
      {
        id: 'geography',
        title: 'Geography',
        titleVN: 'Địa lý'
      },
      {
        id: 'plants_and_trees',
        title: 'Plants and Trees',
        titleVN: 'Cây cối và Thực vật'
      },
      {
        id: 'the_environment',
        title: 'The Environment',
        titleVN: 'Môi trường'
      },
      {
        id: 'weather',
        title: 'Weather',
        titleVN: 'Thời tiết'
      }
    ]
  },
  {
    id: 'Time and space',
    title: 'Time and Space',
    titleVN: 'Thời gian và Không gian',
    image: require('../../assets/png/png_topics/time-and-space.png'),
    subtopics: [
      {
        id: 'history',
        title: 'History',
        titleVN: 'Lịch sử'
      },
      {
        id: 'space',
        title: 'Space',
        titleVN: 'Không gian'
      },
      {
        id: 'time',
        title: 'Time',
        titleVN: 'Thời gian'
      }
    ]
  },
  {
    id: 'Travel',
    title: 'Travel',
    titleVN: 'Du lịch',
    image: require('../../assets/png/png_topics/travel.png'),
    subtopics: [
      {
        id: 'holidays',
        title: 'Holidays',
        titleVN: 'Kỳ nghỉ'
      },
      {
        id: 'transport_by_air',
        title: 'Transport by Air',
        titleVN: 'Phương tiện hàng không'
      },
      {
        id: 'transport_by_bus_and_train',
        title: 'Transport by Bus and Train',
        titleVN: 'Phương tiện xe buýt và tàu hỏa'
      },
      {
        id: 'transport_by_car_or_lorry',
        title: 'Transport by Car or Lorry',
        titleVN: 'Phương tiện ô tô hoặc xe tải'
      },
      {
        id: 'transport_by_water',
        title: 'Transport by Water',
        titleVN: 'Phương tiện đường thủy'
      }
    ]
  },
  {
    id: 'Work and business',
    title: 'Work and Business',
    titleVN: 'Công việc và Kinh doanh',
    image: require('../../assets/png/png_topics/work-and-business.png'),
    subtopics: [
      {
        id: 'business',
        title: 'Business',
        titleVN: 'Kinh doanh'
      },
      {
        id: 'jobs',
        title: 'Jobs',
        titleVN: 'Nghề nghiệp'
      },
      {
        id: 'money',
        title: 'Money',
        titleVN: 'Tiền bạc'
      },
      {
        id: 'working_life',
        title: 'Working Life',
        titleVN: 'Cuộc sống công việc'
      }
    ]
  }
];

// Dictionary of word files by topic and subtopic
const vocabularyFiles = {
  'Animal': {
    'animals': require('../../assets/json/animal/animals.json'),
    'birds': require('../../assets/json/animal/birds.json'),
    'fish_and_shellfish': require('../../assets/json/animal/fish_and_shellfish.json'),
    'insects_worms_etc': require('../../assets/json/animal/insects_worms_etc.json')
  },
  'Appearance': {
    'appearance': require('../../assets/json/Appearance/appearance.json'),
    'body': require('../../assets/json/Appearance/body.json'),
    'clothes_and_fashion': require('../../assets/json/Appearance/clothes_and_fashion.json'),
    'colours_and_shapes': require('../../assets/json/Appearance/colours_and_shapes.json')
  },
  'Communication': {
    'language': require('../../assets/json/Communication/language.json'),
    'phones_email_and_the_internet': require('../../assets/json/Communication/phones_email_and_the_internet.json')
  },
  'Culture': {
    'art': require('../../assets/json/Culture/art.json'),
    'film_and_theatre': require('../../assets/json/Culture/film_and_theatre.json'),
    'music': require('../../assets/json/Culture/music.json'),
    'literature_and_writing': require('../../assets/json/Culture/literature_and_writing.json'),
    'tv_radio_and_news': require('../../assets/json/Culture/tv_radio_and_news.json')
  },
  'Food and drink': {
    'cooking_and_eating': require('../../assets/json/Food and drink/cooking_and_eating.json'),
    'drinks': require('../../assets/json/Food and drink/drinks.json'),
    'food': require('../../assets/json/Food and drink/food.json')
  },
  'Functions': {
    'discussion_and_agreement': require('../../assets/json/Functions/discussion_and_agreement.json'),
    'doubt-guessing_and_certainty': require('../../assets/json/Functions/doubt-guessing_and_certainty.json'),
    'opinion_and_argument': require('../../assets/json/Functions/opinion_and_argument.json'),
    'permission_and_obligation': require('../../assets/json/Functions/permission_and_obligation.json'),
    'preferences_and_decisions': require('../../assets/json/Functions/preferences_and_decisions.json'),
    'suggestions_and_advice': require('../../assets/json/Functions/suggestions_and_advice.json')
  },
  'Health': {
    'disability': require('../../assets/json/Health/disability.json'),
    'health_and_fitness': require('../../assets/json/Health/health_and_fitness.json'),
    'health_problems': require('../../assets/json/Health/health_problems.json'),
    'healthcare': require('../../assets/json/Health/healthcare.json'),
    'mental_health': require('../../assets/json/Health/mental_health.json')
  },
  'Homes and buildings': {
    'houses_and_homes': require('../../assets/json/Homes and buildings/houses_and_homes.json'),
    'buildings': require('../../assets/json/Homes and buildings/buildings.json'),
    'gardens': require('../../assets/json/Homes and buildings/gardens.json')
  },
  'Leisure': {
    'games_and_toys': require('../../assets/json/Leisure/games_and_toys.json'),
    'hobbies': require('../../assets/json/Leisure/hobbies.json'),
    'shopping': require('../../assets/json/Leisure/shopping.json')
  },
  'Notions': {
    'change_cause_and_effect': require('../../assets/json/Notions/change_cause_and_effect.json'),
    'danger': require('../../assets/json/Notions/danger.json'),
    'difficulty_and_failure': require('../../assets/json/Notions/difficulty_and_failure.json'),
    'success': require('../../assets/json/Notions/success.json')
  },
  'People': {
    'education': require('../../assets/json/People/education.json'),
    'family_and_relationships': require('../../assets/json/People/family_and_relationships.json'),
    'feelings': require('../../assets/json/People/feelings.json'),
    'life_stages': require('../../assets/json/People/life_stages.json'),
    'personal_qualities': require('../../assets/json/People/personal_qualities.json')
  },
  'Politics and society': {
    'crime_and_punishment': require('../../assets/json/Politics and society/crime_and_punishment.json'),
    'law_and_justice': require('../../assets/json/Politics and society/law_and_justice.json'),
    'people_in_society': require('../../assets/json/Politics and society/people_in_society.json'),
    'politics': require('../../assets/json/Politics and society/politics.json'),
    'religion_and_festivals': require('../../assets/json/Politics and society/religion_and_festivals.json'),
    'social_issues': require('../../assets/json/Politics and society/social_issues.json')
  },
  'Science and technology': {
    'biology': require('../../assets/json/Science and technology/biology.json'),
    'computers': require('../../assets/json/Science and technology/computers.json'),
    'engineering': require('../../assets/json/Science and technology/engineering.json'),
    'maths_and_measurement': require('../../assets/json/Science and technology/maths_and_measurement.json'),
    'physics_and_chemistry': require('../../assets/json/Science and technology/physics_and_chemistry.json'),
    'scientific_research': require('../../assets/json/Science and technology/scientific_research.json')
  },
  'Sport': {
    'sports_ball_and_racket_sports': require('../../assets/json/Sport/sports_ball_and_racket_sports.json'),
    'sports_other_sports': require('../../assets/json/Sport/sports_other_sports.json'),
    'sports_water_sports': require('../../assets/json/Sport/sports_water_sports.json')
  },
  'The natural world': {
    'farming': require('../../assets/json/The natural world/farming.json'),
    'geography': require('../../assets/json/The natural world/geography.json'),
    'plants_and_trees': require('../../assets/json/The natural world/plants_and_trees.json'),
    'the_environment': require('../../assets/json/The natural world/the_environment.json'),
    'weather': require('../../assets/json/The natural world/weather.json')
  },
  'Time and space': {
    'history': require('../../assets/json/Time and space/history.json'),
    'space': require('../../assets/json/Time and space/space.json'),
    'time': require('../../assets/json/Time and space/time.json')
  },
  'Travel': {
    'holidays': require('../../assets/json/Travel/holidays.json'),
    'transport_by_air': require('../../assets/json/Travel/transport_by_air.json'),
    'transport_by_bus_and_train': require('../../assets/json/Travel/transport_by_bus_and_train.json'),
    'transport_by_car_or_lorry': require('../../assets/json/Travel/transport_by_car_or_lorry.json'),
    'transport_by_water': require('../../assets/json/Travel/transport_by_water.json')
  },
  'Work and business': {
    'business': require('../../assets/json/Work and business/business.json'),
    'jobs': require('../../assets/json/Work and business/jobs.json'),
    'money': require('../../assets/json/Work and business/money.json'),
    'working_life': require('../../assets/json/Work and business/working_life.json')
  }
};

const windowWidth = Dimensions.get('window').width;

export default function VocabularyScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [translatedSenses, setTranslatedSenses] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [translatedWord, setTranslatedWord] = useState<string | null>(null);
  
  // Reset translation states when word changes
  useEffect(() => {
    setTranslatedSenses(null);
    setTranslatedWord(null);
    setTranslationError(null);
    setIsTranslating(false);
  }, [currentIndex]);

  useEffect(() => {
    if (selectedTopic && selectedSubtopic) {
      loadVocabularyData(selectedTopic, selectedSubtopic);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedTopic, selectedSubtopic]);

  const loadVocabularyData = async (topicId: string, subtopicId: string) => {
    try {
      setCurrentIndex(0);
    setShowAnswer(false);
      
      // Use a switch statement to handle each topic/subtopic combination
      let data;
      switch (`${topicId}/${subtopicId}`) {
        case 'Animal/animals':
          data = require('../../assets/json/animal/animals.json');
          break;
        case 'Animal/birds':
          data = require('../../assets/json/animal/birds.json');
          break;
        case 'Animal/fish_and_shellfish':
          data = require('../../assets/json/animal/fish_and_shellfish.json');
          break;
        case 'Animal/insects_worms_etc':
          data = require('../../assets/json/animal/insects_worms_etc.json');
          break;
        case 'Appearance/appearance':
          data = require('../../assets/json/Appearance/appearance.json');
          break;
        case 'Appearance/body':
          data = require('../../assets/json/Appearance/body.json');
          break;
        case 'Appearance/clothes_and_fashion':
          data = require('../../assets/json/Appearance/clothes_and_fashion.json');
          break;
        case 'Appearance/colours_and_shapes':
          data = require('../../assets/json/Appearance/colours_and_shapes.json');
          break;
        case 'Communication/language':
          data = require('../../assets/json/Communication/language.json');
          break;
        case 'Communication/phones_email_and_the_internet':
          data = require('../../assets/json/Communication/phones_email_and_the_internet.json');
          break;
        case 'Culture/art':
          data = require('../../assets/json/Culture/art.json');
          break;
        case 'Culture/film_and_theatre':
          data = require('../../assets/json/Culture/film_and_theatre.json');
          break;
        case 'Culture/music':
          data = require('../../assets/json/Culture/music.json');
          break;
        case 'Culture/literature_and_writing':
          data = require('../../assets/json/Culture/literature_and_writing.json');
          break;
        case 'Culture/tv_radio_and_news':
          data = require('../../assets/json/Culture/tv_radio_and_news.json');
          break;
        case 'Food and drink/cooking_and_eating':
          data = require('../../assets/json/Food and drink/cooking_and_eating.json');
          break;
        case 'Food and drink/drinks':
          data = require('../../assets/json/Food and drink/drinks.json');
          break;
        case 'Food and drink/food':
          data = require('../../assets/json/Food and drink/food.json');
          break;
        case 'Functions/discussion_and_agreement':
          data = require('../../assets/json/Functions/discussion_and_agreement.json');
          break;
        case 'Functions/doubt-guessing_and_certainty':
          data = require('../../assets/json/Functions/doubt-guessing_and_certainty.json');
          break;
        case 'Functions/opinion_and_argument':
          data = require('../../assets/json/Functions/opinion_and_argument.json');
          break;
        case 'Functions/permission_and_obligation':
          data = require('../../assets/json/Functions/permission_and_obligation.json');
          break;
        case 'Functions/preferences_and_decisions':
          data = require('../../assets/json/Functions/preferences_and_decisions.json');
          break;
        case 'Functions/suggestions_and_advice':
          data = require('../../assets/json/Functions/suggestions_and_advice.json');
          break;
        case 'Health/disability':
          data = require('../../assets/json/Health/disability.json');
          break;
        case 'Health/health_and_fitness':
          data = require('../../assets/json/Health/health_and_fitness.json');
          break;
        case 'Health/health_problems':
          data = require('../../assets/json/Health/health_problems.json');
          break;
        case 'Health/healthcare':
          data = require('../../assets/json/Health/healthcare.json');
          break;
        case 'Health/mental_health':
          data = require('../../assets/json/Health/mental_health.json');
          break;
        case 'Homes and buildings/houses_and_homes':
          data = require('../../assets/json/Homes and buildings/houses_and_homes.json');
          break;
        case 'Homes and buildings/buildings':
          data = require('../../assets/json/Homes and buildings/buildings.json');
          break;
        case 'Homes and buildings/gardens':
          data = require('../../assets/json/Homes and buildings/gardens.json');
          break;
        case 'Leisure/games_and_toys':
          data = require('../../assets/json/Leisure/games_and_toys.json');
          break;
        case 'Leisure/hobbies':
          data = require('../../assets/json/Leisure/hobbies.json');
          break;
        case 'Leisure/shopping':
          data = require('../../assets/json/Leisure/shopping.json');
          break;
        case 'Notions/change_cause_and_effect':
          data = require('../../assets/json/Notions/change_cause_and_effect.json');
          break;
        case 'Notions/danger':
          data = require('../../assets/json/Notions/danger.json');
          break;
        case 'Notions/difficulty_and_failure':
          data = require('../../assets/json/Notions/difficulty_and_failure.json');
          break;
        case 'Notions/success':
          data = require('../../assets/json/Notions/success.json');
          break;
        case 'People/education':
          data = require('../../assets/json/People/education.json');
          break;
        case 'People/family_and_relationships':
          data = require('../../assets/json/People/family_and_relationships.json');
          break;
        case 'People/feelings':
          data = require('../../assets/json/People/feelings.json');
          break;
        case 'People/life_stages':
          data = require('../../assets/json/People/life_stages.json');
          break;
        case 'People/personal_qualities':
          data = require('../../assets/json/People/personal_qualities.json');
          break;
        case 'Politics and society/crime_and_punishment':
          data = require('../../assets/json/Politics and society/crime_and_punishment.json');
          break;
        case 'Politics and society/law_and_justice':
          data = require('../../assets/json/Politics and society/law_and_justice.json');
          break;
        case 'Politics and society/people_in_society':
          data = require('../../assets/json/Politics and society/people_in_society.json');
          break;
        case 'Politics and society/politics':
          data = require('../../assets/json/Politics and society/politics.json');
          break;
        case 'Politics and society/religion_and_festivals':
          data = require('../../assets/json/Politics and society/religion_and_festivals.json');
          break;
        case 'Politics and society/social_issues':
          data = require('../../assets/json/Politics and society/social_issues.json');
          break;
        case 'Science and technology/biology':
          data = require('../../assets/json/Science and technology/biology.json');
          break;
        case 'Science and technology/computers':
          data = require('../../assets/json/Science and technology/computers.json');
          break;
        case 'Science and technology/engineering':
          data = require('../../assets/json/Science and technology/engineering.json');
          break;
        case 'Science and technology/maths_and_measurement':
          data = require('../../assets/json/Science and technology/maths_and_measurement.json');
          break;
        case 'Science and technology/physics_and_chemistry':
          data = require('../../assets/json/Science and technology/physics_and_chemistry.json');
          break;
        case 'Science and technology/scientific_research':
          data = require('../../assets/json/Science and technology/scientific_research.json');
          break;
        case 'Sport/sports_ball_and_racket_sports':
          data = require('../../assets/json/Sport/sports_ball_and_racket_sports.json');
          break;
        case 'Sport/sports_other_sports':
          data = require('../../assets/json/Sport/sports_other_sports.json');
          break;
        case 'Sport/sports_water_sports':
          data = require('../../assets/json/Sport/sports_water_sports.json');
          break;
        case 'The natural world/farming':
          data = require('../../assets/json/The natural world/farming.json');
          break;
        case 'The natural world/geography':
          data = require('../../assets/json/The natural world/geography.json');
          break;
        case 'The natural world/plants_and_trees':
          data = require('../../assets/json/The natural world/plants_and_trees.json');
          break;
        case 'The natural world/the_environment':
          data = require('../../assets/json/The natural world/the_environment.json');
          break;
        case 'The natural world/weather':
          data = require('../../assets/json/The natural world/weather.json');
          break;
        case 'Time and space/history':
          data = require('../../assets/json/Time and space/history.json');
          break;
        case 'Time and space/space':
          data = require('../../assets/json/Time and space/space.json');
          break;
        case 'Time and space/time':
          data = require('../../assets/json/Time and space/time.json');
          break;
        case 'Travel/holidays':
          data = require('../../assets/json/Travel/holidays.json');
          break;
        case 'Travel/transport_by_air':
          data = require('../../assets/json/Travel/transport_by_air.json');
          break;
        case 'Travel/transport_by_bus_and_train':
          data = require('../../assets/json/Travel/transport_by_bus_and_train.json');
          break;
        case 'Travel/transport_by_car_or_lorry':
          data = require('../../assets/json/Travel/transport_by_car_or_lorry.json');
          break;
        case 'Travel/transport_by_water':
          data = require('../../assets/json/Travel/transport_by_water.json');
          break;
        case 'Work and business/business':
          data = require('../../assets/json/Work and business/business.json');
          break;
        case 'Work and business/jobs':
          data = require('../../assets/json/Work and business/jobs.json');
          break;
        case 'Work and business/money':
          data = require('../../assets/json/Work and business/money.json');
          break;
        case 'Work and business/working_life':
          data = require('../../assets/json/Work and business/working_life.json');
          break;
        default:
          console.error(`No data found for topic ${topicId}/${subtopicId}`);
          data = [];
      }
      
      setVocabularyItems(data);
      if (data.length) {
        console.log(`Total words in topic '${topicId}/${subtopicId}': ${data.length}`);
      }
    } catch (error) {
      console.error(`Error loading vocabulary data for topic ${topicId}/${subtopicId}:`, error);
      setVocabularyItems([]);
    }
  };

  const playSound = async (url: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url }
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  const translateSenses = async (word: string, definition: string) => {
    try {
      setIsTranslating(true);
      setTranslationError(null);
      
      // Translate word
      const wordUrl = new URL('https://api.mymemory.translated.net/get');
      wordUrl.searchParams.append('q', word);
      wordUrl.searchParams.append('langpair', 'en|vi');
      
      const wordResponse = await fetch(wordUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!wordResponse.ok) {
        throw new Error(`HTTP error! status: ${wordResponse.status}`);
      }
  
      const wordData = await wordResponse.json();
      
      // Translate definition
      const defUrl = new URL('https://api.mymemory.translated.net/get');
      defUrl.searchParams.append('q', definition);
      defUrl.searchParams.append('langpair', 'en|vi');
      
      const defResponse = await fetch(defUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!defResponse.ok) {
        throw new Error(`HTTP error! status: ${defResponse.status}`);
      }
  
      const defData = await defResponse.json();
      
      if (wordData.responseStatus === 200 && defData.responseStatus === 200) {
        setTranslatedWord(wordData.responseData.translatedText);
        setTranslatedSenses(defData.responseData.translatedText);
      } else {
        throw new Error(wordData.responseStatus === 429 || defData.responseStatus === 429 ? 
          'Quá nhiều yêu cầu dịch. Vui lòng thử lại sau.' : 
          'Không thể dịch. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslationError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi dịch');
    } finally {
      setIsTranslating(false);
    }
  };

  // Hiển thị danh sách topic chính
  if (!selectedTopic) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Learn vocabulary by topic</Text>
        <View style={styles.topicsGrid}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => setSelectedTopic(topic.id)}
            >
              <Image 
                source={topic.image}
                style={styles.topicImage}
                resizeMode="contain"
              />
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicTitleVN}>{topic.titleVN}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Hiển thị danh sách subtopic khi đã chọn topic chính
  if (!selectedSubtopic) {
    const currentTopic = topics.find(t => t.id === selectedTopic);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedTopic(null)}
          >
            <Text style={styles.backButtonText}>← Back to Topics</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentTopic?.title}</Text>
        </View>
        <ScrollView style={styles.subtopicsContainer}>
          {currentTopic?.subtopics?.map((subtopic) => (
            <TouchableOpacity
              key={subtopic.id}
              style={[styles.subtopicCard, { backgroundColor: getRandomColor() }]} // Áp dụng màu ngẫu nhiên
              onPress={() => setSelectedSubtopic(subtopic.id)}
            >
              <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
              <Text style={styles.subtopicTitleVN}>{subtopic.titleVN}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Hiển thị từ vựng khi đã chọn subtopic
  const currentItem = vocabularyItems[currentIndex];
  const currentTopic = topics.find(t => t.id === selectedTopic);
  const currentSubtopic = currentTopic?.subtopics?.find(s => s.id === selectedSubtopic);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedSubtopic(null)}
        >
          <Text style={styles.backButtonText}>← Back to {currentTopic?.title}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentSubtopic?.title}</Text>
      </View>
  
      {currentItem ? (
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.word}>{currentItem.word}</Text>
            {isTranslating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#28a745" />
              </View>
            ) : translatedWord ? (
              <Text style={styles.wordVN}>{translatedWord}</Text>
            ) : null}
    
            <View style={styles.pronunciationContainer}>
              <View style={styles.pronunciation}>
                <Text style={styles.pronunciationLabel}>UK:</Text>
                <Text style={styles.phoneticText}>{currentItem.phonetic_text}</Text>
                <TouchableOpacity
                  style={styles.playButtonUK}
                  onPress={() => playSound(currentItem.phonetic)}
                >
                  <FontAwesome name="volume-up" size={20} color="white" />
                </TouchableOpacity>
              </View>
    
              <View style={styles.pronunciation}>
                <Text style={styles.pronunciationLabel}>US:</Text>
                <Text style={styles.phoneticText}>{currentItem.phonetic_am_text}</Text>
                <TouchableOpacity
                  style={styles.playButtonUS}
                  onPress={() => playSound(currentItem.phonetic_am)}
                >
                  <FontAwesome name="volume-up" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          
          {showAnswer ? (
            <>
                <Text style={styles.meaning}>{currentItem.senses[0].definition}</Text>
                {isTranslating ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#28a745" />
                    <Text style={styles.loadingText}>Đang dịch...</Text>
                  </View>
                ) : translationError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{translationError}</Text>
                    <TouchableOpacity
                      style={styles.retryButton}
                      onPress={() => translateSenses(currentItem.word, currentItem.senses[0].definition)}
                    >
                      <Text style={styles.retryButtonText}>Thử lại</Text>
                    </TouchableOpacity>
                  </View>
                ) : translatedSenses ? (
                  <>
                    <Text style={styles.translatedText}>{translatedSenses}</Text>
                    <TouchableOpacity
                      style={styles.showExamplesButton}
                      onPress={() => {
                        setTranslatedSenses(null);
                        setTranslatedWord(null);
                      }}
                    >
                      <Text style={styles.showExamplesButtonText}>Xem ví dụ</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {currentItem.senses[0].examples.map((example, index) => (
                      <Text key={index} style={styles.example}>{example.x}</Text>
                    ))}
                    <TouchableOpacity
                      style={styles.translateButton}
                      onPress={() => translateSenses(currentItem.word, currentItem.senses[0].definition)}
                    >
                      <Text style={styles.translateButtonText}>Dịch</Text>
                    </TouchableOpacity>
                  </>
                )}
            </>
          ) : (
            <TouchableOpacity
              style={styles.showAnswerButton}
              onPress={() => setShowAnswer(true)}
            >
              <Text style={styles.showAnswerText}>Show Answer</Text>
            </TouchableOpacity>
          )}

          <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                  setShowAnswer(false);
                  setCurrentIndex((prev) => (prev - 1 + vocabularyItems.length) % vocabularyItems.length);
                }}
              >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                  setShowAnswer(false);
                  setCurrentIndex((prev) => (prev + 1) % vocabularyItems.length);
                }}
              >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Loading vocabulary data...</Text>
      )}
    </View>
  );
  
}
const lightColors = ['#FFFAE5', '#E5F6FF', '#E5FFF1', '#FFF0F5', '#F0FFF4'];

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360); // 0-360 độ
  return `hsl(${hue}, 100%, 90%)`; // HSL với độ sáng cao
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  topicsGrid: {
    padding: 10,
    marginBottom: 40
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    
    // Bóng đổ cải thiện
    shadowColor: '#666', // Xám trung tính, nhẹ nhàng hơn #000
    shadowOffset: { width: 0, height: 3 }, // Dịch xuống dưới một chút
    shadowOpacity: 0.1, // Tăng nhẹ độ mờ để bóng rõ hơn một chút
    shadowRadius: 6, // Tăng bán kính để bóng lan tỏa tự nhiên
    elevation: 4, // Tăng nhẹ để phù hợp với iOS
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },

  topicImage: {
    width: 380,
    height: 380,
    backgroundColor: '#f0f0f0',
    borderRadius: 12
  },
  topicInfo: {
    padding: 15,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  topicTitleVN: {
    fontSize: 14,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  pronunciationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  pronunciation: {
    alignItems: 'center',
  },
  pronunciationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  phoneticText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  playButtonUK: {
    backgroundColor: 'green',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonUS: {
    backgroundColor: 'red',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  meaning: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  example: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
    lineHeight: 22,
  },
  showAnswerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  showAnswerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  subtopicsContainer: {
    padding: 15,
  },
  subtopicCard: {
    backgroundColor: getRandomColor(),
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subtopicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtopicTitleVN: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  showExamplesButton: {
    backgroundColor: '#6c757d',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  showExamplesButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  translateButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  translateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  translatedText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  translatedWord: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
    fontStyle: 'italic',
  },
  wordVN: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
}); 