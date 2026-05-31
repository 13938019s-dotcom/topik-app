import Groq from 'groq-sdk';

// ─── Complete grammar library per level ───────────────────────────────────────
// pattern / topikLevel / explanation come from here (never from AI)
// AI only generates example + exampleTranslation
// Synced from grammar-guide.ts: 80 items per app level (40 per TOPIK level × 2)
const grammarPool = {
  '1-2': [
    // ── TOPIK 1급 (40) ──
    { pattern: 'N은/는', topikLevel: 'TOPIK 1급', explanation: '主題助詞，標示句子的主題。' },
    { pattern: 'N이/가', topikLevel: 'TOPIK 1급', explanation: '主語助詞，標示句子的主語。' },
    { pattern: 'N을/를', topikLevel: 'TOPIK 1급', explanation: '受格助詞，標示動作的對象。' },
    { pattern: 'N에', topikLevel: 'TOPIK 1급', explanation: '表示時間或存在場所「在～」。' },
    { pattern: 'N에서', topikLevel: 'TOPIK 1급', explanation: '表示動作發生的地點「在～（做）」。' },
    { pattern: 'N도', topikLevel: 'TOPIK 1급', explanation: '表示「也～」，添加相同資訊。' },
    { pattern: 'N과/와', topikLevel: 'TOPIK 1급', explanation: '表示「和～」，連接兩個名詞。' },
    { pattern: 'N하고', topikLevel: 'TOPIK 1급', explanation: '口語「和～、跟～」，比과/와 更隨意。' },
    { pattern: 'N(으)로', topikLevel: 'TOPIK 1급', explanation: '表示方向「往～」或工具手段「用～」。' },
    { pattern: 'N에게/한테', topikLevel: 'TOPIK 1급', explanation: '表示動作對象「給某人、向某人」。' },
    { pattern: 'N에게서/한테서', topikLevel: 'TOPIK 1급', explanation: '表示來源「從某人那裡」。' },
    { pattern: 'N부터 N까지', topikLevel: 'TOPIK 1급', explanation: '表示範圍「從～到～」。' },
    { pattern: 'N마다', topikLevel: 'TOPIK 1급', explanation: '表示「每一～、每個～」。' },
    { pattern: 'N만', topikLevel: 'TOPIK 1급', explanation: '表示限定「只有～」。' },
    { pattern: 'N(이)나', topikLevel: 'TOPIK 1급', explanation: '表示選擇「或是～」，連接兩個名詞。' },
    { pattern: 'N밖에 + 부정', topikLevel: 'TOPIK 1급', explanation: '表示「只有～」，後面接否定，帶有不滿或遺憾語氣。' },
    { pattern: 'N이에요/예요', topikLevel: 'TOPIK 1급', explanation: '口語「是～」，N 有收音接 이에요，無收音接 예요。' },
    { pattern: 'N이/가 아니에요', topikLevel: 'TOPIK 1급', explanation: '表示「不是～」否定。' },
    { pattern: 'N이/가 있다/없다', topikLevel: 'TOPIK 1급', explanation: '表示存在「有/沒有～」。' },
    { pattern: 'N이/가 되다', topikLevel: 'TOPIK 1급', explanation: '表示「成為～、變成～」。' },
    { pattern: 'V-고', topikLevel: 'TOPIK 1급', explanation: '連接兩個動作，表示「然後」或「又～又～」。' },
    { pattern: 'V-아/어서', topikLevel: 'TOPIK 1급', explanation: '表示原因或先後順序「因為～」「做了～然後」。' },
    { pattern: 'V-고 있다', topikLevel: 'TOPIK 1급', explanation: '表示動作正在進行「正在做～」。' },
    { pattern: 'V-(으)세요', topikLevel: 'TOPIK 1급', explanation: '敬語命令或請求「請～」。' },
    { pattern: 'V-(으)ㅂ시다', topikLevel: 'TOPIK 1급', explanation: '表示共同提議「一起～吧」。' },
    { pattern: 'V-(으)ㄹ까요?', topikLevel: 'TOPIK 1급', explanation: '表示提議或疑問「要不要～？」「～嗎？」。' },
    { pattern: 'V-(으)ㄹ게요', topikLevel: 'TOPIK 1급', explanation: '表示說話者的意志或承諾「我（會）～」。' },
    { pattern: 'V-고 싶다', topikLevel: 'TOPIK 1급', explanation: '表示願望「想要～」。' },
    { pattern: 'V-(으)ㄹ 거예요', topikLevel: 'TOPIK 1급', explanation: '表示未來計畫或推測「將要～」。' },
    { pattern: 'V-지 마세요', topikLevel: 'TOPIK 1급', explanation: '表示禁止「請不要～」。' },
    { pattern: 'V-지 않다', topikLevel: 'TOPIK 1급', explanation: '表示否定「不～」。' },
    { pattern: 'V-아/어도 되다', topikLevel: 'TOPIK 1급', explanation: '表示許可「可以～」。' },
    { pattern: 'V-(으)면 안 되다', topikLevel: 'TOPIK 1급', explanation: '表示禁止「不可以～」。' },
    { pattern: 'V-지 않아도 되다', topikLevel: 'TOPIK 1급', explanation: '表示不必要「不必～、不用～」。' },
    { pattern: 'V-아/어 주다', topikLevel: 'TOPIK 1급', explanation: '表示為他人做某件事「幫某人做～」。' },
    { pattern: 'V-아/어 드리다', topikLevel: 'TOPIK 1급', explanation: '為長輩或地位高者做某事（敬語版 주다）「為您做～」。' },
    { pattern: 'V-는 N', topikLevel: 'TOPIK 1급', explanation: '動詞現在式修飾名詞「正在做～的 N」。' },
    { pattern: 'A-(으)ㄴ N', topikLevel: 'TOPIK 1급', explanation: '形容詞修飾名詞「～的 N」。' },
    { pattern: 'N보다', topikLevel: 'TOPIK 1급', explanation: '表示比較基準「比～」。' },
    { pattern: 'V-지요?/죠?', topikLevel: 'TOPIK 1급', explanation: '表示確認或共鳴「不是～嗎？對吧？」。' },
    // ── TOPIK 2급 (40) ──
    { pattern: 'V-았/었-', topikLevel: 'TOPIK 2급', explanation: '過去式語尾，表示已完成的動作或狀態。' },
    { pattern: 'V-겠-', topikLevel: 'TOPIK 2급', explanation: '表示說話者的意志或對未來的推測「將～、應該～」。' },
    { pattern: 'V-(으)면', topikLevel: 'TOPIK 2급', explanation: '表示條件「如果～的話」。' },
    { pattern: 'V-(으)려고', topikLevel: 'TOPIK 2급', explanation: '表示意圖或目的「為了要～、打算～」。' },
    { pattern: 'V-(으)러 가다/오다', topikLevel: 'TOPIK 2급', explanation: '表示移動目的「去/來做～」。' },
    { pattern: 'V-(으)니까', topikLevel: 'TOPIK 2급', explanation: '表示主觀原因「因為～」，常用於命令・請求。' },
    { pattern: 'V-지만', topikLevel: 'TOPIK 2급', explanation: '表示對比「雖然～但是～」。' },
    { pattern: 'V-는데', topikLevel: 'TOPIK 2급', explanation: '表示背景說明或對比，「～，（但）…」。' },
    { pattern: 'V-(으)면서', topikLevel: 'TOPIK 2급', explanation: '表示兩個動作同時進行「一邊～一邊～」。' },
    { pattern: 'V-거나', topikLevel: 'TOPIK 2급', explanation: '表示選擇「或者～」。' },
    { pattern: 'V-아/어 보다', topikLevel: 'TOPIK 2급', explanation: '表示嘗試「試試看～」。' },
    { pattern: 'V-(으)ㄹ 수 있다/없다', topikLevel: 'TOPIK 2급', explanation: '表示能力或可能性「可以/不能～」。' },
    { pattern: 'V-아/어야 하다', topikLevel: 'TOPIK 2급', explanation: '表示義務或必要「必須～」。' },
    { pattern: 'V-아/어야겠다', topikLevel: 'TOPIK 2급', explanation: '表示說話者決心或必要感「我應該要～了」。' },
    { pattern: 'V-(으)ㄹ 때', topikLevel: 'TOPIK 2급', explanation: '表示時間點「～的時候」。' },
    { pattern: 'V-(으)ㄴ 후에', topikLevel: 'TOPIK 2급', explanation: '表示完成後「做～之後」。' },
    { pattern: 'V-기 전에', topikLevel: 'TOPIK 2급', explanation: '表示發生前「做～之前」。' },
    { pattern: 'V-는 동안', topikLevel: 'TOPIK 2급', explanation: '表示持續期間「在～的過程中/期間」。' },
    { pattern: 'V-기', topikLevel: 'TOPIK 2급', explanation: '將動詞名詞化「做～（這件事）」，較口語。' },
    { pattern: 'V-기로 하다', topikLevel: 'TOPIK 2급', explanation: '表示決定「決定要～」。' },
    { pattern: 'V-(으)면 되다', topikLevel: 'TOPIK 2급', explanation: '表示只需如此就好「只要～就行了」。' },
    { pattern: 'V-지 못하다', topikLevel: 'TOPIK 2급', explanation: '表示能力不足的否定「沒辦法～、不能～」。' },
    { pattern: 'A/V-아/어지다', topikLevel: 'TOPIK 2급', explanation: '表示狀態的自然變化「變得～」。' },
    { pattern: 'V-(으)ㄴ N', topikLevel: 'TOPIK 2급', explanation: '動詞過去式修飾名詞「做過～的 N」。' },
    { pattern: 'N에 대해(서)', topikLevel: 'TOPIK 2급', explanation: '表示話題「關於～、有關～」。' },
    { pattern: 'N에 관해(서)', topikLevel: 'TOPIK 2급', explanation: '表示「關於～」，比에 대해 更書面。' },
    { pattern: 'N처럼/같이', topikLevel: 'TOPIK 2급', explanation: '表示比喻「像～一樣」。' },
    { pattern: 'N만큼', topikLevel: 'TOPIK 2급', explanation: '表示程度「和～一樣多、達到～程度」。' },
    { pattern: 'N(으)로', topikLevel: 'TOPIK 2급', explanation: '表示手段・材料・原因「用～、因為～」。' },
    { pattern: 'V-기 쉽다/어렵다', topikLevel: 'TOPIK 2급', explanation: '表示做某事的難易度「容易/難以做～」。' },
    { pattern: 'V-아/어도', topikLevel: 'TOPIK 2급', explanation: '表示讓步「即使～、就算～也」。' },
    { pattern: 'V-자마자', topikLevel: 'TOPIK 2급', explanation: '表示立即緊接「一～就～、剛～就」。' },
    { pattern: 'V-게', topikLevel: 'TOPIK 2급', explanation: '將形容詞或動詞副詞化「以～方式、使得～」。' },
    { pattern: 'N뿐', topikLevel: 'TOPIK 2급', explanation: '表示限定「只有N、僅僅N」。' },
    { pattern: 'V-(으)ㄹ 것 같다', topikLevel: 'TOPIK 2급', explanation: '表示對未來的推測「好像會～、感覺要～」。' },
    { pattern: 'V-더라도', topikLevel: 'TOPIK 2급', explanation: '表示假設讓步「即使～也、就算～也」（假設情況）。' },
    { pattern: 'N에 따르면', topikLevel: 'TOPIK 2급', explanation: '表示資訊來源「根據～」。' },
    { pattern: 'V-아/어서인지', topikLevel: 'TOPIK 2급', explanation: '不確定推測原因「也許是因為～」。' },
    { pattern: 'V-네요', topikLevel: 'TOPIK 2급', explanation: '表示說話者的發現或感嘆「原來如此！、真是～呢」。' },
    { pattern: 'V-(으)ㄹ 줄 모르다', topikLevel: 'TOPIK 2급', explanation: '表示「不知道怎麼做～、不會～」（技能缺乏）。' },
  ],
  '3-4': [
    // ── TOPIK 3급 (40) ──
    { pattern: 'V-는 것', topikLevel: 'TOPIK 3급', explanation: '將動詞名詞化，表示「做～這件事」（書面）。' },
    { pattern: 'V-(으)ㄴ/는 것 같다', topikLevel: 'TOPIK 3급', explanation: '表示推測或不確定「好像～」。' },
    { pattern: 'V-아/어 있다', topikLevel: 'TOPIK 3급', explanation: '表示動作結果的持續狀態（靜態）。' },
    { pattern: 'V-게 되다', topikLevel: 'TOPIK 3급', explanation: '表示自然發生的變化「變得～、結果～了」。' },
    { pattern: 'V-(으)ㄹ 줄 알다', topikLevel: 'TOPIK 3급', explanation: '表示「會做～」（技能）。' },
    { pattern: 'V-기 때문에', topikLevel: 'TOPIK 3급', explanation: '書面語原因「因為～」，比니까更正式。' },
    { pattern: 'V-다가', topikLevel: 'TOPIK 3급', explanation: '表示動作中途轉換「正做著A，然後B」。' },
    { pattern: 'V-도록', topikLevel: 'TOPIK 3급', explanation: '表示目的或達到的程度「為了使～」「到～的程度」。' },
    { pattern: 'V-아/어 버리다', topikLevel: 'TOPIK 3급', explanation: '表示動作完結，帶遺憾或一了百了的語氣。' },
    { pattern: 'V-고 나서', topikLevel: 'TOPIK 3급', explanation: '強調完成後再進行下一步「做完～之後」。' },
    { pattern: 'V-(으)ㄴ 지', topikLevel: 'TOPIK 3급', explanation: '表示從動作完成至今的時間「做～有多久了」。' },
    { pattern: 'V-는 중이다', topikLevel: 'TOPIK 3급', explanation: '表示正在進行中「正在做～」。' },
    { pattern: 'V-(으)ㄹ지도 모르다', topikLevel: 'TOPIK 3급', explanation: '表示不確定推測「說不定～、也許～」。' },
    { pattern: 'V-던', topikLevel: 'TOPIK 3급', explanation: '表示過去的回想或未完成習慣「曾經～的」。' },
    { pattern: 'N에 따라', topikLevel: 'TOPIK 3급', explanation: '表示根據或隨著變化「根據～、隨著～」。' },
    { pattern: 'V-기 위해(서)', topikLevel: 'TOPIK 3급', explanation: '表示目的「為了做～」（書面・正式）。' },
    { pattern: 'V-자마자', topikLevel: 'TOPIK 3급', explanation: '表示立即緊接「一～就～」（強調即時性）。' },
    { pattern: 'V-(으)ㄹ 예정이다', topikLevel: 'TOPIK 3급', explanation: '表示已計畫好的未來事項「預定要～」。' },
    { pattern: 'V-아/어 놓다', topikLevel: 'TOPIK 3급', explanation: '表示動作完成後狀態保留「做好放著～」。' },
    { pattern: 'V-는데도', topikLevel: 'TOPIK 3급', explanation: '表示「雖然～但（還是）」，帶有意外或不滿語氣。' },
    { pattern: 'V-(으)ㄹ 때마다', topikLevel: 'TOPIK 3급', explanation: '表示「每次～的時候」。' },
    { pattern: 'V-아/어 보이다', topikLevel: 'TOPIK 3급', explanation: '表示外表上看起來「看起來～」。' },
    { pattern: 'V-는 대로', topikLevel: 'TOPIK 3급', explanation: '表示「一～就～」或「按照～」。' },
    { pattern: 'N(으)로 인해(서)', topikLevel: 'TOPIK 3급', explanation: '書面語「因為～、由於～」（原因）。' },
    { pattern: 'V-(으)려면', topikLevel: 'TOPIK 3급', explanation: '表示為了達成某目的所需條件「如果要～的話」。' },
    { pattern: 'V-는지', topikLevel: 'TOPIK 3급', explanation: '表示間接疑問「是否～、怎麼～」（嵌入疑問）。' },
    { pattern: 'V-아/어야 되다', topikLevel: 'TOPIK 3급', explanation: '表示義務「必須～、得～」（口語版 야 하다）。' },
    { pattern: 'V-고 싶어하다', topikLevel: 'TOPIK 3급', explanation: '表示第三人稱的願望「（他）想要～」。' },
    { pattern: 'V-기는 하다', topikLevel: 'TOPIK 3급', explanation: '表示承認某事「確實是～（但）」，帶讓步語氣。' },
    { pattern: 'V-다 보면', topikLevel: 'TOPIK 3급', explanation: '表示「如果持續做的話，就會～」。' },
    { pattern: 'V-다 보니', topikLevel: 'TOPIK 3급', explanation: '表示「做著做著，結果發現～」。' },
    { pattern: 'V-아/어 두다', topikLevel: 'TOPIK 3급', explanation: '表示事先做好準備「先做好～放著」。' },
    { pattern: 'N에 걸쳐', topikLevel: 'TOPIK 3급', explanation: '表示範圍延伸「跨越～、遍及～」。' },
    { pattern: 'V-(으)ㄹ 것이다', topikLevel: 'TOPIK 3급', explanation: '書面語未來或推測「將會～」（比거예요更正式）。' },
    { pattern: 'A/V-다고 하다', topikLevel: 'TOPIK 3급', explanation: '間接引用「（說）～」，轉述他人的話。' },
    { pattern: 'N을/를 위해(서)', topikLevel: 'TOPIK 3급', explanation: '表示受益對象或目的「為了N（利益）」。' },
    { pattern: 'V-(으)므로', topikLevel: 'TOPIK 3급', explanation: '書面語原因「因此～、由於～」（最正式）。' },
    { pattern: 'V-면서도', topikLevel: 'TOPIK 3급', explanation: '表示「雖然同時在做，但卻…」矛盾對比。' },
    { pattern: 'N을/를 통해(서)', topikLevel: 'TOPIK 3급', explanation: '表示手段或媒介「透過～、藉由～」。' },
    { pattern: 'V-(으)ㄴ/는 이상', topikLevel: 'TOPIK 3급', explanation: '表示「既然～、在～的前提下」。' },
    // ── TOPIK 4급 (40) ──
    { pattern: 'V-(으)ㄹ 텐데', topikLevel: 'TOPIK 4급', explanation: '表示推測帶出後續說明「應該會～，但…」。' },
    { pattern: 'V-고자', topikLevel: 'TOPIK 4급', explanation: '書面正式語，表示意圖目的「為了～、意圖～」。' },
    { pattern: 'V-(으)ㄴ/는 반면에', topikLevel: 'TOPIK 4급', explanation: '表示對比「反面，另一方面～」。' },
    { pattern: 'V-(으)ㄹ 뿐만 아니라', topikLevel: 'TOPIK 4급', explanation: '表示「不僅～而且～」，遞進關係。' },
    { pattern: 'V-(으)ㄴ/는 편이다', topikLevel: 'TOPIK 4급', explanation: '表示傾向「比較偏向～，算是～」。' },
    { pattern: 'V-게 하다', topikLevel: 'TOPIK 4급', explanation: '表示使役「讓/使某人做～」。' },
    { pattern: 'V-(으)ㄹ 만하다', topikLevel: 'TOPIK 4급', explanation: '表示「值得～、有必要～」。' },
    { pattern: 'V-더니', topikLevel: 'TOPIK 4급', explanation: '表示說話者過去觀察到的結果「之前看到～，結果～」。' },
    { pattern: 'V-는 한', topikLevel: 'TOPIK 4급', explanation: '表示條件「只要～（就）…」。' },
    { pattern: 'N에 비해(서)', topikLevel: 'TOPIK 4급', explanation: '表示比較「相比於～、與～相比」。' },
    { pattern: 'N을/를 비롯해(서)', topikLevel: 'TOPIK 4급', explanation: '表示「以～為首，包括～」。' },
    { pattern: 'N에 의하면', topikLevel: 'TOPIK 4급', explanation: '表示引用資訊來源「根據～（的說法）」。' },
    { pattern: 'V-아/어야만', topikLevel: 'TOPIK 4급', explanation: '表示強調條件「只有～才…」。' },
    { pattern: 'V-고 보니', topikLevel: 'TOPIK 4급', explanation: '表示「做了之後才發現/意識到」。' },
    { pattern: 'V-아/어 가다/오다', topikLevel: 'TOPIK 4급', explanation: '表示動作或狀態逐漸持續進行（方向性）。' },
    { pattern: 'V-(으)ㄹ 뻔하다', topikLevel: 'TOPIK 4급', explanation: '表示「差點就～了」（幸好沒發生）。' },
    { pattern: 'V-(으)ㄹ 정도로', topikLevel: 'TOPIK 4급', explanation: '表示程度「到了～的程度」。' },
    { pattern: 'N치고는', topikLevel: 'TOPIK 4급', explanation: '表示「對於N來說（出乎意料地）」。' },
    { pattern: 'N(으)로서', topikLevel: 'TOPIK 4급', explanation: '表示立場或身份「作為～、以～身份」。' },
    { pattern: 'V-(으)므로', topikLevel: 'TOPIK 4급', explanation: '書面語「因此～、由於～」（正式原因）。' },
    { pattern: 'V-아/어 봤자', topikLevel: 'TOPIK 4급', explanation: '表示「就算～也沒用、白費～」。' },
    { pattern: 'V-기 나름이다', topikLevel: 'TOPIK 4급', explanation: '表示「全看怎麼做、取決於～」。' },
    { pattern: 'N을/를 계기로', topikLevel: 'TOPIK 4급', explanation: '表示契機「以～為契機、藉此機會」。' },
    { pattern: 'V-는가 하면', topikLevel: 'TOPIK 4급', explanation: '表示「有時～，有時也…」，描述對比共存。' },
    { pattern: 'N에 앞서', topikLevel: 'TOPIK 4급', explanation: '表示「在～之前、先於～」（書面語）。' },
    { pattern: 'V-(으)ㄹ 겸', topikLevel: 'TOPIK 4급', explanation: '表示一石二鳥「順便～、兼而～」。' },
    { pattern: 'V-는 한편', topikLevel: 'TOPIK 4급', explanation: '表示「一方面～，同時另一方面」。' },
    { pattern: 'V-다는 점에서', topikLevel: 'TOPIK 4급', explanation: '表示「從～這一點來看、在～方面」。' },
    { pattern: 'N을/를 막론하고', topikLevel: 'TOPIK 4급', explanation: '表示「不論～、無論～」。' },
    { pattern: 'V-(으)ㄹ 수도 있다', topikLevel: 'TOPIK 4급', explanation: '表示可能性「也有可能～、說不定會～」。' },
    { pattern: 'V-아/어서는 안 되다', topikLevel: 'TOPIK 4급', explanation: '強調禁止「絕不可以～」（比면 안 되다更強）。' },
    { pattern: 'N에 비추어', topikLevel: 'TOPIK 4급', explanation: '表示依據「鑑於～、參照～」（書面語）。' },
    { pattern: 'V-는가', topikLevel: 'TOPIK 4급', explanation: '正式書面疑問語尾「是否～、有沒有～」。' },
    { pattern: 'N에 의해', topikLevel: 'TOPIK 4급', explanation: '表示被動作者或原因「被～、由～」（書面語）。' },
    { pattern: 'V-(으)ㄹ 바에야', topikLevel: 'TOPIK 4급', explanation: '表示「既然要～，不如…」（比較兩者）。' },
    { pattern: 'V-고도', topikLevel: 'TOPIK 4급', explanation: '表示「做了～之後還～」，帶意外或強調語氣。' },
    { pattern: 'V-(으)ㄴ/는 나머지', topikLevel: 'TOPIK 4급', explanation: '表示過度導致後果「因為過於～而」。' },
    { pattern: 'V-다못해', topikLevel: 'TOPIK 4급', explanation: '表示到了極點「忍無可忍地、到最後」。' },
    { pattern: 'N에 힘입어', topikLevel: 'TOPIK 4급', explanation: '表示「藉助～、多虧了～」。' },
    { pattern: 'V-건대', topikLevel: 'TOPIK 4급', explanation: '書面語「依我之見、我認為」，引出主觀判斷。' },
    // ── TOPIK 3급 追加 (20) ──
    { pattern: 'V-는 척하다', topikLevel: 'TOPIK 3급', explanation: '裝作做～、假裝。' },
    { pattern: 'N답다', topikLevel: 'TOPIK 3급', explanation: '具有N應有的特質、像個N樣子的。' },
    { pattern: 'V-아/어 오다', topikLevel: 'TOPIK 3급', explanation: '一直～過來（表示持續到現在）。' },
    { pattern: 'V-았/었으면 좋겠다', topikLevel: 'TOPIK 3급', explanation: '要是～就好了（願望）。' },
    { pattern: 'V-다니', topikLevel: 'TOPIK 3급', explanation: '竟然～！表示對事實的驚訝或意外。' },
    { pattern: 'V-는 듯하다', topikLevel: 'TOPIK 3급', explanation: '似乎～、好像～（推測語氣）。' },
    { pattern: 'V-곤 하다', topikLevel: 'TOPIK 3급', explanation: '常常會～、習慣性地（過去或現在習慣）。' },
    { pattern: 'V-(으)ㄹ까 봐', topikLevel: 'TOPIK 3급', explanation: '擔心萬一～（擔憂某事發生）。' },
    { pattern: 'V-지 않으면 안 되다', topikLevel: 'TOPIK 3급', explanation: '不～不行（雙重否定表必要）。' },
    { pattern: 'N(이)라도', topikLevel: 'TOPIK 3급', explanation: '就算是N也好（退而求其次）。' },
    { pattern: 'N조차', topikLevel: 'TOPIK 3급', explanation: '就連N都～（強調極端情況）。' },
    { pattern: 'V-(으)려고 하다', topikLevel: 'TOPIK 3급', explanation: '快要～、正打算～（即將發生）。' },
    { pattern: 'V-(으)ㄹ 줄 알았다', topikLevel: 'TOPIK 3급', explanation: '以為會～（與事實不符的預期）。' },
    { pattern: 'N에 지나지 않다', topikLevel: 'TOPIK 3급', explanation: '不過是N而已（強調程度低）。' },
    { pattern: 'N만 해도', topikLevel: 'TOPIK 3급', explanation: '光是N就（以舉例說明程度）。' },
    { pattern: 'V-는 데다가', topikLevel: 'TOPIK 3급', explanation: '而且還～（在已有基礎上再加）。' },
    { pattern: 'V-(으)ㄹ 겨를도 없다', topikLevel: 'TOPIK 3급', explanation: '連～空都沒有（太忙了沒時間）。' },
    { pattern: 'V-기도 전에', topikLevel: 'TOPIK 3급', explanation: '還沒來得及～就（在完成之前就）。' },
    { pattern: 'V-기는커녕', topikLevel: 'TOPIK 3급', explanation: '別說～了（連更低標準都做不到）。' },
    { pattern: 'N에 따라서', topikLevel: 'TOPIK 3급', explanation: '根據N而不同（隨N變化）。' },
    // ── TOPIK 4급 追加 (20) ──
    { pattern: 'V-아/어 내다', topikLevel: 'TOPIK 4급', explanation: '成功做到、達成（克服困難後完成）。' },
    { pattern: 'V-기 십상이다', topikLevel: 'TOPIK 4급', explanation: '很容易就～、十之八九會（容易發生的傾向）。' },
    { pattern: 'V-(으)ㄹ 여지가 있다', topikLevel: 'TOPIK 4급', explanation: '有餘地/可能性～。' },
    { pattern: 'N에 의한', topikLevel: 'TOPIK 4급', explanation: '由～引起的、基於～的（書面語原因修飾）。' },
    { pattern: 'V-다가는', topikLevel: 'TOPIK 4급', explanation: '如果繼續這樣～就會（警告後果）。' },
    { pattern: 'V-기도 하다', topikLevel: 'TOPIK 4급', explanation: '有時也會～、既～也～（並列或強調）。' },
    { pattern: 'V-는 측면에서', topikLevel: 'TOPIK 4급', explanation: '從～的角度/方面看（書面說理）。' },
    { pattern: 'N에 관계없이', topikLevel: 'TOPIK 4급', explanation: '與N無關、不管N（無差別）。' },
    { pattern: 'V-(으)ㄹ 것으로 보인다', topikLevel: 'TOPIK 4급', explanation: '看起來會～（客觀判斷、書面語推測）。' },
    { pattern: 'V-(으)ㄴ/는 데 반해', topikLevel: 'TOPIK 4급', explanation: '相反地、另一方面（對比）。' },
    { pattern: 'V-더라고요', topikLevel: 'TOPIK 4급', explanation: '親眼所見的事實「我發現～呢」（親身體驗的感嘆）。' },
    { pattern: 'V-는 경향이 있다', topikLevel: 'TOPIK 4급', explanation: '有～的傾向（行為模式）。' },
    { pattern: 'V-는 것과 달리', topikLevel: 'TOPIK 4급', explanation: '與～不同（對比預期）。' },
    { pattern: 'V-는 것으로 나타났다', topikLevel: 'TOPIK 4급', explanation: '（調查/研究）顯示～（客觀報導）。' },
    { pattern: 'V-는 데 도움이 되다', topikLevel: 'TOPIK 4급', explanation: '對做～有幫助。' },
    { pattern: 'V-(으)면 그만이다', topikLevel: 'TOPIK 4급', explanation: '只要～就好了、做～就夠了。' },
    { pattern: 'N에 걸맞은', topikLevel: 'TOPIK 4급', explanation: '與N相稱的、配得上N的。' },
    { pattern: 'V-기가 쉽지 않다', topikLevel: 'TOPIK 4급', explanation: '～並不容易（委婉表達困難）。' },
    { pattern: 'V-는 줄도 모르고', topikLevel: 'TOPIK 4급', explanation: '不知不覺地（沒意識到）。' },
    { pattern: 'V-아/어 오고 있다', topikLevel: 'TOPIK 4급', explanation: '一直持續到現在（從過去到現在的連續）。' },
  ],
  '5-6': [
    // ── TOPIK 5급 (40) ──
    { pattern: 'V-(으)ㄹ수록', topikLevel: 'TOPIK 5급', explanation: '表示程度遞進「越～越～」。' },
    { pattern: 'V-음으로써', topikLevel: 'TOPIK 5급', explanation: '書面語「藉由做～（的方式）」。' },
    { pattern: 'V-는 바람에', topikLevel: 'TOPIK 5급', explanation: '表示突發負面原因「因為突然～而（導致不好的結果）」。' },
    { pattern: 'V-(으)ㄹ 수밖에 없다', topikLevel: 'TOPIK 5급', explanation: '表示「只能～、別無選擇」。' },
    { pattern: 'V-기 마련이다', topikLevel: 'TOPIK 5급', explanation: '表示理所當然的必然性「理所當然會～」。' },
    { pattern: 'V-고 말다', topikLevel: 'TOPIK 5급', explanation: '表示最終發生不好的結果（遺憾語氣）「最終還是～了」。' },
    { pattern: 'V-(으)ㄴ/는 탓에', topikLevel: 'TOPIK 5급', explanation: '表示責怪原因（負面）「都怪～，因此～」。' },
    { pattern: 'V-에도 불구하고', topikLevel: 'TOPIK 5급', explanation: '表示讓步「儘管～，仍然～」。' },
    { pattern: 'V-느라고', topikLevel: 'TOPIK 5급', explanation: '表示「因為忙著做A而（無法做B或導致B）」。' },
    { pattern: 'V-는 셈이다', topikLevel: 'TOPIK 5급', explanation: '表示「等於是～、算是～」。' },
    { pattern: 'V-다시피', topikLevel: 'TOPIK 5급', explanation: '表示「正如（你）所知/所見」，引用雙方共知事實。' },
    { pattern: 'V-(으)ㄹ 지경이다', topikLevel: 'TOPIK 5급', explanation: '表示「到了快要～的地步」（程度極端）。' },
    { pattern: 'N을/를 둘러싼', topikLevel: 'TOPIK 5급', explanation: '表示「圍繞著～的（議題、爭論）」。' },
    { pattern: 'V-는 한편', topikLevel: 'TOPIK 5급', explanation: '表示「一方面～，另一方面～」，同時具兩種面向。' },
    { pattern: 'V-(으)ㄹ 나위가 없다', topikLevel: 'TOPIK 5급', explanation: '表示「無需多說、自不待言」（程度最高）。' },
    { pattern: 'V-(으)ㄴ/는 가운데', topikLevel: 'TOPIK 5급', explanation: '書面語「在～的情況下、在～之中」。' },
    { pattern: 'V-고도 남다', topikLevel: 'TOPIK 5급', explanation: '表示「綽綽有餘、不只如此」。' },
    { pattern: 'V-노라면', topikLevel: 'TOPIK 5급', explanation: '表示「隨著持續做～，就會～」（過程必然性）。' },
    { pattern: 'N에 따른', topikLevel: 'TOPIK 5급', explanation: '書面語「隨著～的、根據～所產生的」（名詞修飾）。' },
    { pattern: 'V-(으)ㄹ진대', topikLevel: 'TOPIK 5급', explanation: '書面語「既然是～，就應當…」（邏輯推論）。' },
    { pattern: 'V-건만', topikLevel: 'TOPIK 5급', explanation: '書面語「雖然～，但」（有遺憾的對比）。' },
    { pattern: 'V-는 마당에', topikLevel: 'TOPIK 5급', explanation: '表示「在這種情況下、事到如今」。' },
    { pattern: 'V-(으)ㄹ 뿐더러', topikLevel: 'TOPIK 5급', explanation: '「不僅～而且～」（比 뿐만 아니라 更書面強調）。' },
    { pattern: 'N(으)로 말미암아', topikLevel: 'TOPIK 5급', explanation: '書面語「由於～、因～而起」（原因，書面正式）。' },
    { pattern: 'V-는 한이 있어도', topikLevel: 'TOPIK 5급', explanation: '表示「就算～也」（最極端的讓步）。' },
    { pattern: 'V-아/어야 할', topikLevel: 'TOPIK 5급', explanation: '書面語「應該要做的～」（義務的名詞修飾）。' },
    { pattern: 'N을/를 두고', topikLevel: 'TOPIK 5급', explanation: '表示「關於～、針對～」（議論或競爭對象）。' },
    { pattern: 'V-고자 하다', topikLevel: 'TOPIK 5급', explanation: '書面語「意圖要～、打算～」（比 고자 更完整）。' },
    { pattern: 'V-(으)ㄹ 나름이다', topikLevel: 'TOPIK 5급', explanation: '表示「完全取決於、全看～」。' },
    { pattern: 'N을/를 위시하여', topikLevel: 'TOPIK 5급', explanation: '書面語「以～為首（包括）」（比 비롯하여 更正式）。' },
    { pattern: 'V-아/어서야', topikLevel: 'TOPIK 5급', explanation: '表示「在～之後才（終於）」（時間條件）。' },
    { pattern: 'V-려야 V-(으)ㄹ 수 없다', topikLevel: 'TOPIK 5급', explanation: '表示「就算想～也不能～」（能力上無法）。' },
    { pattern: 'V-(으)ㄴ/는 셈 치다', topikLevel: 'TOPIK 5급', explanation: '表示「就當作是～」（假設接受）。' },
    { pattern: 'V-다는 명목으로', topikLevel: 'TOPIK 5급', explanation: '表示「以～為由、打著～的名義」。' },
    { pattern: 'N에 즈음하여', topikLevel: 'TOPIK 5급', explanation: '書面語「在～之際、於～之時」（正式場合）。' },
    { pattern: 'V-자니', topikLevel: 'TOPIK 5급', explanation: '表示「要～的話又覺得難」（兩難處境）。' },
    { pattern: 'V-(으)ㄹ 것을 모르고', topikLevel: 'TOPIK 5급', explanation: '表示「不知道會～而（做了某事）」（無知導致）。' },
    { pattern: 'N에 걸맞게', topikLevel: 'TOPIK 5급', explanation: '表示「與～相稱地、配合～地」。' },
    { pattern: 'V-는 바', topikLevel: 'TOPIK 5급', explanation: '書面語「～之所在、～之處」（正式說明依據）。' },
    { pattern: 'V-고 말고', topikLevel: 'TOPIK 5급', explanation: '表示「當然、那還用說」（強烈肯定）。' },
    // ── TOPIK 6급 (40) ──
    { pattern: 'V-(으)ㄹ 따름이다', topikLevel: 'TOPIK 6급', explanation: '書面語「只能～、僅此而已」（表達無奈或謙遜）。' },
    { pattern: 'V-기에', topikLevel: 'TOPIK 6급', explanation: '書面正式「因為～」，說明原因。' },
    { pattern: 'V-되', topikLevel: 'TOPIK 6급', explanation: '書面正式「但是～」，表示對比或限制。' },
    { pattern: 'V-거니와', topikLevel: 'TOPIK 6급', explanation: '書面語「不僅～而且～」，遞進關係（較正式）。' },
    { pattern: 'V-(으)ㄹ망정', topikLevel: 'TOPIK 6급', explanation: '表示讓步「雖然～但…」（承認前提，後接強烈對比）。' },
    { pattern: 'V-는가 하면', topikLevel: 'TOPIK 6급', explanation: '表示「有時～，有時也…」，描述對比共存情況。' },
    { pattern: 'V-(으)ㄹ 법하다', topikLevel: 'TOPIK 6급', explanation: '表示「按理說應該～、理應如此」。' },
    { pattern: 'V-(으)ㄹ 리(가) 없다', topikLevel: 'TOPIK 6급', explanation: '表示強烈否定推測「不可能會～」。' },
    { pattern: 'N에 의거하여', topikLevel: 'TOPIK 6급', explanation: '正式書面語「依據～、按照～」（法律、規定）。' },
    { pattern: 'V-아/어야 마땅하다', topikLevel: 'TOPIK 6급', explanation: '表示「理應～、應當～」（道義上）。' },
    { pattern: 'V-아/어 마지않다', topikLevel: 'TOPIK 6급', explanation: '書面語「由衷地～、不由得～」（強調內心真誠）。' },
    { pattern: 'V-(으)ㄹ 지언정', topikLevel: 'TOPIK 6급', explanation: '書面語讓步「就算～也」（正式版的 -아/어도）。' },
    { pattern: 'N을/를 불문하고', topikLevel: 'TOPIK 6급', explanation: '書面語「不問～、無論～」（比 막론하고 更正式）。' },
    { pattern: 'V-(으)련마는', topikLevel: 'TOPIK 6급', explanation: '書面語「本想～的，但…」（遺憾的反事實）。' },
    { pattern: 'V-자면', topikLevel: 'TOPIK 6급', explanation: '書面語「如果要～的話」（列出條件）。' },
    { pattern: 'V-노라고', topikLevel: 'TOPIK 6급', explanation: '書面語「雖然一直在做～，但」（強調努力卻未達預期）。' },
    { pattern: 'V-(으)ㄴ/는 즉', topikLevel: 'TOPIK 6급', explanation: '書面語「也就是說、換言之」（說明或下定義）。' },
    { pattern: 'V-다는 데 있다', topikLevel: 'TOPIK 6급', explanation: '書面語「重點在於～、問題在於～」（指出核心）。' },
    { pattern: 'N에 입각하여', topikLevel: 'TOPIK 6급', explanation: '書面語「立足於～、基於～」（邏輯立場）。' },
    { pattern: 'V-아/어서는', topikLevel: 'TOPIK 6급', explanation: '表示「如果是這樣做的話（就有問題）」（否定條件）。' },
    { pattern: 'V-(으)ㄹ새', topikLevel: 'TOPIK 6급', explanation: '書面語「在做某事的間隙、趁著～」。' },
    { pattern: 'N에 즈음한', topikLevel: 'TOPIK 6급', explanation: '書面語「在～之際」（名詞修飾形）。' },
    { pattern: 'V-는바', topikLevel: 'TOPIK 6급', explanation: '書面語「基於此、因此」（表明根據後引出結論）。' },
    { pattern: 'V-(으)ㄹ 수가 없다', topikLevel: 'TOPIK 6급', explanation: '比 수 없다 更強調的「根本不可能～、怎麼也不能～」。' },
    { pattern: 'V-고 보면', topikLevel: 'TOPIK 6급', explanation: '書面語「做過之後回頭看、仔細想想」。' },
    { pattern: 'N이/가 아닌 한', topikLevel: 'TOPIK 6급', explanation: '表示「除非是～，否則不…」（排除條件）。' },
    { pattern: 'V-는 둥 마는 둥', topikLevel: 'TOPIK 6급', explanation: '表示「做也不是，不做也不是的樣子；敷衍地」。' },
    { pattern: 'V-(으)ㄹ 줄이야', topikLevel: 'TOPIK 6급', explanation: '表示意外驚訝「沒想到竟然會～」。' },
    { pattern: 'V-기로서니', topikLevel: 'TOPIK 6급', explanation: '書面語「就算是～（也未免太…）」（讓步+批評）。' },
    { pattern: 'V-다 못해', topikLevel: 'TOPIK 6급', explanation: '表示程度到了極點「～到了受不了的地步」。' },
    { pattern: 'N이/가 어디 있겠는가', topikLevel: 'TOPIK 6급', explanation: '反問強調「哪裡會有～呢（根本沒有）」。' },
    { pattern: 'V-(으)ㄹ 만도 하다', topikLevel: 'TOPIK 6급', explanation: '表示「也難怪～、也情有可原」（理解對方行為）。' },
    { pattern: 'V-았/었더라면', topikLevel: 'TOPIK 6급', explanation: '表示反事實假設「要是當時～的話（就好了）」。' },
    { pattern: 'V-는 것도 아니고', topikLevel: 'TOPIK 6급', explanation: '表示「既不是～，又不是…」（模糊兩難狀態）。' },
    { pattern: 'N(이)야말로', topikLevel: 'TOPIK 6급', explanation: '表示強調「正是N才是真正的～」。' },
    { pattern: 'V-(으)ㄹ 터이다', topikLevel: 'TOPIK 6급', explanation: '書面語「想必～、應當會～」（推測意志）。' },
    { pattern: 'V-는 데다가', topikLevel: 'TOPIK 6급', explanation: '表示「在～的基礎上，加之～」（累加）。' },
    { pattern: 'V-지 않을 수 없다', topikLevel: 'TOPIK 6급', explanation: '雙重否定強調「不得不～、不能不～」。' },
    { pattern: 'N을/를 감안하면', topikLevel: 'TOPIK 6급', explanation: '書面語「考慮到～、鑑於～」。' },
    { pattern: 'V-고야 말겠다', topikLevel: 'TOPIK 6급', explanation: '表示強烈決心「一定要～、非～不可」。' },
    { pattern: 'N은/는 고사하고', topikLevel: 'TOPIK 6급', explanation: '書面語「別說N了、更不用說N了」（程度更甚）。' },
    // ── TOPIK 5급 追加 (20) ──
    { pattern: 'V-(으)ㄹ 도리가 없다', topikLevel: 'TOPIK 5급', explanation: '沒有辦法～、無計可施。' },
    { pattern: 'V-건 V-건 (간에)', topikLevel: 'TOPIK 5급', explanation: '不管是～還是～（書面語，強調無論哪種情況）。' },
    { pattern: 'V-(으)ㄴ들', topikLevel: 'TOPIK 5급', explanation: '就算～也（書面語讓步，難有改變）。' },
    { pattern: 'V-고서야', topikLevel: 'TOPIK 5급', explanation: '做了～之後才（終於）（結果後才成立）。' },
    { pattern: 'V-기 무섭게', topikLevel: 'TOPIK 5급', explanation: '一～就立刻（速度極快，幾乎同時）。' },
    { pattern: 'V-(으)ㄹ 터인데', topikLevel: 'TOPIK 5급', explanation: '應該是要～的，但是（推測後轉折）。' },
    { pattern: 'V-기에 앞서', topikLevel: 'TOPIK 5급', explanation: '在做～之前（書面語，強調順序）。' },
    { pattern: 'N에 상관없이', topikLevel: 'TOPIK 5급', explanation: '不論N、與N無關（強調不受影響）。' },
    { pattern: 'N이/가 아닌 이상', topikLevel: 'TOPIK 5급', explanation: '除非不是N（書面語條件排除）。' },
    { pattern: 'V-는 만큼', topikLevel: 'TOPIK 5급', explanation: '因為～，所以相應地（程度相稱）。' },
    { pattern: 'V-다는 것을 감안하면', topikLevel: 'TOPIK 5급', explanation: '考慮到～（書面語，條件考量）。' },
    { pattern: 'V-는 것이야말로', topikLevel: 'TOPIK 5급', explanation: '正是～才是（強調真正重要之處）。' },
    { pattern: 'N을/를 전제로', topikLevel: 'TOPIK 5급', explanation: '以N為前提（書面語條件）。' },
    { pattern: 'V-아/어야 비로소', topikLevel: 'TOPIK 5급', explanation: '必須～才（能）終於（後才可能實現）。' },
    { pattern: 'N에 상응하는', topikLevel: 'TOPIK 5급', explanation: '與N相應的、配合N的（書面語）。' },
    { pattern: 'V-고 있는 추세이다', topikLevel: 'TOPIK 5급', explanation: '正有～的趨勢（書面語描述趨向）。' },
    { pattern: 'N에 버금가다', topikLevel: 'TOPIK 5급', explanation: '接近N、幾乎與N相當（書面語）。' },
    { pattern: 'V-기를 주저하지 않다', topikLevel: 'TOPIK 5급', explanation: '毫不猶豫地～（果斷行動）。' },
    { pattern: 'V-는 실정이다', topikLevel: 'TOPIK 5급', explanation: '現況是～（書面語描述現狀）。' },
    { pattern: 'V-았/었음에도 불구하고', topikLevel: 'TOPIK 5급', explanation: '儘管已經～（書面語讓步，事與願違）。' },
    // ── TOPIK 6급 追加 (20) ──
    { pattern: 'V-는 체하다', topikLevel: 'TOPIK 6급', explanation: '假裝～（裝作有某狀態）。' },
    { pattern: 'N에 이르기까지', topikLevel: 'TOPIK 6급', explanation: '直到N為止、乃至於N（書面語，範圍廣泛）。' },
    { pattern: 'V-는가에 달려 있다', topikLevel: 'TOPIK 6급', explanation: '取決於是否～（書面語，核心條件）。' },
    { pattern: 'V-아/어 왔다', topikLevel: 'TOPIK 6급', explanation: '一直以來～（書面語，強調長期持續性）。' },
    { pattern: 'V-기를 촉구하다', topikLevel: 'TOPIK 6급', explanation: '促請做～、敦促（書面語，要求行動）。' },
    { pattern: 'V-아/어야 할 까닭이 없다', topikLevel: 'TOPIK 6급', explanation: '沒有理由必須～（書面語，否定義務）。' },
    { pattern: 'N을/를 전제로 하다', topikLevel: 'TOPIK 6급', explanation: '以N為前提（書面語，設定條件）。' },
    { pattern: 'N에 상응하여', topikLevel: 'TOPIK 6급', explanation: '相應於N地（書面語，對等關係）。' },
    { pattern: 'V-고 있는 추세에 있다', topikLevel: 'TOPIK 6급', explanation: '正處於～趨勢中（書面語，更正式的趨勢表達）。' },
    { pattern: 'N에 의거한', topikLevel: 'TOPIK 6급', explanation: '依據N的（書面語修飾，法律或規定）。' },
    { pattern: 'V-(으)ㄹ 수밖에 없는 처지이다', topikLevel: 'TOPIK 6급', explanation: '處於只能～的處境（書面語，強調無奈）。' },
    { pattern: 'V-기 위한 노력을 기울이다', topikLevel: 'TOPIK 6급', explanation: '為了做～而努力（書面語，積極姿態）。' },
    { pattern: 'V-는 양상을 띠다', topikLevel: 'TOPIK 6급', explanation: '呈現出～的樣態（書面語，比보이다更正式）。' },
    { pattern: 'V-는 것이 불가피한 상황이다', topikLevel: 'TOPIK 6급', explanation: '處於～是不可避免的情況（書面語，強調必然性）。' },
    { pattern: 'V-고야 하다', topikLevel: 'TOPIK 6급', explanation: '最終一定要～（書面語，強調必然完成）。' },
    { pattern: 'V-는 것을 당연시하다', topikLevel: 'TOPIK 6급', explanation: '將～視為理所當然（書面語）。' },
    { pattern: 'N에 비추어 볼 때', topikLevel: 'TOPIK 6급', explanation: '從N的角度看來（書面語，參照依據）。' },
    { pattern: 'V-는 데 앞장서다', topikLevel: 'TOPIK 6급', explanation: '帶頭做～、在～方面領先（書面語）。' },
    { pattern: 'V-는 것에 다름 아니다', topikLevel: 'TOPIK 6급', explanation: '無異於～、就等於是（書面語，強調等同）。' },
    { pattern: 'V-기에 족하다', topikLevel: 'TOPIK 6급', explanation: '足以～、夠用來～（書面語，充分性）。' },
  ],
};

