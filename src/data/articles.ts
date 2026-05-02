import type { Article } from '../types';

export const presetArticles: Article[] = [
  // ───────────────── TOPIK 1-2 ─────────────────
  {
    id: '1-2-01',
    level: '1-2',
    title: '나의 하루',
    content:
      '저는 아침 일찍 일어납니다. 세수를 하고 밥을 먹습니다. 학교에는 버스로 갑니다. 학교에서 한국어를 공부합니다. 점심에는 친구들과 밥을 먹습니다. 오후에는 도서관에서 숙제를 합니다. 저녁에는 집에 돌아와서 쉽니다. 밤에는 책을 읽고 잡니다.',
    contentTranslation:
      '我每天早上很早起床。洗完臉後吃飯。搭公車去學校。在學校學習韓語。午餐和朋友們一起吃。下午在圖書館做作業。傍晚回家後休息。晚上看書然後睡覺。',
    vocabulary: [
      { korean: '일찍', romanization: 'iljjik', meaning: '早', partOfSpeech: '副詞', example: '아침에 일찍 일어납니다.', exampleTranslation: '早上很早起床。' },
      { korean: '세수', romanization: 'sessu', meaning: '洗臉', partOfSpeech: '名詞', example: '아침에 세수를 합니다.', exampleTranslation: '早上洗臉。' },
      { korean: '버스', romanization: 'beoseu', meaning: '公車', partOfSpeech: '名詞', example: '버스로 학교에 갑니다.', exampleTranslation: '搭公車去學校。' },
      { korean: '공부하다', romanization: 'gongbuhada', meaning: '學習', partOfSpeech: '動詞', example: '한국어를 공부합니다.', exampleTranslation: '學習韓語。' },
      { korean: '도서관', romanization: 'doseogwan', meaning: '圖書館', partOfSpeech: '名詞', example: '도서관에서 공부합니다.', exampleTranslation: '在圖書館學習。' },
      { korean: '숙제', romanization: 'sukje', meaning: '作業', partOfSpeech: '名詞', example: '숙제를 합니다.', exampleTranslation: '做作業。' },
      { korean: '저녁', romanization: 'jeonyeok', meaning: '傍晚', partOfSpeech: '名詞', example: '저녁에 집에 옵니다.', exampleTranslation: '傍晚回家。' },
      { korean: '쉬다', romanization: 'swida', meaning: '休息', partOfSpeech: '動詞', example: '집에서 쉽니다.', exampleTranslation: '在家休息。' },
      { korean: '책', romanization: 'chaek', meaning: '書', partOfSpeech: '名詞', example: '책을 읽습니다.', exampleTranslation: '看書。' },
      { korean: '자다', romanization: 'jada', meaning: '睡覺', partOfSpeech: '動詞', example: '밤에 잡니다.', exampleTranslation: '晚上睡覺。' },
    ],
    grammar: [
      { pattern: 'N(으)로', explanation: '表示交通工具或方式，「搭～、用～」。', example: '버스로 갑니다.', exampleTranslation: '搭公車去。' },
      { pattern: 'V-고', explanation: '連結兩個動作，表示「做～然後～」。', example: '세수를 하고 밥을 먹습니다.', exampleTranslation: '洗完臉然後吃飯。' },
      { pattern: 'N에서', explanation: '表示動作發生的場所，「在～地方」。', example: '도서관에서 공부합니다.', exampleTranslation: '在圖書館學習。' },
      { pattern: 'V-아/어서', explanation: '連接先後發生的動作，「做了～之後～」。', example: '집에 돌아와서 쉽니다.', exampleTranslation: '回家之後休息。' },
    ],
    questions: [
      { question: '이 사람은 학교에 어떻게 갑니까?', options: ['걸어서', '버스로', '지하철로', '자전거로'], answerIndex: 1 },
      { question: '점심에 누구와 밥을 먹습니까?', options: ['혼자', '가족과', '친구들과', '선생님과'], answerIndex: 2 },
      { question: '오후에 어디에서 숙제를 합니까?', options: ['집에서', '학교에서', '도서관에서', '카페에서'], answerIndex: 2 },
      { question: '밤에 자기 전에 무엇을 합니까?', options: ['운동', '요리', '책 읽기', 'TV 보기'], answerIndex: 2 },
    ],
  },
  {
    id: '1-2-02',
    level: '1-2',
    title: '우리 가족',
    content:
      '우리 가족은 다섯 명입니다. 아버지, 어머니, 언니, 남동생, 그리고 저입니다. 아버지는 회사원입니다. 매일 일찍 출근하십니다. 어머니는 요리를 잘 하십니다. 언니는 대학생입니다. 서울대학교에 다닙니다. 남동생은 중학생입니다. 축구를 좋아합니다. 우리 가족은 주말에 함께 등산을 갑니다.',
    contentTranslation:
      '我的家人有五個人。爸爸、媽媽、姐姐、弟弟和我。爸爸是上班族，每天很早去上班。媽媽很會做料理。姐姐是大學生，就讀首爾大學。弟弟是國中生，喜歡踢足球。我的家人週末一起去爬山。',
    vocabulary: [
      { korean: '가족', romanization: 'gajok', meaning: '家人', partOfSpeech: '名詞', example: '우리 가족은 다섯 명입니다.', exampleTranslation: '我的家人有五個人。' },
      { korean: '명', romanization: 'myeong', meaning: '個（計量人數）', partOfSpeech: '名詞', example: '세 명이 있습니다.', exampleTranslation: '有三個人。' },
      { korean: '회사원', romanization: 'hoesawon', meaning: '上班族', partOfSpeech: '名詞', example: '아버지는 회사원입니다.', exampleTranslation: '爸爸是上班族。' },
      { korean: '출근하다', romanization: 'chulgeunhada', meaning: '上班', partOfSpeech: '動詞', example: '매일 출근합니다.', exampleTranslation: '每天上班。' },
      { korean: '요리', romanization: 'yori', meaning: '料理/烹飪', partOfSpeech: '名詞', example: '어머니는 요리를 잘 합니다.', exampleTranslation: '媽媽很會做料理。' },
      { korean: '대학생', romanization: 'daehaksaeng', meaning: '大學生', partOfSpeech: '名詞', example: '언니는 대학생입니다.', exampleTranslation: '姐姐是大學生。' },
      { korean: '중학생', romanization: 'junghaksaeng', meaning: '國中生', partOfSpeech: '名詞', example: '남동생은 중학생입니다.', exampleTranslation: '弟弟是國中生。' },
      { korean: '축구', romanization: 'chukgu', meaning: '足球', partOfSpeech: '名詞', example: '축구를 좋아합니다.', exampleTranslation: '喜歡踢足球。' },
      { korean: '주말', romanization: 'jumal', meaning: '週末', partOfSpeech: '名詞', example: '주말에 등산을 갑니다.', exampleTranslation: '週末去爬山。' },
      { korean: '등산', romanization: 'deungsan', meaning: '登山/爬山', partOfSpeech: '名詞', example: '등산을 좋아합니다.', exampleTranslation: '喜歡爬山。' },
    ],
    grammar: [
      { pattern: 'N은/는 N입니다', explanation: '表示「～是～」，最基本的陳述句型。', example: '아버지는 회사원입니다.', exampleTranslation: '爸爸是上班族。' },
      { pattern: 'V-고 있습니다', explanation: '表示正在進行的動作，「正在～」。', example: '한국어를 공부하고 있습니다.', exampleTranslation: '正在學習韓語。' },
      { pattern: 'N을/를 잘 하다', explanation: '表示擅長某事，「很會做～」。', example: '요리를 잘 합니다.', exampleTranslation: '很會做料理。' },
      { pattern: 'N에 다니다', explanation: '表示定期前往某地，「在～就讀/工作」。', example: '서울대학교에 다닙니다.', exampleTranslation: '就讀首爾大學。' },
    ],
    questions: [
      { question: '이 사람의 가족은 몇 명입니까?', options: ['세 명', '네 명', '다섯 명', '여섯 명'], answerIndex: 2 },
      { question: '아버지는 무슨 일을 합니까?', options: ['선생님', '의사', '회사원', '경찰관'], answerIndex: 2 },
      { question: '언니는 어느 학교에 다닙니까?', options: ['중학교', '고등학교', '서울대학교', '연세대학교'], answerIndex: 2 },
      { question: '가족은 주말에 함께 무엇을 합니까?', options: ['축구', '수영', '등산', '요리'], answerIndex: 2 },
    ],
  },

  // ───────────────── TOPIK 3-4 ─────────────────
  {
    id: '3-4-01',
    level: '3-4',
    title: '한국의 사계절',
    content:
      '한국은 사계절이 뚜렷한 나라입니다. 봄에는 꽃이 피고 날씨가 따뜻해져서 사람들이 공원에 많이 나옵니다. 특히 벚꽃이 피는 시기에는 전국에서 꽃구경을 즐기는 사람들로 붐빕니다. 여름은 무덥고 습하며, 7월과 8월에는 장마 기간이 있어 비가 많이 옵니다. 가을은 하늘이 높고 맑으며 단풍이 아름다워 여행하기 좋은 계절입니다. 겨울은 춥고 눈이 많이 오는데, 스키장을 찾는 사람들이 늘어납니다. 계절마다 다른 매력을 가진 한국은 언제 방문해도 즐거운 경험을 할 수 있는 곳입니다.',
    contentTranslation:
      '韓國是四季分明的國家。春天花朵盛開，天氣變暖，許多人走出公園。尤其在櫻花盛開的時期，全國各地享受賞花的人們熙熙攘攘。夏天悶熱潮濕，7月和8月有梅雨季節，雨量充沛。秋天天空高遠晴朗，楓葉美麗，是適合旅行的季節。冬天寒冷多雪，前往滑雪場的人增多。每個季節都有不同魅力的韓國，無論何時造訪都能享受到多樣的樂趣。',
    vocabulary: [
      { korean: '사계절', romanization: 'sagyejeol', meaning: '四季', partOfSpeech: '名詞', example: '한국은 사계절이 뚜렷합니다.', exampleTranslation: '韓國四季分明。' },
      { korean: '뚜렷하다', romanization: 'tturyeotada', meaning: '分明/鮮明', partOfSpeech: '形容詞', example: '사계절이 뚜렷합니다.', exampleTranslation: '四季分明。' },
      { korean: '벚꽃', romanization: 'beotkkot', meaning: '櫻花', partOfSpeech: '名詞', example: '벚꽃이 아름답게 핍니다.', exampleTranslation: '櫻花美麗地盛開。' },
      { korean: '붐비다', romanization: 'bumbida', meaning: '擁擠/熱鬧', partOfSpeech: '動詞', example: '공원이 사람들로 붐빕니다.', exampleTranslation: '公園擠滿了人。' },
      { korean: '장마', romanization: 'jangma', meaning: '梅雨季', partOfSpeech: '名詞', example: '장마 기간에 비가 많이 옵니다.', exampleTranslation: '梅雨季節下很多雨。' },
      { korean: '단풍', romanization: 'danpung', meaning: '楓葉/紅葉', partOfSpeech: '名詞', example: '가을에 단풍이 아름답습니다.', exampleTranslation: '秋天紅葉很美麗。' },
      { korean: '맑다', romanization: 'makda', meaning: '晴朗', partOfSpeech: '形容詞', example: '가을 하늘이 맑습니다.', exampleTranslation: '秋天天空晴朗。' },
      { korean: '스키장', romanization: 'seukijang', meaning: '滑雪場', partOfSpeech: '名詞', example: '스키장을 찾는 사람이 많습니다.', exampleTranslation: '去滑雪場的人很多。' },
      { korean: '매력', romanization: 'maeryeok', meaning: '魅力', partOfSpeech: '名詞', example: '한국은 매력이 있습니다.', exampleTranslation: '韓國很有魅力。' },
      { korean: '경험', romanization: 'gyeongheom', meaning: '經驗/體驗', partOfSpeech: '名詞', example: '즐거운 경험을 합니다.', exampleTranslation: '有愉快的體驗。' },
    ],
    grammar: [
      { pattern: 'V-아/어져서', explanation: '表示狀態變化後產生的結果，「因為變得～所以～」。', example: '날씨가 따뜻해져서 사람들이 나옵니다.', exampleTranslation: '因為天氣變暖，所以人們出來了。' },
      { pattern: 'V-는 시기에는', explanation: '表示「在～的時期」，說明特定時間點的情況。', example: '벚꽃이 피는 시기에는 붐빕니다.', exampleTranslation: '在櫻花盛開的時期非常熱鬧。' },
      { pattern: 'A-며', explanation: '連結兩個並列的形容詞描述，「又～又～」。', example: '무덥고 습하며 비가 많이 옵니다.', exampleTranslation: '又悶又濕，而且雨很多。' },
      { pattern: 'V-기 좋다', explanation: '表示「適合做～」、「做～很好」。', example: '여행하기 좋은 계절입니다.', exampleTranslation: '是適合旅行的季節。' },
    ],
    questions: [
      { question: '한국에서 벚꽃이 피는 계절은 언제입니까?', options: ['봄', '여름', '가을', '겨울'], answerIndex: 0 },
      { question: '한국의 여름에 대한 설명으로 맞는 것은?', options: ['건조하고 시원하다', '무덥고 장마가 있다', '눈이 많이 온다', '단풍이 아름답다'], answerIndex: 1 },
      { question: '겨울에 사람들이 많이 찾는 곳은?', options: ['공원', '해수욕장', '스키장', '산'], answerIndex: 2 },
      { question: '이 글에서 가을 날씨를 설명한 것은?', options: ['무덥고 습하다', '눈이 많이 온다', '하늘이 높고 맑다', '비가 많이 온다'], answerIndex: 2 },
    ],
  },
  {
    id: '3-4-02',
    level: '3-4',
    title: '한국 음식 문화',
    content:
      '한국 음식은 건강에 좋은 재료와 다양한 조리 방법으로 세계적으로 유명합니다. 대표적인 한국 음식으로는 김치, 비빔밥, 삼겹살 등이 있습니다. 특히 김치는 발효 식품으로 유산균이 풍부하여 건강에 매우 좋습니다. 한국에서는 밥상에 다양한 반찬이 함께 나오는 것이 특징입니다. 최근에는 한류의 영향으로 한국 음식에 대한 관심이 전 세계적으로 높아지고 있습니다. 한국의 음식 문화는 단순히 먹는 것에 그치지 않고, 함께 나누어 먹는 공동체 문화를 반영합니다.',
    contentTranslation:
      '韓國料理以有益健康的食材和多樣的烹調方式聞名世界。代表性的韓國料理有泡菜、拌飯、五花肉等。尤其泡菜是發酵食品，富含乳酸菌，對健康非常有益。韓國的特色是飯桌上會搭配各種小菜。近年來受韓流影響，全世界對韓國料理的關注度越來越高。韓國的飲食文化不僅僅是吃東西，也反映了共同分享的社群文化。',
    vocabulary: [
      { korean: '재료', romanization: 'jaeryo', meaning: '食材/材料', partOfSpeech: '名詞', example: '건강에 좋은 재료를 사용합니다.', exampleTranslation: '使用對健康有益的食材。' },
      { korean: '조리', romanization: 'jori', meaning: '烹調', partOfSpeech: '名詞', example: '다양한 조리 방법이 있습니다.', exampleTranslation: '有各種烹調方法。' },
      { korean: '발효', romanization: 'balhyo', meaning: '發酵', partOfSpeech: '名詞', example: '김치는 발효 식품입니다.', exampleTranslation: '泡菜是發酵食品。' },
      { korean: '유산균', romanization: 'yusangyun', meaning: '乳酸菌', partOfSpeech: '名詞', example: '유산균이 풍부합니다.', exampleTranslation: '富含乳酸菌。' },
      { korean: '반찬', romanization: 'banchan', meaning: '小菜/配菜', partOfSpeech: '名詞', example: '밥상에 반찬이 많이 나옵니다.', exampleTranslation: '飯桌上有很多小菜。' },
      { korean: '한류', romanization: 'hallyu', meaning: '韓流', partOfSpeech: '名詞', example: '한류의 영향이 큽니다.', exampleTranslation: '韓流的影響很大。' },
      { korean: '관심', romanization: 'gwansim', meaning: '關注/興趣', partOfSpeech: '名詞', example: '한국 음식에 관심이 높아졌습니다.', exampleTranslation: '對韓國飲食的關注提高了。' },
      { korean: '단순히', romanization: 'dansunhi', meaning: '單純地/僅僅', partOfSpeech: '副詞', example: '단순히 먹는 것이 아닙니다.', exampleTranslation: '不僅僅是吃東西。' },
      { korean: '나누다', romanization: 'nanuda', meaning: '分享', partOfSpeech: '動詞', example: '함께 나누어 먹습니다.', exampleTranslation: '一起分享著吃。' },
      { korean: '반영하다', romanization: 'banyeonghada', meaning: '反映', partOfSpeech: '動詞', example: '문화를 반영합니다.', exampleTranslation: '反映文化。' },
    ],
    grammar: [
      { pattern: 'N(으)로 유명하다', explanation: '表示「以～聞名」。', example: '한국 음식은 건강으로 유명합니다.', exampleTranslation: '韓國飲食以健康聞名。' },
      { pattern: 'V-아/어 풍부하다', explanation: '表示「因為～而豐富」，說明程度很高。', example: '유산균이 풍부하여 건강에 좋습니다.', exampleTranslation: '因富含乳酸菌，對健康有益。' },
      { pattern: 'V-고 있습니다', explanation: '表示正在進行或持續的動作，「正在～」。', example: '관심이 높아지고 있습니다.', exampleTranslation: '關注正在持續提高。' },
      { pattern: 'V-에 그치지 않고', explanation: '表示「不僅限於～」，「不只是～」。', example: '먹는 것에 그치지 않습니다.', exampleTranslation: '不僅僅是吃東西。' },
    ],
    questions: [
      { question: '김치의 특징으로 맞는 것은?', options: ['단 음식이다', '발효 식품이다', '육류 음식이다', '서양 음식이다'], answerIndex: 1 },
      { question: '한국 밥상의 특징은?', options: ['음식 종류가 적다', '반찬이 함께 나온다', '주로 빵을 먹는다', '음식이 달다'], answerIndex: 1 },
      { question: '최근 한국 음식이 세계적으로 유명해진 이유는?', options: ['가격이 싸서', '맛이 없어서', '한류의 영향', '영양가가 없어서'], answerIndex: 2 },
      { question: '한국 음식 문화가 반영하는 것은?', options: ['개인주의 문화', '공동체 문화', '서양 문화', '경쟁 문화'], answerIndex: 1 },
    ],
  },

  // ───────────────── TOPIK 5-6 ─────────────────
  {
    id: '5-6-01',
    level: '5-6',
    title: '디지털 기술과 현대 사회',
    content:
      '디지털 기술의 급속한 발전은 현대 사회의 모든 영역에 걸쳐 혁명적인 변화를 가져오고 있습니다. 인공지능과 빅데이터 기술의 융합으로 의료, 교육, 금융 등 다양한 분야에서 전례 없는 혁신이 이루어지고 있습니다. 특히 인공지능 기반의 의료 진단 시스템은 초기 암 발견율을 획기적으로 높임으로써 수많은 생명을 구하는 데 기여하고 있습니다. 그러나 디지털화가 가속화될수록 개인 정보 보호 문제와 디지털 격차로 인한 사회적 불평등이 심화될 우려도 있습니다. 지속 가능한 디지털 사회를 구현하기 위해서는 기술 혁신과 더불어 윤리적, 사회적 규범의 정립이 필요합니다. 결국 디지털 기술은 인류 전체의 이익을 위해 활용되어야 할 것입니다.',
    contentTranslation:
      '數位技術的急速發展正在現代社會的各個領域帶來革命性的變化。隨著人工智慧與大數據技術的融合，在醫療、教育、金融等各種領域正實現前所未有的創新。尤其人工智慧醫療診斷系統藉由大幅提高早期癌症發現率，正為拯救無數生命做出貢獻。然而，數位化越加速，也有個人資訊保護問題和因數位落差導致社會不平等加深的隱憂。為了實現可持續的數位社會，除了技術創新之外，還需要建立倫理和社會規範。最終，數位技術應為全人類的利益而被運用。',
    vocabulary: [
      { korean: '급속한', romanization: 'geupsokan', meaning: '急速的', partOfSpeech: '形容詞', example: '급속한 발전이 이루어졌습니다.', exampleTranslation: '實現了急速的發展。' },
      { korean: '혁명적', romanization: 'hyeongmyeongjeok', meaning: '革命性的', partOfSpeech: '名詞', example: '혁명적인 변화가 일어났습니다.', exampleTranslation: '發生了革命性的變化。' },
      { korean: '융합', romanization: 'yunghap', meaning: '融合', partOfSpeech: '名詞', example: '두 기술이 융합됩니다.', exampleTranslation: '兩種技術融合。' },
      { korean: '전례 없는', romanization: 'jeollye eomneun', meaning: '前所未有的', partOfSpeech: '形容詞', example: '전례 없는 혁신입니다.', exampleTranslation: '是前所未有的創新。' },
      { korean: '획기적', romanization: 'hoekgijeok', meaning: '劃時代的/突破性的', partOfSpeech: '名詞', example: '획기적인 방법을 개발했습니다.', exampleTranslation: '開發了突破性的方法。' },
      { korean: '가속화', romanization: 'gaseokwa', meaning: '加速化', partOfSpeech: '名詞', example: '디지털화가 가속화됩니다.', exampleTranslation: '數位化加速進行。' },
      { korean: '격차', romanization: 'gyeokcha', meaning: '落差/差距', partOfSpeech: '名詞', example: '디지털 격차가 심각합니다.', exampleTranslation: '數位落差很嚴重。' },
      { korean: '불평등', romanization: 'bulpyeongdeung', meaning: '不平等', partOfSpeech: '名詞', example: '사회적 불평등이 심화됩니다.', exampleTranslation: '社會不平等加深。' },
      { korean: '구현하다', romanization: 'guhyeonhada', meaning: '實現/體現', partOfSpeech: '動詞', example: '지속 가능한 사회를 구현합니다.', exampleTranslation: '實現可持續的社會。' },
      { korean: '윤리적', romanization: 'yunnijeok', meaning: '倫理的/道德的', partOfSpeech: '名詞', example: '윤리적 규범이 필요합니다.', exampleTranslation: '需要倫理規範。' },
    ],
    grammar: [
      { pattern: 'V-(으)ㄹ수록', explanation: '表示「越～越～」，隨著某狀態加深，另一結果也隨之變化。', example: '디지털화가 가속화될수록 문제가 심화됩니다.', exampleTranslation: '數位化越加速，問題就越嚴重。' },
      { pattern: 'V-음으로써', explanation: '表示手段或方法，「藉由做～」、「通過做～」。', example: '발견율을 높임으로써 생명을 구합니다.', exampleTranslation: '藉由提高發現率來拯救生命。' },
      { pattern: 'V-기 위해서는', explanation: '表示目的條件，「為了～必須～」。', example: '구현하기 위해서는 노력이 필요합니다.', exampleTranslation: '為了實現，需要努力。' },
      { pattern: 'N와/과 더불어', explanation: '表示「與～一起」、「伴隨著～」。', example: '혁신과 더불어 규범이 필요합니다.', exampleTranslation: '伴隨著創新，需要規範。' },
    ],
    questions: [
      { question: '인공지능 의료 시스템이 기여하는 것은?', options: ['의료비 절감', '초기 암 발견율 향상', '병원 건설', '의사 수 감소'], answerIndex: 1 },
      { question: '디지털화가 가속화될 때 우려되는 문제가 아닌 것은?', options: ['개인 정보 보호 문제', '디지털 격차', '사회적 불평등', '의료 기술 발전'], answerIndex: 3 },
      { question: '지속 가능한 디지털 사회를 위해 필요한 것은?', options: ['기술만 발전시키면 된다', '기술 혁신과 윤리적 규범 정립', '디지털 기술 사용 금지', '개인의 노력만으로 가능하다'], answerIndex: 1 },
      { question: '디지털 기술이 활용되어야 하는 목적은?', options: ['기업 이익 극대화', '특정 계층의 이익', '인류 전체의 이익', '국가 경쟁력 강화'], answerIndex: 2 },
    ],
  },
  {
    id: '5-6-02',
    level: '5-6',
    title: '환경 위기와 지속 가능한 미래',
    content:
      '기후 변화로 인한 환경 위기는 현재 인류가 직면한 가장 시급한 과제 중 하나로 인식되고 있습니다. 산업화 이후 급증한 온실가스 배출은 지구 평균 기온을 끌어올려 극단적인 기상 현상을 초래하고 있습니다. 해수면 상승, 생물 다양성 손실, 식량 안보 위협 등은 국가 간 협력 없이는 해결하기 어려운 범지구적 문제입니다. 이러한 위기를 극복하기 위해 국제 사회는 탄소 중립을 향한 다양한 정책을 시행하고 있으나, 경제 성장과의 양립을 둘러싼 논쟁은 여전히 진행 중입니다. 지속 가능한 미래를 위해서는 재생 가능 에너지 확대, 친환경 기술 개발, 그리고 소비 패턴의 근본적인 변화가 요구됩니다. 개인, 기업, 정부 모두가 책임 의식을 갖고 협력할 때 비로소 지속 가능한 지구를 다음 세대에게 물려줄 수 있을 것입니다.',
    contentTranslation:
      '由氣候變遷引起的環境危機，被認為是目前人類面臨的最緊迫課題之一。工業化以來急劇增加的溫室氣體排放，正在拉高地球平均氣溫，引起極端氣象現象。海平面上升、生物多樣性損失、糧食安全威脅等，是沒有國家間合作就難以解決的全球性問題。為了克服這些危機，國際社會正在推行各種邁向碳中和的政策，但圍繞與經濟成長兼容的爭論仍在持續。為了實現可持續的未來，需要擴大可再生能源、開發環保技術，以及消費模式的根本性改變。只有個人、企業、政府都具備責任意識並共同合作，才能將可持續的地球傳承給下一代。',
    vocabulary: [
      { korean: '직면하다', romanization: 'jingmyeonhada', meaning: '面臨', partOfSpeech: '動詞', example: '위기에 직면했습니다.', exampleTranslation: '面臨了危機。' },
      { korean: '온실가스', romanization: 'onsil gaseu', meaning: '溫室氣體', partOfSpeech: '名詞', example: '온실가스 배출을 줄여야 합니다.', exampleTranslation: '必須減少溫室氣體排放。' },
      { korean: '초래하다', romanization: 'choraehaда', meaning: '導致/引起', partOfSpeech: '動詞', example: '기후 변화를 초래합니다.', exampleTranslation: '導致氣候變遷。' },
      { korean: '해수면', romanization: 'haesu myeon', meaning: '海平面', partOfSpeech: '名詞', example: '해수면이 상승하고 있습니다.', exampleTranslation: '海平面正在上升。' },
      { korean: '생물 다양성', romanization: 'saengmul dayangseong', meaning: '生物多樣性', partOfSpeech: '名詞', example: '생물 다양성이 감소합니다.', exampleTranslation: '生物多樣性減少。' },
      { korean: '탄소 중립', romanization: 'tanso jungnip', meaning: '碳中和', partOfSpeech: '名詞', example: '탄소 중립을 목표로 합니다.', exampleTranslation: '以碳中和為目標。' },
      { korean: '양립', romanization: 'yangnip', meaning: '兼容/並立', partOfSpeech: '名詞', example: '경제 성장과의 양립이 어렵습니다.', exampleTranslation: '與經濟成長的兼容很困難。' },
      { korean: '재생 가능', romanization: 'jaeseong ganeung', meaning: '可再生的', partOfSpeech: '形容詞', example: '재생 가능 에너지가 중요합니다.', exampleTranslation: '可再生能源很重要。' },
      { korean: '근본적', romanization: 'geunbonjeok', meaning: '根本性的', partOfSpeech: '名詞', example: '근본적인 변화가 필요합니다.', exampleTranslation: '需要根本性的改變。' },
      { korean: '물려주다', romanization: 'mullyeojuda', meaning: '傳承/留下給', partOfSpeech: '動詞', example: '다음 세대에게 물려줍니다.', exampleTranslation: '傳承給下一代。' },
    ],
    grammar: [
      { pattern: 'N(으)로 인한', explanation: '表示原因，「由於～引起的」、「因為～導致的」。', example: '기후 변화로 인한 피해가 큽니다.', exampleTranslation: '由氣候變遷引起的損害很大。' },
      { pattern: 'N 없이는 V-기 어렵다', explanation: '表示「沒有～就很難做到～」，強調必要條件。', example: '협력 없이는 해결하기 어렵습니다.', exampleTranslation: '沒有合作就很難解決。' },
      { pattern: 'N을/를 둘러싼', explanation: '表示「圍繞著～的」，常用於爭議或討論的主題。', example: '경제 성장을 둘러싼 논쟁입니다.', exampleTranslation: '圍繞著經濟成長的爭論。' },
      { pattern: 'V-(으)ㄹ 때 비로소', explanation: '表示「只有在～時才～」，強調某條件達成後的結果。', example: '협력할 때 비로소 가능합니다.', exampleTranslation: '只有在合作時才可能實現。' },
    ],
    questions: [
      { question: '환경 위기의 주요 원인으로 언급된 것은?', options: ['핵발전소 증가', '온실가스 배출 급증', '인구 감소', '도시화 진행'], answerIndex: 1 },
      { question: '다음 중 범지구적 문제로 언급되지 않은 것은?', options: ['해수면 상승', '생물 다양성 손실', '디지털 격차', '식량 안보 위협'], answerIndex: 2 },
      { question: '탄소 중립 정책을 둘러싼 논쟁의 핵심은?', options: ['환경과 안보의 양립', '경제 성장과의 양립', '기술 개발 방향', '국가 간 분쟁'], answerIndex: 1 },
      { question: '지속 가능한 지구를 만들기 위해 언급되지 않은 것은?', options: ['재생 가능 에너지 확대', '친환경 기술 개발', '소비 패턴 변화', '인구 증가 억제'], answerIndex: 3 },
    ],
  },
];
