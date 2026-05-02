import { useState, useEffect, useCallback } from 'react';
import type { SavedVocabulary, SavedGrammar, Vocabulary, GrammarPoint, TopikLevel } from '../types';
import { presetArticles } from '../data/articles';

const VOCAB_KEY = 'topik_saved_vocab';
const GRAMMAR_KEY = 'topik_saved_grammar';

// Build a lookup map: korean word → partOfSpeech from preset articles
const posLookup = new Map<string, SavedVocabulary['partOfSpeech']>();
for (const article of presetArticles) {
  for (const v of article.vocabulary) {
    if (v.partOfSpeech && !posLookup.has(v.korean)) {
      posLookup.set(v.korean, v.partOfSpeech);
    }
  }
}

function loadFromStorage<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

// Backfill partOfSpeech for saved vocab items that predate the field
function migrateSavedVocab(items: SavedVocabulary[]): SavedVocabulary[] {
  return items.map(item =>
    item.partOfSpeech ? item : { ...item, partOfSpeech: posLookup.get(item.korean) }
  );
}

export function useLibrary() {
  const [savedVocab, setSavedVocab] = useState<SavedVocabulary[]>(() =>
    migrateSavedVocab(loadFromStorage(VOCAB_KEY))
  );
  const [savedGrammar, setSavedGrammar] = useState<SavedGrammar[]>(() => loadFromStorage(GRAMMAR_KEY));

  useEffect(() => {
    localStorage.setItem(VOCAB_KEY, JSON.stringify(savedVocab));
  }, [savedVocab]);

  useEffect(() => {
    localStorage.setItem(GRAMMAR_KEY, JSON.stringify(savedGrammar));
  }, [savedGrammar]);

  const saveVocab = useCallback((vocab: Vocabulary, articleTitle: string, level: TopikLevel) => {
    const id = `${vocab.korean}::${articleTitle}`;
    setSavedVocab(prev => {
      if (prev.some(v => v.id === id)) return prev;
      return [...prev, { ...vocab, id, savedAt: new Date().toISOString(), articleTitle, level }];
    });
  }, []);

  const removeVocab = useCallback((id: string) => {
    setSavedVocab(prev => prev.filter(v => v.id !== id));
  }, []);

  const isVocabSaved = useCallback(
    (korean: string, articleTitle: string) =>
      savedVocab.some(v => v.id === `${korean}::${articleTitle}`),
    [savedVocab]
  );

  const saveGrammar = useCallback((grammar: GrammarPoint, articleTitle: string, level: TopikLevel) => {
    const id = `${grammar.pattern}::${articleTitle}`;
    setSavedGrammar(prev => {
      if (prev.some(g => g.id === id)) return prev;
      return [...prev, { ...grammar, id, savedAt: new Date().toISOString(), articleTitle, level }];
    });
  }, []);

  const removeGrammar = useCallback((id: string) => {
    setSavedGrammar(prev => prev.filter(g => g.id !== id));
  }, []);

  const isGrammarSaved = useCallback(
    (pattern: string, articleTitle: string) =>
      savedGrammar.some(g => g.id === `${pattern}::${articleTitle}`),
    [savedGrammar]
  );

  return {
    savedVocab,
    savedGrammar,
    saveVocab,
    removeVocab,
    isVocabSaved,
    saveGrammar,
    removeGrammar,
    isGrammarSaved,
  };
}
