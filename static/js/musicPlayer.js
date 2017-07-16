$(function(){
	//进度条控制
	var songlist = [];
	var nowPlaying;
	setTimeout(function(){
		$(".songIdBox").each(function(){
			songlist.push($(this).data("id"))
		})
	},1000)
	
	setInterval(present,500)  //每0.5秒计算进度条长度
	$(".basebar").mousedown(function(ev){  //拖拽进度条控制进度
	  var posX = ev.clientX;
	  var targetLeft = $(this).offset().left;
	  var percentage = (posX - targetLeft)/400*100;
	  myAudio.currentTime = myAudio.duration * percentage/100;
	});
	function present(){
	  var length = myAudio.currentTime/myAudio.duration*100;
	  $('.basebar .progressbar').width(length+'%');//设置进度条长度
	  // //自动下一曲
	  // if(myAudio.currentTime == myAudio.duration){
	  //   getmusic()
	  // }
	  $('.nextBtn').click(function(){

	  })
	}
	$('.volumeBar .progressbar').width($('.volumeBar').width())
	$(".volumeBar").mousedown(function(ev){  //拖拽进度条控制进度
	  var posX = ev.clientX;
	  var targetLeft = $(this).offset().left;
	  var percentage = (posX - targetLeft);
	  $('.volumeBar .progressbar').width(percentage);
	  myAudio.volume = percentage/100;
	});
})




