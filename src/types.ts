export type TopikLevel = '1-2' | '3-4' | '5-6';

export type PartOfSpeech = '名詞' | '動詞' | '形容詞' | '副詞';

export interface Vocabulary {
  korean: string;
  romanization: string;
  meaning: string;
  partOfSpeech?: PartOfSpeech;
  example: string;
  exampleTranslation: string;
}

export interface GrammarPoint {
  pattern: string;
  topikLevel?: string;   // e.g. "TOPIK 1급", "TOPIK 3급"
  explanation: string;
  example: string;
  exampleTranslation: string;
}

export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Article {
  id: string;
  level: TopikLevel;
  title: string;
  content: string;
  contentTranslation?: string;
  vocabulary: Vocabulary[];
  grammar: GrammarPoint[];
  questions: Question[];
  isAIGenerated?: boolean;
}

export interface LevelProgress {
  completedArticleIds: string[];
}

export type Progress = Record<TopikLevel, LevelProgress>;

export interface SavedVocabulary extends Vocabulary {
  id: string;
  savedAt: string;
  articleTitle: string;
  level: TopikLevel;
}

export interface SavedGrammar extends GrammarPoint {
  id: string;
  savedAt: string;
  articleTitle: string;
  level: TopikLevel;
}

export type AppView = 'reading' | 'vocab-library' | 'grammar-library' | 'writing' | 'conjugation' | 'grammar-guide';

export interface SampleAnswer {
  authorLabel: string;
  content: string;
  note?: string;
}

export interface WritingPractice {
  id: string;
  level: TopikLevel;
  questionType: string;
  title: string;
  instruction: string;
  context?: string;
  charRange?: string;
  sampleAnswers: SampleAnswer[];
}

export interface UserWriting {
  id: string;
  practiceId: string;
  practiceTitle: string;
  content: string;
  savedAt: string;
}
