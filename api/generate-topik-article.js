import Groq from 'groq-sdk';

const levelDescriptions = {
  '1-2': 'TOPIK I beginner level (Level 1-2), ~100-130 Korean characters, very simple vocabulary (daily life, family, numbers, food), basic sentence patterns like -입니다/-아요/어요, -고, -(으)로',
  '3-4': 'TOPIK II intermediate level (Level 3-4), ~180-230 Korean characters, varied vocabulary (culture, seasons, social topics), intermediate grammar like -(으)면, -아/어서, -기 좋다, -는 것',
  '5-6': 'TOPIK II advanced level (Level 5-6), ~280-350 Korean characters, sophisticated vocabulary (technology, environment, society), complex grammar like -(으)ㄹ수록, -음으로써, -를 둘러싼, -에 불구하고',
};

const VALID_LEVELS = ['1-2', '3-4', '5-6'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { level } = req.body;

  if (!VALID_LEVELS.includes(level)) {
    return res.status(400).json({ error: '無效的程度' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: '伺服器未設定 GROQ_API_KEY。' });
  }

  const prompt = `You are a TOPIK Korean language teaching expert. Generate a complete Korean reading article for TOPIK Level ${level} learners.

Level requirements: ${levelDescriptions[level]}

Return ONLY a valid JSON object with NO extra text, NO markdown, NO code fences. Follow this example format exactly, replacing all values with real TOPIK ${level}-level content:

{
  "title": "우리 동네",
  "content": "우리 동네는 조용하고 깨끗합니다. 학교, 병원, 슈퍼마켓이 있습니다. 공원도 있어서 사람들이 산책을 합니다. 저는 우리 동네가 좋습니다.",
  "vocabulary": [
    { "korean": "동네", "romanization": "dongne", "meaning": "社區/鄰里", "example": "우리 동네는 조용합니다.", "exampleTranslation": "我們的社區很安靜。" },
    { "korean": "조용하다", "romanization": "joyonghada", "meaning": "安靜", "example": "도서관이 조용합니다.", "exampleTranslation": "圖書館很安靜。" },
    { "korean": "깨끗하다", "romanization": "kkaekkeuthada", "meaning": "乾淨", "example": "방이 깨끗합니다.", "exampleTranslation": "房間很乾淨。" },
    { "korean": "병원", "romanization": "byeongwon", "meaning": "醫院", "example": "병원에 갑니다.", "exampleTranslation": "去醫院。" },
    { "korean": "슈퍼마켓", "romanization": "syupeomaket", "meaning": "超市", "example": "슈퍼마켓에서 삽니다.", "exampleTranslation": "在超市購買。" },
    { "korean": "공원", "romanization": "gongwon", "meaning": "公園", "example": "공원에서 쉽니다.", "exampleTranslation": "在公園休息。" },
    { "korean": "산책", "romanization": "sanchaek", "meaning": "散步", "example": "산책을 합니다.", "exampleTranslation": "去散步。" },
    { "korean": "사람들", "romanization": "saramdeur", "meaning": "人們", "example": "사람들이 많습니다.", "exampleTranslation": "人很多。" },
    { "korean": "좋다", "romanization": "jota", "meaning": "好/喜歡", "example": "한국이 좋습니다.", "exampleTranslation": "喜歡韓國。" },
    { "korean": "있다", "romanization": "itda", "meaning": "有/存在", "example": "학교가 있습니다.", "exampleTranslation": "有學校。" }
  ],
  "grammar": [
    { "pattern": "A-고 A", "explanation": "連結兩個形容詞，表示「又～又～」。", "example": "조용하고 깨끗합니다.", "exampleTranslation": "又安靜又乾淨。" },
    { "pattern": "N도", "explanation": "表示「也～」，添加額外的資訊。", "example": "공원도 있습니다.", "exampleTranslation": "也有公園。" },
    { "pattern": "V-아/어서", "explanation": "表示原因或順序，「因為～所以～」。", "example": "공원이 있어서 좋습니다.", "exampleTranslation": "因為有公園所以很好。" },
    { "pattern": "N이/가 좋다", "explanation": "表示「喜歡～」或「～很好」。", "example": "우리 동네가 좋습니다.", "exampleTranslation": "喜歡我們的社區。" }
  ],
  "questions": [
    { "question": "우리 동네에 없는 것은?", "options": ["학교", "병원", "영화관", "슈퍼마켓"], "answerIndex": 2 },
    { "question": "우리 동네 공원에서 사람들이 무엇을 합니까?", "options": ["공부", "산책", "요리", "운동"], "answerIndex": 1 },
    { "question": "우리 동네의 특징은?", "options": ["시끄럽고 더럽다", "조용하고 깨끗하다", "크고 복잡하다", "작고 불편하다"], "answerIndex": 1 },
    { "question": "이 사람은 우리 동네를 어떻게 생각합니까?", "options": ["싫어한다", "모른다", "좋아한다", "불편하다"], "answerIndex": 2 }
  ]
}

Now generate a COMPLETELY NEW and DIFFERENT article for TOPIK Level ${level} in the exact same JSON format. Requirements:
- content must be at least 6 sentences long
- vocabulary array must have EXACTLY 10 items with romanization in the "romanization" field
- grammar array must have EXACTLY 4 items
- questions array must have EXACTLY 4 items with answerIndex as a number (0-3)
- All meanings, explanations, and translations must be in Traditional Chinese (繁體中文)
- The content must be original Korean text appropriate for TOPIK Level ${level}`;

  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0].message.content ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI 回傳格式錯誤，請重試。');

    const parsed = JSON.parse(jsonMatch[0]);

    res.json({
      id: `${level}-ai-${Date.now()}`,
      level,
      title: parsed.title,
      content: parsed.content,
      vocabulary: parsed.vocabulary,
      grammar: parsed.grammar,
      questions: parsed.questions,
      isAIGenerated: true,
    });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'AI 生成失敗，請重試。' });
  }
}