// ─── Select 5 grammar items from pool based on article count ─────────────────
function selectGrammarBatch(pool, articleCount) {
  const start = articleCount * 5;
  if (start >= pool.length) {
    // All batches exhausted → random 5 from full pool
    return [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  }
  return pool.slice(start, start + 5);
}

// ─── Level descriptions ───────────────────────────────────────────────────────
const levelDescriptions = {
  '1-2': 'TOPIK I beginner (Level 1-2), ~200-250 Korean characters, at least 8 sentences, simple daily-life vocabulary',
  '3-4': 'TOPIK II intermediate (Level 3-4), ~320-400 Korean characters, at least 10 sentences, culture/travel/social topics',
  '5-6': 'TOPIK II advanced (Level 5-6), ~480-580 Korean characters, at least 12 sentences, technology/society/environment topics',
};

const VALID_LEVELS = ['1-2', '3-4', '5-6'];

// ─── Foreign-script validators ────────────────────────────────────────────────
// For Korean sentence fields: reject ALL non-Korean including Latin
function hasForeignScript(str) {
  for (const char of str) {
    const cp = char.codePointAt(0);
    if (cp <= 0x20) continue;
    if (cp >= 0x21 && cp <= 0x40) continue;   // punctuation & numbers (not A-Z)
    if (cp >= 0x5B && cp <= 0x60) continue;   // [ \ ] ^ _ `
    if (cp >= 0x7B && cp <= 0x7E) continue;   // { | } ~
    if (cp >= 0x1100 && cp <= 0x11FF) continue;
    if (cp >= 0x3130 && cp <= 0x318F) continue;
    if (cp >= 0x4E00 && cp <= 0x9FFF) continue;
    if (cp >= 0xAC00 && cp <= 0xD7A3) continue;
    if (cp >= 0xFF01 && cp <= 0xFF60) continue;
    if (cp === 0x00B7 || cp === 0x2026) continue;
    if (cp >= 0x2018 && cp <= 0x201F) continue;
    if (cp >= 0x3001 && cp <= 0x3002) continue;
    return true;
  }
  return false;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { level, articleCount = 0 } = req.body;

  if (!VALID_LEVELS.includes(level)) {
    return res.status(400).json({ error: '無效的程度' });
  }
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: '伺服器未設定 GROQ_API_KEY。' });
  }

  // Select the 5 grammar items for this article
  const selectedGrammar = selectGrammarBatch(grammarPool[level], articleCount);
  const grammarList = selectedGrammar
    .map((g, i) => `${i + 1}. Pattern: "${g.pattern}" (${g.topikLevel}) — ${g.explanation}`)
    .join('\n');

  const prompt = `You are a TOPIK Korean language teaching expert. Generate a Korean reading article for TOPIK Level ${level} learners.

Level requirements: ${levelDescriptions[level]}

YOU MUST USE ALL 5 of the following grammar patterns naturally in the article content:
${grammarList}

Return ONLY a valid JSON object with NO extra text, NO markdown, NO code fences:

{
  "title": "봄의 기쁨",
  "content": "봄이 오면 사람들은 기뻐합니다. ...(at least required length, uses all 5 grammar patterns)...",
  "vocabulary": [
    { "korean": "동네", "romanization": "dongne", "meaning": "社區", "example": "우리 동네는 조용합니다.", "exampleTranslation": "我們的社區很安靜。" }
  ],
  "grammarExamples": [
    { "example": "sentence using grammar pattern 1", "exampleTranslation": "Chinese translation" },
    { "example": "sentence using grammar pattern 2", "exampleTranslation": "Chinese translation" },
    { "example": "sentence using grammar pattern 3", "exampleTranslation": "Chinese translation" },
    { "example": "sentence using grammar pattern 4", "exampleTranslation": "Chinese translation" },
    { "example": "sentence using grammar pattern 5", "exampleTranslation": "Chinese translation" }
  ],
  "questions": [
    { "question": "...", "options": ["a", "b", "c", "d"], "answerIndex": 0 }
  ]
}

Requirements:
- content: at least the required length, must use all 5 grammar patterns
- vocabulary: EXACTLY 10 items with romanization
- grammarExamples: EXACTLY 5 items, in the SAME ORDER as the 5 grammar patterns listed above; each example sentence must naturally use that grammar pattern
- questions: EXACTLY 4 items with answerIndex as a number (0-3)
- All meanings and translations must be in Traditional Chinese (繁體中文)
- CRITICAL: "content", "example" (vocabulary), and "example" (grammarExamples) must contain ONLY Korean (한글), numbers, spaces, and Korean punctuation. NO Latin, Arabic, Japanese, or any foreign language words.`;

  async function attemptGenerate(client) {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0].message.content ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw Object.assign(new Error('AI 回傳格式錯誤'), { retryable: true });

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate Korean-only sentence fields
    const sentenceFields = [
      parsed.title,
      parsed.content,
      ...(parsed.vocabulary ?? []).map(v => v.example),
      ...(parsed.grammarExamples ?? []).map(g => g.example),
    ];
    if (sentenceFields.some(hasForeignScript)) {
      throw Object.assign(new Error('AI 生成內容含有非韓文字元'), { retryable: true });
    }

    // Merge: server-provided grammar metadata + AI-generated examples
    const grammar = selectedGrammar.map((libItem, i) => ({
      pattern: libItem.pattern,
      topikLevel: libItem.topikLevel,
      explanation: libItem.explanation,
      example: parsed.grammarExamples?.[i]?.example ?? '',
      exampleTranslation: parsed.grammarExamples?.[i]?.exampleTranslation ?? '',
    }));

    return { parsed, grammar };
  }

  const MAX_RETRIES = 3;
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { parsed, grammar } = await attemptGenerate(client);
      return res.json({
        id: `${level}-ai-${Date.now()}`,
        level,
        title: parsed.title,
        content: parsed.content,
        vocabulary: parsed.vocabulary,
        grammar,
        questions: parsed.questions,
        isAIGenerated: true,
      });
    } catch (e) {
      lastError = e;
      if (!e.retryable) break;
    }
  }

  res.status(500).json({ error: lastError?.message ?? 'AI 生成失敗，請重試。' });
}
