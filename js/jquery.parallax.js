KISSY.ready(function(S){
	var S = KISSY;
KISSY.use('dom,anim,ajax,cookie,gallery/lineParallax/0.5/index',function(S,DOM,Anim,IO,Cookie,LineParallax){
	var E = S.Event,
		scrollY=0,  //滚动条高度
		windowH, //窗体高度
		onupdate,
		time;
	//视差	
	var line= new LineParallax();


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
			
			/*$(window).resize(function(){
				windowH = $(window).height();
				windowH >1000 ? $('#parallax').css({height: 6000}) : $('#parallax').css({height: 5000+windowH});
			}).resize();*/		
			$(document).mousewheel(function(e, delta){
				window.scrollBy(0,delta * -200);
			});
			
			time = setInterval(parallax_update, 1000/30); 
		});
	}
	
	window.onscroll=function(){
		scrollY= window.scrollY!=undefined ? window.scrollY : window.pageYOffset;
	    scrollY= scrollY!=undefined ? scrollY : document.documentElement.scrollTop;
	    line.move(parseInt(document.body.scrollTop)*0.5);
		console.log(line.getIndex());
		updateMasks();
	}


	function updateMasks(){		
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
	}

	//太阳
	var sunMove=S.get('.sun');
	var step = 0;
	var r = 220;
	var timer=setInterval(function () {
			/*r=r+1;
			 if(r>600){
					r-=1;
			}*/
			if (step == 360) {
					step = 1;
			}
			//sunMove.style.left = 170- r * Math.sin(step)+"px";
			//sunMove.style.top =10+ r * Math.cos(step)+"px";
			step += 1/200;
	}, 1);

	//视差
	
	line.add({
		dom:'.car1',
		regions:[{
            start:50,
            end:800,
            startCss:{
                top:250

            },endCss:{
                top:1000
            }
        }]
	});

	line.add({
		dom:'.leaf1',
		regions:[{
            start:80,
            end:500,
            startCss:{
                top:200

            },endCss:{
                top:500
            }
        }]
	});
	line.add({
		dom:'.leaf2',
		regions:[{
            start:450,
            end:1000,
            startCss:{
                top:1200

            },endCss:{
                top:1700
            }
        }]
	});
	line.add({
		dom:'.leaf3',
		regions:[{
            start:50,
            end:800,
            startCss:{
                top:100

            },endCss:{
                top:600
            }
        }]
	});
	line.add({
		dom:'.leaf4',
		regions:[{
            start:400,
            end:950,
            startCss:{
                top:1100

            },endCss:{
                top:1500
            }
        }]
	});
	line.add({
		dom:'.car2',
		regions:[{
            start:250,
            end:1000,
            startCss:{
                top:800

            },endCss:{
                top:1700
            }
        }]
	});
	line.add({
		dom:'.car3',
		regions:[{
            start:100,
            end:1000,
            startCss:{
                top:1200

            },endCss:{
                top:300
            }
        }]
	});

	
	


	
		

});






})
