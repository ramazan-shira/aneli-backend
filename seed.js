import { connectDB } from './config.js';
import Product from './models/Product.js';

const bottle = (bg, cap, label, h = 250, tin = false) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${bg}'/><stop offset='1' stop-color='#1f2810'/></linearGradient>
<linearGradient id='o' x1='0' x2='1'><stop offset='0' stop-color='#9bb02e'/><stop offset='.5' stop-color='#e8c547'/><stop offset='1' stop-color='#7a8f1f'/></linearGradient></defs>
<rect width='500' height='500' fill='url(#g)'/><ellipse cx='250' cy='440' rx='120' ry='14' fill='#000' opacity='.3'/>
${tin ? `<rect x='160' y='120' width='180' height='320' rx='14' fill='url(#o)'/><rect x='200' y='90' width='100' height='40' rx='8' fill='${cap}'/>`
 : `<rect x='225' y='60' width='50' height='55' rx='8' fill='${cap}'/><path d='M228 112h44v50c40 30 55 60 55 110v140a22 22 0 0 1-22 22H195a22 22 0 0 1-22-22V272c0-50 15-80 55-110z' fill='url(#o)'/>`}
<rect x='190' y='${tin ? 230 : 290}' width='120' height='${h / 2}' rx='6' fill='#F4ECD3'/>
<text x='250' y='${tin ? 285 : 345}' text-anchor='middle' font-family='Georgia,serif' font-size='30' fill='#2B3510'>Anéli</text>
<text x='250' y='${tin ? 312 : 372}' text-anchor='middle' font-family='Georgia,serif' font-size='13' fill='#6B7F23'>${label}</text>
<path d='M205 190c-8 40-8 120 0 170' stroke='#fff' stroke-width='6' opacity='.25' fill='none' stroke-linecap='round'/></svg>`)}`;

const products = [
  { name: 'Extra Virgin Olive Oil 250ml', description: 'A small bottle that keeps the character of the olive. Good for gifts and for trying Anéli.', price: 6.5, badge: '', image: bottle('#6B7F23', '#222', 'EXTRA VIRGIN 250ml') },
  { name: 'Extra Virgin Olive Oil 500ml', description: 'Our everyday bottle. Olive oil made with care, with the taste of the land it comes from.', price: 9.5, badge: 'Bestseller', image: bottle('#4B5A1C', '#222', 'EXTRA VIRGIN 500ml') },
  { name: 'Extra Virgin Olive Oil 750ml', description: 'The same oil in a larger bottle for the family table.', price: 13, badge: '', image: bottle('#B8860B', '#222', 'EXTRA VIRGIN 750ml') },
  { name: 'Extra Virgin Olive Oil 1L', description: 'The same oil in a 1 litre bottle for everyday cooking.', price: 17, badge: '', image: bottle('#2B3510', '#222', 'EXTRA VIRGIN 1L') },
  { name: 'Olive Oil Tin 3L', description: 'A large light-proof tin for restaurants and big families.', price: 46, badge: 'Best value', image: bottle('#6B7F23', '#2B3510', 'EXTRA VIRGIN 3L', 250, true) },
  { name: 'Limited Batch 250ml', description: 'A small batch in a small bottle, made in limited quantity.', price: 11, badge: 'Limited', image: bottle('#4B5A1C', '#2B3510', 'LIMITED BATCH') },
  { name: 'Selected Reserve 500ml', description: 'Our selected oil in a 500ml bottle, for special occasions.', price: 14.5, badge: 'Selected', image: bottle('#B8860B', '#2B3510', 'RESERVE') },
  { name: 'Lemon-Infused Oil 250ml', description: 'Olive oil flavoured with lemon. Good on fish, salads and desserts.', price: 8.5, badge: '', image: bottle('#2B3510', '#222', 'LEMON') },
  { name: 'Oregano-Infused Oil 250ml', description: 'Olive oil flavoured with oregano. Good on grilled meat, feta and tomatoes.', price: 8.5, badge: '', image: bottle('#6B7F23', '#222', 'OREGANO') },
  { name: 'Gift Box (3 × 250ml)', description: 'Three of our oils in a gift box, ready to give.', price: 26, badge: 'Gift', image: bottle('#4B5A1C', '#2B3510', 'GIFT BOX') },
  { name: 'Table Olives 500g', description: 'Table olives in a glass jar.', price: 7, badge: '', image: bottle('#B8860B', '#222', 'TABLE OLIVES 500g') },
  { name: 'Olive Oil Soap, 3 bars', description: 'Plain soap bars made with olive oil. No added fragrance.', price: 9, badge: '', image: bottle('#2B3510', '#222', 'SOAP') },
];
await connectDB();
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products`);
process.exit(0);
