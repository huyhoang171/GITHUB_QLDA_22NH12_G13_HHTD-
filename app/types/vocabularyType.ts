export interface VocabularyItem {
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
  
  export interface Topic {
    id: string;
    title: string;
    titleVN: string;
    image: any;
    subtopics?: { id: string; title: string; titleVN: string }[];
  }