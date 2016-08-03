var bathRoomData;

function readDataAndAppend(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    
    console.log(rows);

    bathRoomData = rows;
} 




$(document).ready(function() {

	  $.ajax({
	  	url: "https://spreadsheets.google.com/feeds/list/1Gw9qdMt15gnDnab2osAF2CxTBumi-fMSJs04rQxqNss/1/public/basic?alt=json",
	  	success: function(data){
	  		readDataAndAppend(data);
	  	}
	  })	
  
  	//sticking data into the google spreadsheet
	$("#bathroom-form").submit(function(event){
		event.preventDefault();
		var data = $(this).serialize();
		var dataArray = $(this).serializeArray();
		console.log(dataArray)
	
		$.ajax({
			url: "https://script.google.com/macros/s/AKfycbwfVi8Ye0M41iotzH9HikJ_fY6_aUnjTH2c8nUCfFmTUO3Vtvkr/exec",
			type: "POST", 
			data: data,
		}).done(function(data) {
				console.log("success!")
		})

		addMarkerToMap(dataArray);
	});

	var mapOptions = {
		    zoom: 16,
		    center: {lat: 37.789, lng: -122.399}
	}	

    map = new google.maps.Map(document.getElementById("map"), mapOptions);


  $(".button1").click(function() {
  	console.log("button1 clicked");
  	setMapOnAll(null);
  	setMarkers("Clean");
  })


  $(".button3").click(function() {
  	console.log("button2 clicked");
  	setMapOnAll(null);
  	setMarkers("Dirty"); 	
  })

  $(".button4").click(function(){
  	console.log("Show All clicked");
  	setMapOnAll(map);
  })

  $(".button5").click(function(){
  	console.log("Hide All clicked");
  	setMapOnAll(null);
  })

});


var setMapOnAll= function (map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
 

var markers = new Array();
var setMarkers = function(color){

	for (var i = 0; i < bathRoomData.length; i++) { 

		if (bathRoomData[i].cleanliness == color) {
			// if color is equal to green
				// variable color_status = "7CFC00"
			// else 
				// variable color_status = "FF0000";
			// set pin/icon variable equal to markerimage code with the color_status
			// make a marker
			// make an info window
			var color_status;
			if (bathRoomData[i].cleanliness == "Clean") {
				color_status = "7CFC00";
			} else if (bathRoomData[i].cleanliness == "Dirty") {
				color_status = "FF0000";
			}


			var pin = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color_status,
        	new google.maps.Size(21, 34));


			var marker = new google.maps.Marker({
			    position: {lat: parseFloat(bathRoomData[i].lat), lng: parseFloat(bathRoomData[i].lng)},
			    title: bathRoomData[i].company,
			    map: map,
			    icon: pin
		  	});
		  	console.log(marker);

			var infowindow = new google.maps.InfoWindow({
	    		content: bathRoomData[i].status + " " + bathRoomData[i].company
		  	});

		  	google.maps.event.addListener(marker, 'click', function() {
	   			// infowindow.open(map, marker);
	   			infowindow.setContent( this.title );
	   			infowindow.open( map, this );
	  		});
	  		markers.push(marker)


		} // closes color if statement
	} //closing the for loop
} // closing the function


function addMarkerToMap(dataArray) {
	console.log(dataArray);


	var marker = new google.maps.Marker({
			    position: {lat: parseFloat(dataArray[3].value), lng: parseFloat(dataArray[4].value)},
			    title: dataArray[0].value,
			    map: map,
			    icon: pin
		  	});
		  	console.log(marker);

			var color_status;
			if (dataArray[2].value == "Clean") {
				color_status = "7CFC00";
			} else if (dataArray[2].value == "Dirty") {
				color_status = "FF0000";
			}

			var pin = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color_status);
        
			var infowindow = new google.maps.InfoWindow({
	    		content: dataArray[1].value + " " + dataArray[0].value
		  	});

		  	google.maps.event.addListener(marker, 'click', function() {
	   			// infowindow.open(map, marker);
	   			infowindow.setContent( this.title );
	   			infowindow.open( map, this );
	  		});
	  		markers.push(marker)
	//work through the data ( which is an array of objects)
	// take out the information you need
	// put in code to create a new marker 
} 



var map;

