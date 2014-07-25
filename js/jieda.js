KISSY.ready(function(S){
	var S = KISSY;
	var $ = jQuery;
KISSY.use('dom,anim,ajax,cookie,gallery/slide/1.0/',function(S,DOM,Anim,IO,Cookie,Slide){
	var E = S.Event,
		scrollY=0,  //滚动条高度
		windowH, //窗体高度
		onupdate,
		control,
		onupdate,
		windowH,
		time,
		prev,
		iniTop=[0,0,0,0,0,0],
		box_toTop=[0,0,0,0,0,0];
	//视差	
	

	//云动画
	var cloud=S.query('.cloud'),
		open1=false,open2=true,
		anim=new Array();
		anim2=new Array();
		mL1=[-700,-800,600,700],
		mL2=[-500,-460,270,400];

	for(var i=0;i<cloud.length;i++){
		anim[i]=S.Anim(cloud[i],{marginLeft:mL1[i]+'px',filter:'alpha(opacity=0)',opacity:0},1,"easeOutStrong");
		anim2[i]=S.Anim(cloud[i],{marginLeft:mL2[i]+'px',filter:'alpha(opacity=100)',opacity:1},2,"easeOutStrong");
	}

	//太阳
	var sunMov = S.one(".sun");
	S.Anim(sunMov,{top:"100px",left:"280px"},2,"ease").run();
	S.Anim(sunMov,{top:"250px",left:"100px"},3,"ease").run();


	$('.arrow').jrumble({
		x: 0,
		y: 10,
		rotation: 1,
		speed:100
	});
	$('.arrow').trigger('startRumble');

	$('.wing').jrumble({
		x: 10,
		y: 10,
		rotation: 1,
		speed:150
	});
	$('.wing').trigger('startRumble');

	//回顶部
	var toTop=S.get('.toTop');
	E.on(toTop,'click',function(){
		window.scrollTo(0,0);
	});

	$('.try').hover(function(){
		$(this).jrumble({
			x: 3,
			y: 2,
			rotation: 1
		});
		$(this).trigger('startRumble');
	}, function(){
		$(this).trigger('stopRumble');
	});


	jQuery.fn.parallax = function(options) {
		return this.each(function(){
			var settings = {
				onupdate: function(){}
			};
			if(options){
				$.extend(settings,options);
			}
			onupdate=settings.onupdate;
			
			$(window).resize(function(){
				windowH = $(window).height();
				//windowH >1000 ? : $('#parallax').css({height: 5000+windowH});
			}).resize();
			//$('#parallax').css({height: 1990}) 	
			/*$(document).mousewheel(function(e, delta){
				window.scrollBy(0,delta * -100);
			});*/
			
			time = setInterval(parallax_update, 1000/30); 
		});
	}


	function parallax_update(){
	    scrollY= window.scrollY!=undefined ? window.scrollY : window.pageYOffset;
	    scrollY= scrollY!=undefined ? scrollY : document.documentElement.scrollTop;
	    control=(windowH/2)+scrollY;
		
	    control -= 480;
	    xjb_windowOffset = (windowH - 960) / 2;
	    control -= xjb_windowOffset;
		
		
		box_toTop[0]=control*0.1;  //背景
		box_toTop[1]=control*0.2;  //上左右树叶
		box_toTop[2]=control*-0.1;  //下左右树叶
		box_toTop[3]=control*0.6;  //左红车
		box_toTop[4]=control*0.9; //左白车
		box_toTop[5]=control*-0.5; //右白车
		
		
		
		for(var i=0;i<6;i++){
			var diff=Math.round(iniTop[i] -box_toTop[i]);
			iniTop[i]-=diff/8;
			iniTop[i]=(iniTop[i]-(scrollY/8));
		}
		
		
	    if(diff != prev){
	    	
			for(var i=0;i<6;i++){
				var top=iniTop[i]+'px';
	        	document.getElementById("parallax"+i).style.top=top;
			}
			onupdate();
			prev = diff;
	    }
	}




	
	/*window.onscroll=function(){
		scrollY= window.scrollY!=undefined ? window.scrollY : window.pageYOffset;
	    scrollY= scrollY!=undefined ? scrollY : document.documentElement.scrollTop;
	    //line.move(parseInt(document.body.scrollTop)*0.5);
		//console.log(line.getIndex());
		//updateMasks();
	}*/

	//初始化
	$("#parallax").parallax({
		onupdate: updateMasks
	});

	function updateMasks(){	

	//云动画	
		if(scrollY>=100 && open1==false){
			for(var i=0;i<cloud.length;i++){
				anim2[i].stop(finish=true);
				anim[i].run();
			}
			open1=true;
			open2=false;
		}else if(scrollY<100 && open2==false){
			for(var j=0;j<cloud.length;j++){
				anim[j].stop(finish=true);
				anim2[j].run();
			}
			open1=false;
			open2=true;
		}

		/*var car=S.all(".jiedacar");
		scrollY>=200 ? (car.fadeOut(.5)):(car.fadeIn(.5));*/
	}


//时光机
var machineslide = new Slide('timeMachine',{
		autoSlide:true,
		effect:'hSlide',
		timeout:5000,
		speed:350,
		selectedClass:'m_hover',
		navClass:'orderUl',
		contentClass:'machinePlay',
		pannelClass:'textLi',
		touchmove:true,
		layerSlide:true,
		hoverStop:true
	}); //end slide

var step = 0;
var html ="";

switch(step){
	case 0:;
	case 1:;
	case 2:;
	case 3:;
}




//获奖名单动画
autoMove=function(id){ this.initialize(id)};
	autoMove.prototype={
		initialize:function(id){
			var _this=this;
			this.move=S.get("."+id);
			this.listbox1=S.query(".listbox",this.move)[0];
			this.listbox2=S.query(".listbox",this.move)[1];

			if(this.listbox1.offsetHeight>this.move.offsetHeight){
				this.timer=null;
				this.listbox2.innerHTML=this.listbox1.innerHTML;
				this.timer=setInterval(function(){_this.toMove()},100);
				E.on(_this.move,"mouseover",function(){
					clearInterval(_this.timer);
				})
				E.on(_this.move,"mouseout",function(){
					_this.timer=setInterval(function(){_this.toMove()},100);
				})
			}
		},
		toMove:function(){
			if(this.listbox2.offsetTop-this.move.scrollTop<=0){
				this.move.scrollTop-=this.listbox1.offsetHeight;
			}else{
				this.move.scrollTop++;
			}
		}
	}
	new autoMove("listmove");
	
	S.all(".close").on("click", function(){
          S.DOM.css(popupBox, {display:"none"});
        });

	var slide = new Slide('activityAd',{
		autoSlide:true,
		effect:'hSlide',
		timeout:5000,
		speed:350,
		selectedClass:'slide_hover',
		navClass:'countUl',
		contentClass:'autoSlide',
		pannelClass:'imgLi',
		touchmove:true,
		layerSlide:true,
		hoverStop:true
	}); //end slide

	
		

});

 KISSY.config({
        debug: true,
        packages: [ 
          {
            name: "mmcomponents",
            path: "http://g.tbcdn.cn/mm/mamacomponent/0.0.6/",
            combine:false
          }
        ]
      });

 //抽奖
KISSY.use("mmcomponents/mamaNineLottery/index,mmcomponents/mamaShare/index", function(S, mmLottery,mmShare){
			//奖品
		var adwardArray = {
		  "韩国首尔之旅"    :{luckItem: [0],popupItem: 7},
		  "泰国普吉岛之旅" :{luckItem: [9],popupItem: 6},
		  "马尔代夫之旅":{luckItem: [7],popupItem: 4},
		  "奥地利-法国之旅" :{luckItem: [2],popupItem: 5},
		  "美国东部之旅" :{luckItem: [6],popupItem: 1},
		  "捷达车模"  :{luckItem: [3],popupItem: 2},
		  "精美T恤"  :{luckItem: [8],popupItem: 3},
		  "雨伞"  :{luckItem: [10],popupItem: 3},
		  "购物袋"  :{luckItem: [11],popupItem: 3},
		  "谢谢参与"    :{luckItem: [1, 4, 5],popupItem: 0},
		};
		//抽奖弹窗，与抽奖器运行无关
		var popupBox = $(".luckPopup");

		//初始化
		var mLottery = new mmLottery({
		  app        : 'jieda',
		  luckName   : "lottery-luck",
		  luckNum    : 12,
		  adwardArray: adwardArray,
		  luckShade  : "luck-shade",
		  rollRule   : [0,1,2,3,5,7,11,10,9,8,6,4], 
		  luckActive : "luck-active"
		});


		var mShare = new mmShare({
			  pageUrl : "http://www.taobao.com/market/alimama/chowsangsang14214.php",
			  clientId: "180568",
			  success:function(){
			  	//alert("good");
			  	//抽奖
					mLottery.run({
					  success: function(data){
					    //中奖
					    $(popupBox[adwardArray[data.name].popupItem]).show();//弹窗，仅供参考
					  },
					  fail: function(){
					    //未中奖
					    $(popupBox[adwardArray["谢谢参与"].popupItem]).show();//同上
					  },
					  error: function(error, value){
					    //出错
					    if(error == "EW01"){
					      //过滤错误码
					      //达到每天中奖次数
					      $(popupBox[adwardArray["谢谢参与"].popupItem]).show();//同上
					    }else{
					      alert(value);
					    }
					  }
					});

			  }
			});

			S.one(".lotteryBtn").on("click", function(){
			  mShare.show({
			    site   : "sina",
			    comment: "亲们，我参加了#捷达带您游世界#活动，有机会免费畅游时尚的首尔、风情的普吉岛、浪漫的马尔代夫、奥地利、法国、德国",
			    title  : "捷达",
			    pic    : "http://gtms03.alicdn.com/tps/i3/T12UDkFupcXXXmVhsr-214-214.png",
			  });
			})


	});// en lottery

	

});//the end
