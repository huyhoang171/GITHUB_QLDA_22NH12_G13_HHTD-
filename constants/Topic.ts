import { ImageSourcePropType } from 'react-native';
import { Topic } from '../app/types/navigation';
export const topics: Topic[] = [
  {
    id: 'Animal',
    title: 'Animal',
    titleVN: 'Động vật',
    image: require('../assets/png/png_topics/animals_1.png'),
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
    image: require('../assets/png/png_topics/appearance_1.png'),
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
    image: require('../assets/png/png_topics/communication.png'),
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
    image: require('../assets/png/png_topics/culture.png'),
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
    image: require('../assets/png/png_topics/food-and-drink.png'),
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
    image: require('../assets/png/png_topics/functions.png'),
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
    image: require('../assets/png/png_topics/health.png'),
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
    image: require('../assets/png/png_topics/homes-and-buildings.png'),
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
    image: require('../assets/png/png_topics/leisure.png'),
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
    image: require('../assets/png/png_topics/notions.png'),
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
    image: require('../assets/png/png_topics/people.png'),
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
    image: require('../assets/png/png_topics/politics-and-society.png'),
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
    image: require('../assets/png/png_topics/science-and-technology.png'),
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
    image: require('../assets/png/png_topics/sport.png'),
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
    image: require('../assets/png/png_topics/the-natural-world.png'),
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
    image: require('../assets/png/png_topics/time-and-space.png'),
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
    image: require('../assets/png/png_topics/travel.png'),
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
    image: require('../assets/png/png_topics/work-and-business.png'),
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
export const vocabularyFiles: { [key: string]: { [key: string]: any } } = {
  'Animal': {
    'animals': require('../assets/json/animal/animals.json'),
    'birds': require('../assets/json/animal/birds.json'),
    'fish_and_shellfish': require('../assets/json/animal/fish_and_shellfish.json'),
    'insects_worms_etc': require('../assets/json/animal/insects_worms_etc.json')
  },
  'Appearance': {
    'appearance': require('../assets/json/Appearance/appearance.json'),
    'body': require('../assets/json/Appearance/body.json'),
    'clothes_and_fashion': require('../assets/json/Appearance/clothes_and_fashion.json'),
    'colours_and_shapes': require('../assets/json/Appearance/colours_and_shapes.json')
  },
  'Communication': {
    'language': require('../assets/json/Communication/language.json'),
    'phones_email_and_the_internet': require('../assets/json/Communication/phones_email_and_the_internet.json')
  },
  'Culture': {
    'art': require('../assets/json/Culture/art.json'),
    'film_and_theatre': require('../assets/json/Culture/film_and_theatre.json'),
    'music': require('../assets/json/Culture/music.json'),
    'literature_and_writing': require('../assets/json/Culture/literature_and_writing.json'),
    'tv_radio_and_news': require('../assets/json/Culture/tv_radio_and_news.json')
  },
  'Food and drink': {
    'cooking_and_eating': require('../assets/json/Food and drink/cooking_and_eating.json'),
    'drinks': require('../assets/json/Food and drink/drinks.json'),
    'food': require('../assets/json/Food and drink/food.json')
  },
  'Functions': {
    'discussion_and_agreement': require('../assets/json/Functions/discussion_and_agreement.json'),
    'doubt-guessing_and_certainty': require('../assets/json/Functions/doubt-guessing_and_certainty.json'),
    'opinion_and_argument': require('../assets/json/Functions/opinion_and_argument.json'),
    'permission_and_obligation': require('../assets/json/Functions/permission_and_obligation.json'),
    'preferences_and_decisions': require('../assets/json/Functions/preferences_and_decisions.json'),
    'suggestions_and_advice': require('../assets/json/Functions/suggestions_and_advice.json')
  },
  'Health': {
    'disability': require('../assets/json/Health/disability.json'),
    'health_and_fitness': require('../assets/json/Health/health_and_fitness.json'),
    'health_problems': require('../assets/json/Health/health_problems.json'),
    'healthcare': require('../assets/json/Health/healthcare.json'),
    'mental_health': require('../assets/json/Health/mental_health.json')
  },
  'Homes and buildings': {
    'houses_and_homes': require('../assets/json/Homes and buildings/houses_and_homes.json'),
    'buildings': require('../assets/json/Homes and buildings/buildings.json'),
    'gardens': require('../assets/json/Homes and buildings/gardens.json')
  },
  'Leisure': {
    'games_and_toys': require('../assets/json/Leisure/games_and_toys.json'),
    'hobbies': require('../assets/json/Leisure/hobbies.json'),
    'shopping': require('../assets/json/Leisure/shopping.json')
  },
  'Notions': {
    'change_cause_and_effect': require('../assets/json/Notions/change_cause_and_effect.json'),
    'danger': require('../assets/json/Notions/danger.json'),
    'difficulty_and_failure': require('../assets/json/Notions/difficulty_and_failure.json'),
    'success': require('../assets/json/Notions/success.json')
  },
  'People': {
    'education': require('../assets/json/People/education.json'),
    'family_and_relationships': require('../assets/json/People/family_and_relationships.json'),
    'feelings': require('../assets/json/People/feelings.json'),
    'life_stages': require('../assets/json/People/life_stages.json'),
    'personal_qualities': require('../assets/json/People/personal_qualities.json')
  },
  'Politics and society': {
    'crime_and_punishment': require('../assets/json/Politics and society/crime_and_punishment.json'),
    'law_and_justice': require('../assets/json/Politics and society/law_and_justice.json'),
    'people_in_society': require('../assets/json/Politics and society/people_in_society.json'),
    'politics': require('../assets/json/Politics and society/politics.json'),
    'religion_and_festivals': require('../assets/json/Politics and society/religion_and_festivals.json'),
    'social_issues': require('../assets/json/Politics and society/social_issues.json')
  },
  'Science and technology': {
    'biology': require('../assets/json/Science and technology/biology.json'),
    'computers': require('../assets/json/Science and technology/computers.json'),
    'engineering': require('../assets/json/Science and technology/engineering.json'),
    'maths_and_measurement': require('../assets/json/Science and technology/maths_and_measurement.json'),
    'physics_and_chemistry': require('../assets/json/Science and technology/physics_and_chemistry.json'),
    'scientific_research': require('../assets/json/Science and technology/scientific_research.json')
  },
  'Sport': {
    'sports_ball_and_racket_sports': require('../assets/json/Sport/sports_ball_and_racket_sports.json'),
    'sports_other_sports': require('../assets/json/Sport/sports_other_sports.json'),
    'sports_water_sports': require('../assets/json/Sport/sports_water_sports.json')
  },
  'The natural world': {
    'farming': require('../assets/json/The natural world/farming.json'),
    'geography': require('../assets/json/The natural world/geography.json'),
    'plants_and_trees': require('../assets/json/The natural world/plants_and_trees.json'),
    'the_environment': require('../assets/json/The natural world/the_environment.json'),
    'weather': require('../assets/json/The natural world/weather.json')
  },
  'Time and space': {
    'history': require('../assets/json/Time and space/history.json'),
    'space': require('../assets/json/Time and space/space.json'),
    'time': require('../assets/json/Time and space/time.json')
  },
  'Travel': {
    'holidays': require('../assets/json/Travel/holidays.json'),
    'transport_by_air': require('../assets/json/Travel/transport_by_air.json'),
    'transport_by_bus_and_train': require('../assets/json/Travel/transport_by_bus_and_train.json'),
    'transport_by_car_or_lorry': require('../assets/json/Travel/transport_by_car_or_lorry.json'),
    'transport_by_water': require('../assets/json/Travel/transport_by_water.json')
  },
  'Work and business': {
    'business': require('../assets/json/Work and business/business.json'),
    'jobs': require('../assets/json/Work and business/jobs.json'),
    'money': require('../assets/json/Work and business/money.json'),
    'working_life': require('../assets/json/Work and business/working_life.json')
  }
};