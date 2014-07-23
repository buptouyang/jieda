KISSY.ready(function(S){
	var S = KISSY;
KISSY.use('dom,anim,ajax,cookie,gallery/lineParallax/0.5/index',function(S,DOM,Anim,IO,Cookie,LineParallax){
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
		mL1=[-800,-900,778,915],
		mL2=[-500,-460,250,400];

	for(var i=0;i<cloud.length;i++){
		anim[i]=S.Anim(cloud[i],{marginLeft:mL1[i]+'px',filter:'alpha(opacity=0)',opacity:0},2,"easeOutStrong");
		anim2[i]=S.Anim(cloud[i],{marginLeft:mL2[i]+'px',filter:'alpha(opacity=100)',opacity:1},2,"easeOutStrong");
	}




	$('.arrow').jrumble({
		x: 0,
		y: 10,
		rotation: 1,
		speed:100
	});
	$('.arrow').trigger('startRumble');

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
			$('#parallax').css({height: 1910}) 	
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
		box_toTop[4]=control*0.8; //左白车
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

	


	//太阳
	var sunMove=S.get('.sun');
	var step = 0;
	var r = -150;
	
	var timer=setInterval(function () {
			/*r=r+1;
			 if(r>600){
					r-=1;
			}*/
			/*if (step > 1.5) {
					 var a=window.clearInterval(timer);
			}*/
			/*sunMove.style.left = 80- r * Math.sin(step)+"px";
			sunMove.style.top = 100 + r * Math.cos(step)+"px";*/
			step += 1/400;
	}, 1);
	

	

	
	


	
		

});






})
