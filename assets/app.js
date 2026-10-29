'use strict';
const products=[
{id:'clear',name:'UVデイクリーム＆ベース',sp:'SPF45 PA++',color:'透明・色なし',finish:'さらっと軽やか',use:'顔・全身',size:'30g',price:'5,720円',url:'https://www.triplesun.co.jp/shop/products/ec_550_single',description:'ベーシックな透明UV。色をつけずにUVケアしたい方に。',kind:'clear',photo:'product_clear.webp'},
{id:'sp',name:'UVデイクリーム＆ベースSP',sp:'SPF45 PA++',color:'透明・色なし',finish:'より軽い、さっぱりタイプ',use:'顔・全身',size:'45g',price:'7,150円',url:'https://www.triplesun.co.jp/shop/products/ec_1016_single',description:'さらに軽い付け心地。顔はもちろん、全身にも。',kind:'clear',photo:'product_sp.webp'},
{id:'tint',name:'カラーUV＆ベース',sp:'SPF50 PA+++（公式表記の確認中）',color:'イエロー系ベージュ',finish:'自然なカバー感',use:'顔・化粧下地',size:'30g',price:'5,830円',url:'https://www.triplesun.co.jp/shop/products/ec_549_single',description:'軽いカバー力と自然なベージュを求める方に。',kind:'tinted',photo:'product_tint.webp'},
{id:'tint45',name:'カラーUV＆ベース45g',sp:'SPF50 PA+++（公式表記の確認中）',color:'ピンク系ベージュ',finish:'素肌感を演出',use:'顔・化粧下地',size:'45g',price:'7,700円',url:'https://www.triplesun.co.jp/shop/products/ec_236_single',description:'ピンク系ベージュ。容量も重視したい方に。',kind:'tinted',photo:'product_tint45.webp'}
];
function productCard(p,mode){let shop=mode==='shop';return `<article class="product-card"><div class="product-image"><img src="assets/${p.photo}" alt="${p.name}（お客様提供の4商品集合写真から切り出し）" loading="lazy" decoding="async"><small>ご提供写真より</small></div><div class="product-details"><span class="product-kicker">${p.kind==='clear'?'CLEAR TYPE':'TINTED TYPE'}</span><h3>${p.name}</h3><p class="product-desc">${p.description}</p><dl><div><dt>UV</dt><dd>${p.sp}</dd></div><div><dt>色</dt><dd>${p.color}</dd></div><div><dt>仕上がり</dt><dd>${p.finish}</dd></div><div><dt>用途</dt><dd>${p.use}</dd></div><div><dt>容量</dt><dd>${p.size}</dd></div></dl><div class="price">税込 <strong>${p.price}</strong> <small>通常価格</small></div><a class="btn outline" href="${p.url}" target="_blank" rel="noopener noreferrer">公式商品ページで見る <span>↗</span></a></div></article>`}
document.getElementById('clearCards').innerHTML=products.filter(p=>p.kind==='clear').map(p=>productCard(p)).join('');
document.getElementById('tintedCards').innerHTML=products.filter(p=>p.kind==='tinted').map(p=>productCard(p)).join('');
document.getElementById('shopCards').innerHTML=products.map(p=>productCard(p,'shop')).join('');
const questions=[{q:'主にどこに使いたい？',opts:[['face','顔を中心に'],['body','顔とボディ'] ]},{q:'好みの仕上がりは？',opts:[['clear','色をつけない透明タイプ'],['tinted','自然な色付きタイプ']]},{q:'いちばん重視したいのは？',opts:[['light','軽やかな使い心地'],['cover','ナチュラルなカバー感'],['capacity','使いやすい容量']]}];
let step=0,answers=[];const q=document.getElementById('question'),opts=document.getElementById('options'),res=document.getElementById('result');function pick(){
  const [use,color,priority]=answers;
  let id,advice='';
  // 顔とボディを一品でケアしたい場合は、全身使用が公式に明記された透明タイプを優先。
  if(use==='body'){
    id=priority==='light'||priority==='capacity'?'sp':'clear';
    if(color==='tinted') advice='顔は色付きタイプ、首元やボディには透明タイプという使い分けもおすすめです。全身への使用が公式に案内されている透明タイプをご紹介します。';
  }else if(color==='tinted'){
    id=priority==='capacity'?'tint45':'tint';
    advice='カラーUVの30gはイエロー系ベージュ、45gはピンク系ベージュです。容量だけでなく色味を確認して選んでください。';
    if(priority==='light') advice='カラーUVの色味と、透明SPタイプの軽い付け心地を比較してお選びください。';
  }else{
    id=priority==='light'||priority==='capacity'?'sp':'clear';
    if(priority==='capacity') advice='透明タイプの30gとSPの45gは、容量だけでなく使い心地も異なります。';
  }
  return {product:products.find(p=>p.id===id),advice};
}
function show(){const complete=step===3;document.getElementById('stepLabel').textContent=complete?'YOUR RESULT':`QUESTION 0${step+1} / 03`;document.getElementById('progress').style.width=(complete?100:(step+1)*33.333)+'%';q.hidden=complete;opts.hidden=complete;res.hidden=!complete;document.getElementById('prev').hidden=step===0;if(complete){const {product:p,advice}=pick();res.innerHTML=`<p class="eyebrow">YOUR UV MATCH</p><h3>${p.name}</h3><p>${p.description}</p>${advice?`<p class="caveat">${advice}</p>`:''}<p><b>${p.sp} / ${p.size} / 税込${p.price}</b></p><a class="btn dark" href="${p.url}" target="_blank" rel="noopener noreferrer">おすすめ商品の詳細を見る ↗</a><p class="fine">この診断は公式商品説明に基づく簡易ガイドです。色味や仕上がりの好みには個人差があります。</p>`;return;}q.textContent=questions[step].q;opts.innerHTML=questions[step].opts.map(([v,label])=>`<button type="button" data-value="${v}">${label}<span>↗</span></button>`).join('');opts.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{answers[step]=b.dataset.value;step++;show()}));}document.getElementById('prev').addEventListener('click',()=>{step=Math.max(0,step-1);show()});document.getElementById('reset').addEventListener('click',()=>{step=0;answers=[];show()});show();
