//横向自动滚动轮播
document.querySelectorAll('.auto-scroll').forEach(item=>{
  let speed =1.2;
  function autoRoll(){
    item.scrollLeft += speed;
    if(item.scrollLeft >= item.scrollWidth/2){
      item.scrollLeft =0;
    }
  }
  let timer = setInterval(autoRoll,35);
})
//回到顶部
window.onscroll = function(){
  let topBtn = document.getElementById('backTop');
  if(topBtn){
    topBtn.style.display = window.scrollY>300 ? 'block':'none';
  }
}
function backTop(){
  window.scrollTo({top:0,behavior:'smooth'})
}

//本地存储：盲盒收集卡池、抽奖次数
const STORAGE_KEY = "heritageCard";
const DRAW_KEY = "drawNum";
//9项非遗卡名称
const cardList = [
  "河北蔚县剪纸","苏州苏绣","北京京剧","景德镇制瓷","古琴艺术",
  "江西南丰傩舞","陕西华阴老腔","广西壮锦","湘西踏虎凿花"
];
//初始化本地数据
if(!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY,JSON.stringify([]));
if(!localStorage.getItem(DRAW_KEY)) localStorage.setItem(DRAW_KEY,"2");

//随机抽卡（不重复）
function randomDraw(){
  let own = JSON.parse(localStorage.getItem(STORAGE_KEY));
  let left = cardList.filter(item=>!own.includes(item));
  if(left.length===0){
    alert("已集齐全部9张卡片，解锁全套3D非遗手办！");
    return null;
  }
  let res = left[Math.floor(Math.random()*left.length)];
  own.push(res);
  localStorage.setItem(STORAGE_KEY,JSON.stringify(own));
  return res;
}
//消耗抽奖次数
function useDraw(){
  let num = Number(localStorage.getItem(DRAW_KEY));
  if(num<=0){
    alert("抽奖次数不足，完成非遗答题获取次数！");
    return false;
  }
  localStorage.setItem(DRAW_KEY,num-1);
  return true;
}
//答题增加抽奖次数
function addDraw(n=1){
  let num = Number(localStorage.getItem(DRAW_KEY));
  localStorage.setItem(DRAW_KEY,num+n);
}

//DIY颜色切换
function changeColor(obj,color){
  obj.style.backgroundColor = color;
}

//留言本地存储
const MSG_KEY = "heritageMsg";
if(!localStorage.getItem(MSG_KEY)) localStorage.setItem(MSG_KEY,JSON.stringify([]));
function saveMsg(name,text){
  let arr = JSON.parse(localStorage.getItem(MSG_KEY));
  arr.push({name,text,time:new Date().toLocaleString()});
  localStorage.setItem(MSG_KEY,JSON.stringify(arr));
  renderMsg();
}
function renderMsg(){
  let wrap = document.getElementById("msgWrap");
  if(!wrap) return;
  let arr = JSON.parse(localStorage.getItem(MSG_KEY));
  wrap.innerHTML = "";
  arr.forEach(item=>{
    let div = document.createElement("div");
    div.style="padding:10px;border-bottom:1px solid #eee;margin:8px 0";
    div.innerHTML = `<b>${item.name}</b>【${item.time}】：${item.text}`;
    wrap.appendChild(div);
  })
}
window.onload = function(){renderMsg();}