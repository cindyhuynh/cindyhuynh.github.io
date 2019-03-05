//using a google maps api to display bathrooms around
//sf market st area, users are able to add and contribute
//to the croudsource data of bathrooms and mark whether
//is it clean or not, public or not. using google sheets
//as a database and ajax to retreive and send data. 
//markers show up on the google api displaying the bathrooms
//info box when clicked on the bathroom shows the name of 
//bathroom. 
var bathRoomData;

//this is reading the data from the google sheet and 
//extracting it into a usable array for my code
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



//using ajx to grab data from my google sheets source, and then 
//calling above function and extract data to be able to use
$(document).ready(function() {

	  $.ajax({
	  	url: "https://spreadsheets.google.com/feeds/list/1Gw9qdMt15gnDnab2osAF2CxTBumi-fMSJs04rQxqNss/1/public/basic?alt=json",
	  	success: function(data){
	  		readDataAndAppend(data);
	  	}
	  })	
  
//user able to adding data into the google sheets through our "add bathroom" form
	$("#bathroom-form").submit(function(event){
		event.preventDefault();
		var data = $(this).serialize();
		var dataArray = $(this).serializeArray();
		console.log(dataArray)
	
	//using ajax to send the data into the google sheets
		$.ajax({
			url: "https://script.google.com/macros/s/AKfycbwfVi8Ye0M41iotzH9HikJ_fY6_aUnjTH2c8nUCfFmTUO3Vtvkr/exec",
			type: "POST", 
			data: data,
		}).done(function(data) {
				console.log("success!")
		})

    //adding the marker onto the map to be shown
		addMarkerToMap(dataArray);
	});

//initializing the google maps api to center around sf market st
	var mapOptions = {
		    zoom: 16,
		    center: {lat: 37.789, lng: -122.399}
	}	

    map = new google.maps.Map(document.getElementById("map"), mapOptions);


//different functions for when each button is pressed
//to display the correct markers
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


//displaying all the markers, dirty and clean
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
			
			//if the extracted data has cleaniless tag of "clean", 
			//set the marker color to a green color
			if (bathRoomData[i].cleanliness == "Clean") {
				color_status = "7CFC00";
			//else set the marker color to a red color
			} else if (bathRoomData[i].cleanliness == "Dirty") {
				color_status = "FF0000";
			}


      //creating the pin(marker) with specified color and size
			var pin = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color_status,
        	new google.maps.Size(21, 34));


      //adding the marker onto the map
			var marker = new google.maps.Marker({
			    position: {lat: parseFloat(bathRoomData[i].lat), lng: parseFloat(bathRoomData[i].lng)},
			    title: bathRoomData[i].company,
			    map: map,
			    icon: pin
		  	});
		  	console.log(marker);

      //creating an info window to display the company name of bathroom
			var infowindow = new google.maps.InfoWindow({
	    		content: bathRoomData[i].status + " " + bathRoomData[i].company
		  	});

        //when the marker is clicked, display the info window
		  	google.maps.event.addListener(marker, 'click', function() {
	   			// infowindow.open(map, marker);
	   			infowindow.setContent( this.title );
	   			infowindow.open( map, this );
	  		});
	  		//ading each marker into an array of all markers
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
