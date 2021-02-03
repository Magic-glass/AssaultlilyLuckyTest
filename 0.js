/*
*原版那个js太长了
*重写后去掉了一些特别日期的判定
*/

//=========随机内容begin=========
//发生的事
var things = [
	//{name:"",good:"",bad:""},
	{name:"抽卡",good:"金色传说！",bad:"给你个四星都嫌多"},
	{name:"charm出力",good:"+3+3+3+3+3",bad:"-1-1-1-1-1"},
	{name:"外征",good:"掉了好多粉红色的东西",bad:"怎么队友是8个cpu"},
	{name:"团队战",good:"PPPPPPPPP V P",bad:"P V PPPPPPPPP"},
	{name:"摸鱼",good:"辣鸡游戏，毁我青春",bad:"你已被移出工会"},
	{name:"爆肝",good:"氪佬在肝帝面前只是渣渣",bad:"服务站怎么又炸了"},
	{name:"氪金",good:"今天的你又变强了",bad:"余额不足"},
	{name:"推图",good:"全是稀有掉落",bad:"你auto又猝死了"},
	{name:"手操Hard",good:"一遍过",bad:"打完就掉线"},
	{name:"洗词条",good:"atk+1900,def+1900",bad:"exp+1%,coin+1%"},
	{name:"强化",good:"大成功",bad:"大浪费"},
	{name:"匹配共斗",good:"毕业大佬带飞",bad:"weak：1"},
	{name:"刷本",good:"这游戏真休闲",bad:"怎么一个掉落都没有"},
	{name:"charm突破",good:"不用看概率，必上",bad:"先准备他十来个素材吧"},
	{name:"水群",good:"龙王出没",bad:"又要被大佬按在地上摩擦了"},
	{name:"补番",good:"老婆真棒！",bad:'"你为什么还看小孩子的动画片"'},
];
//方位
var directions = [
    "北方","东北方","东方","东南方","南方","西南方","西方","西北方","地面","头顶"
];
var lilys = [
	"一柳梨璃","白井梦结","枫·J·努韦尔","二川二水","安藤鹤纱","吉村·Thi·梅","郭神琳","王雨嘉","米莉亚姆"
];
//=========随机内容end=========

/****************
*以当天日期为seed伪随机
*seed必须为全局变量
*区间[min,max)
/****************/
var today = new Date();
var seed = Number(""+today.getFullYear()+today.getMonth()+today.getDate());
function seededRandom(max,min) { 
    max = max || 1;
    min = min || 0; 
    seed = (seed * 9301 + 49297) % 233280; 
    let rnd = seed / 233280.0;
	//console.log(rnd);
    return parseInt(min + rnd * (max - min)); 
};
function add_to_good_or_bad(target,content){
	$('.'+target+' .content ul').append('<li><div class="name">' + content.name + '</div><div class="description">' + content[target] + '</div></li>');
}
function add_to_tips(target,content){
	$(target).html(content);
}
function kira_kira(num){
	let result = "";
	let i = 0;
	while (i < num){
		result += "★";
		i++;
	}while(i < 5){
		result += "☆";
		i++;
	}return result;
}
function lucky_or_unfortunately(){
	//挑选词条
	//宜1-4个，忌1-3个
	lucky_count = seededRandom(5,1);
	unfortunately_count = seededRandom(4,1);
	for(let i = 0;i<lucky_count;i++){
		let temp = seededRandom(things.length,0);
		add_to_good_or_bad("good",things[temp]);
		//将已经选进的对象移除
		things.splice(temp,1);
	}
	for(let i = 0;i<unfortunately_count;i++){
		let temp = seededRandom(things.length,0);
		add_to_good_or_bad("bad",things[temp]);
		things.splice(temp,1);
	}
}
$(document).ready(function(){
	lucky_or_unfortunately();
	var weeks = ["日","一","二","三","四","五","六"];
	add_to_tips(".date",today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 | 星期" + weeks[today.getDay()]);
	add_to_tips(".lucky_star",kira_kira(seededRandom(5,1)));
	add_to_tips(".lucky_lily",lilys[seededRandom(lilys.length,0)]);
	add_to_tips(".direction_gacha",directions[seededRandom(directions.length,0)]);
});