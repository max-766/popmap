import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dummyData = [
  {
    name: "東京都 杉並区",
    year: 2020,
    total: 567000,
    japanese: 548000,
    foreign: 19000,
    rate: 3.3,
    trend: "増加中",
  },
  {
    name: "大阪府 西成区",
    year: 2020,
    total: 110000,
    japanese: 100000,
    foreign: 10000,
    rate: 9.1,
    trend: "横ばい",
  },
];

export default function PopulationMap() {
  const [query, setQuery] = useState("");
  const filtered = dummyData.filter((item) => item.name.includes(query));

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">市区町村人口ビジュアライザー</h1>
      <Input
        placeholder="市区町村名で検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((item, index) => (
        <Card
          key={index}
          className="relative bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
          <CardContent className="p-4 bg-black/50 rounded-xl">
            <h2 className="text-lg font-semibold">{item.name}（{item.year}年）</h2>
            <p>総人口：{item.total.toLocaleString()}人</p>
            <p>日本人：{item.japanese.toLocaleString()}人</p>
            <p>外国人：{item.foreign.toLocaleString()}人（{item.rate}%）</p>
            <p>傾向：{item.trend}</p>
            <Button className="mt-2" variant="outline">詳細を見る</Button>
          </CardContent>
        </Card>
      ))}

      {filtered.length === 0 && <p className="text-sm text-gray-500">該当する市区町村が見つかりません。</p>}
    </div>
  );
}
