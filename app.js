//STEP 1 define variable, functions objects

var globalMarkers = [];

var globalInfoWindowContent = [];

// 1.1 function to dynamically populate the drop down
function populateDropDown(whsObject) {
    var buildTheHtmlOutput = "";
    var currentState = "";
    var oldState = "";
    $.each(whsObject, function (whsObjectKey, whsObjectValue) {
        currentState = whsObjectValue.states_name_en;
        if (currentState != oldState) {
            buildTheHtmlOutput += "<option value='" + whsObjectValue.states_name_en + "'>" + whsObjectValue.states_name_en + "</option>";
        }
        oldState = currentState;
    });

    $("#search-input").html(buildTheHtmlOutput);
}

function showItemDescription(element) {
    //    console.log($(element).parent().find(".item-description"));
    $(element).parent().find(".item-description").toggleClass("item-description-show");
}

// 1.2 function to search based on the drop down input (parse the object above)
function displayWhsBasedOnSearch(stateName) {
    globalMarkers = [];
    globalInfoWindowContent = [];

    var buildTheHtmlOutput = '<h3>World Heritage Sites with Classical Architecture in ' + stateName + '</h3>';
    $.each(whsObject, function (whsObjectKey, whsObjectValue) {
        if (whsObjectValue.states_name_en == stateName) {
            buildTheHtmlOutput += '<section id="results-page-wrapper" class="row">';
            buildTheHtmlOutput += '<section class="results-list" onclick="showItemDescription($(this))">';
            buildTheHtmlOutput += '<ul class="row">';
            buildTheHtmlOutput += '<li class="col-4 thumb-video-container-' + whsObjectKey + '"></li>';
            buildTheHtmlOutput += '<li class="col-8">' + whsObjectValue.name_en + '</li>';
            buildTheHtmlOutput += '</ul>';
            buildTheHtmlOutput += '</section>';
            buildTheHtmlOutput += '<section class="item-description">';
            buildTheHtmlOutput += '<div class="item-description-video-' + whsObjectKey + '">';
            buildTheHtmlOutput += '</div>';
            if (whsObjectValue.short_description_en != "") {
                buildTheHtmlOutput += whsObjectValue.short_description_en;
            }
            buildTheHtmlOutput += '</section>';
            buildTheHtmlOutput += '</section>';

            //populate the dynamically generated map elements
            var globalMarkerElement = [whsObjectValue.name_en, whsObjectValue.latitude, whsObjectValue.longitude];
            var globalInfoWindowElement = ['<div class="info_content">' + '<h3>' + whsObjectValue.name_en + '</h3>' + whsObjectValue.short_description_en + '</div>'];

            globalMarkers.push(globalMarkerElement);
            globalInfoWindowContent.push(globalInfoWindowElement);

            //populate the images from youtube
            getDataFromYoutube(whsObjectValue.name_en + ' UNESCO', 4, whsObjectKey)
        }

    });

    $("main").html(buildTheHtmlOutput);

    $("#map_wrapper").show();
    initializeMap();
    $("#map_wrapper").height("+=10");
}

//1.3 function to initialize map
function initializeMap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = globalMarkers;

    // Info Window Content
    var infoWindowContent = globalInfoWindowContent;

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(5);
        google.maps.event.removeListener(boundsListener);
    });
}

//1.4.1 make api call
function getDataFromYoutube(monument, numberOfImages, targetContainer) {
    var buildTheHtmlOutput = "";
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: numberOfImages,
            key: "AIzaSyA3QfiMOBzaSmbyBYiKADXNIWtfM45mfzY",
            q: monument,
            type: "video"
        },
        function (receivedApiData) {
            //show the json array received from the API call
            // if there are no results it will show a placeholder image
            if (receivedApiData.pageInfo.totalResults == 0) {
                var buildTheThumbVideoOutput = "";
                buildTheThumbVideoOutput += "<a href='https://www.youtube.com/' target='_blank'>";
                buildTheThumbVideoOutput += '<img src="no-images-featured-images.png" class="url-link"/>';
                buildTheThumbVideoOutput += '</a>';
                $(".thumb-video-container-" + targetContainer).html(buildTheThumbVideoOutput);
            }
            //if there are results, call the displaySearchResults
            else {
                displayYoutubeSearchResults(receivedApiData.items, numberOfImages, targetContainer);
            }
        });
}


//1.4.2 display the results of the api call
function displayYoutubeSearchResults(videosArray, numberOfImages, targetContainer) {

    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";
    var buildTheThumbVideoOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        //display the first image
        if (videosArrayKey == 0) {
            buildTheThumbVideoOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            buildTheThumbVideoOutput += '<img src="' + videosArrayValue.snippet.thumbnails.medium.url + '" class="url-link"/>';
            buildTheThumbVideoOutput += '</a>';

            buildTheHtmlOutput += '<div class="thumbnails row">';
        }
        //display images from 2-3


        if ((videosArrayKey > 0) && (videosArrayKey < 3)) {
            buildTheHtmlOutput += "<a class='col-4' href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += '<img src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
            buildTheHtmlOutput += '</a>';
        }
        //display last image
        if (videosArrayKey == 3) {
            buildTheHtmlOutput += "<a class='col-4' href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += '<img src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
            buildTheHtmlOutput += '</a>';
            buildTheHtmlOutput += '</div>';
        }

    });
    $(".thumb-video-container-" + targetContainer).html(buildTheThumbVideoOutput);
    $(".item-description-video-" + targetContainer).html(buildTheHtmlOutput);
}


//STEP 2 use variable, functions objects (event listeners)

//2.1 when the page loads
$(document).ready(function () {
    $("main").hide();
    $("#map_wrapper").hide();
    populateDropDown(whsObject);
});

// 2.2 when click on search
$(".js-search-form").on("submit", function (event) {
    event.preventDefault();
    var stateName = $("#search-input").val();
    displayWhsBasedOnSearch(stateName);
    $("main").show();
    $('html, body').animate({
        scrollTop: $("main").offset().top
    }, 1000);
});
