$(document).ready(function() {

	$("#switch").hide();

	$("#next").click(functio5n(){
		$(".aboutmepic").attr("src", "images/About_Me_Evil.jpg");
		$("#next").hide();
		$("#switch").show();
	})

	$("#switch").click(function(){
		$(".aboutmepic").attr("src", "images/About_Me.jpg");
		$("#switch").hide();
		$("#next").show();
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