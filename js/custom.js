$(document).ready(function() {

	$("#switch").hide();
	$("#back").hide();
	$(".real").hide();

	$("#next").click(function(){
		$(".aboutmepic").attr("src", "images/About_Me_Evil.jpg");
		$("#next").hide();
		$("#switch").show();
	})

	$("#switch").click(function(){
		$(".aboutmepic").attr("src", "images/About_Me.jpg");
		$("#switch").hide();
		$("#next").show();
	})

	$("#serious").click(function(){
		$(".funny").hide();
		$(".real").show();
		$("#serious").hide();
		$("#back").show();
	})

	$("#back").click(function(){
		$(".real").hide();
		$(".funny").show();
		$("#back").hide();
		$("#serious").show();
	})

	
	// var imgArray = ["<img src="images/About_Me.jpg" />","<img src="images/Brick_Breaker.png" />","<img src="images/Pig_Game.png" />"]


	// $("#next").click(function(){
	// 	for (var i = 0; i < arrayLength; i++) {
 //    		alert(imgArray[i]);
	// 	}
	// })
	

	// var arrayLength = imgArray.length;
	// for (var i = 0; i < arrayLength; i++) {
	//     alert(imgArray[i]);
	// }


})