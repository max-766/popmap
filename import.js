import { read, utils } from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const url = 'https://www.pref.hokkaido.lg.jp/fs/1/1/7/5/9/5/7/3/_/901brr2401n.xlsx';
const res = await fetch(url);
const buffer = await res.arrayBuffer();
const workbook = read(buffer, { type: 'buffer' });
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = utils.sheet_to_json(sheet, { defval: null, range: 4 });

const year = 2024;
const month = 1;
const source = '北海道庁R6人口';

// 必要に応じて市町村マスタから読み替えたい
const jisMap = {
  '夕張市': '01210',
  '岩見沢市': '01222',
  '美唄市': '01224',
  '芦別市': '01225',
  '赤平市': '01226'
  // 他市町村もあとで追加
};

for (const row of rows) {
  const name = row['Unnamed: 0'];
  if (!name || !name.match(/市|町|村/) || name.includes('計')) continue;

  const area_code = jisMap[name] || null;
  if (!area_code) {
    console.warn(`⚠ JISコード未定義: ${name}`);
    continue;
  }

  const { error } = await supabase.from('monthly_population').upsert({
    area_code,
    area_name: name,
    year,
    month,
    male_population: row['男'],
    female_population: row['女'],
    total_population: row['計'],
    households: row['Unnamed: 4'],
    source
  }, { onConflict: ['area_code', 'year', 'month'] });

  if (error) {
    console.error(`❌ ${name}:`, error.message);
  } else {
    console.log(`✅ ${name}: 登録完了`);
  }
}
