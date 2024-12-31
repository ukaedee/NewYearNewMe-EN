export interface Result {
  text: string;
  textLines: string[];
  description: string;
  descriptionLines: string[];
  video: `result-${1 | 2 | 3 | 4 | 5 | 6 | 7}.mp4`;
}

export const results: Result[] = [
  {
    text: "次の電車は、スマホ封印でいこ！",
    description: "次の電車は、スマホ封印でいこ！",
    video: "result-1.mp4" as const,
    textLines: ["次の電車は、","スマホ封印でいこ！"],
    descriptionLines: [
      "窓の外とか人間観察してたら、",
      "意外とリフレッシュできるかも！",
      "目的地つくまで、ぼーっとしてみよ",
    ]
  },
  {
    text: "一駅手前で降りて、マップに頼らず帰ってみよ！",
    description: "一駅手前で降りて、マップに頼らず帰ってみよ！",
    video: "result-2.mp4" as const,
    textLines: ["一駅手前で降りて、", "マップに頼らず帰ってみよ！"],
    descriptionLines: [
      "いつものルートじゃなくて、",
      "気まぐれで別の道歩いてみよう。",
      "寄り道して帰るのも",
      "たまには悪くないんじゃない？"
    ]
  },
  {
    text: "今日はイヤホン外して外の音きいてみよ！",
    description: "今日はイヤホン外して外の音きいてみよ！",
    video: "result-3.mp4" as const,
    textLines: ["今日はイヤホン外して", "外の音きいてみよ！"],
    descriptionLines: [
      "鳥の声・車の音とかの生活音を聞いて",
      "今の音ってなんだろとか考えながら",
      "ぼーっと過ごす時間も必要だと思うんだよね〜"
    ]
  },
 
  {
    text: "目線ちょっと下げて、足元の景色チェックしてみよ？",
    description: "目線ちょっと下げて、足元の景色チェックしてみよ？",
    video: "result-4.mp4" as const,
    textLines: ["目線ちょっと下げて、", "足元の景色チェックしてみよ？"],
    descriptionLines: [
      "地面の模様とか、葉っぱとか小石とか",
      "普段よりゆっくり歩いて、よーく見ると",
      "新しい発見があって面白いんだよね〜"
    ]
  },
  {
    text: "今日は視線ちょい上げで過ごしてこ！",
    description: "今日は視線ちょい上げで過ごしてこ！",
    video: "result-5.mp4" as const,
    textLines: ["今日は視線ちょい上げで", "過ごしてみよ！"],
    descriptionLines: [
      "天井や壁の模様、看板とか屋根とか",
      "どんな材質・色・模様なのか",
      "観察しながら歩くの楽しいんだよ！意外と！",
    ]
  },
  {
    text: "明日は早起きして美味しい朝ごはん食べに行かない？",
    description: "明日は早起きして美味しい朝ごはん食べに行かない？",
    video: "result-6.mp4" as const,
    textLines: ["明日は早起きして", "美味しい朝ごはん食べに行かない？"],
    descriptionLines: [
      "明日の朝食いいもの食べる！",
      "って決めたら明日が楽しみすぎない？！",
      "スワイプやめて、明日に向けて休もうぜ〜！"
    ]
  },
  {
    text: "次のごはんは、スマホ見ずに食べよ！",
    description: "次のごはんは、スマホ見ずに食べよ！",
    video: "result-7.mp4" as const,
    textLines: ["次のごはんは、", "スマホ見ずに食べよ！"],
    descriptionLines: [
      "なんか意識高めのやつとか思ったでしょ〜！",
      "ちゃんと色と向き合って、味わって食べたら",
      "自分に向き合う時間にもなるかな～って思うんだよね"

    ]
  },
 
]; 