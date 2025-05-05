export interface Lesson {
  id: number;
  title: string;
  subTitle: string;
  path: string;
  image?: any; 
}

export interface CategoryData {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  image: any;
  lessons: Lesson[];
}

export interface GrammarTopic {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export type RootStackParamList = {
  Grammar: undefined;
  BasicGrammar: { category: CategoryData };
  TopicDetail: { topic: GrammarTopic };
}; 