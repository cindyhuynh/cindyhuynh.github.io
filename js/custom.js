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

})