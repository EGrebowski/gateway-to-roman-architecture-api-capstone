//STEP 1 define variable, functions objects

//var whsObject = [
//    {
//        "unique_number": 230,
//        "id_no": 208,
//        "name_en": "Cultural Landscape and Archaeological Remains of the Bamiyan Valley",
//        "short_description_en": "<p>The cultural landscape and archaeological remains of the Bamiyan Valley represent the artistic and religious developments which from the 1st to the 13th centuries characterized ancient Bakhtria, integrating various cultural influences into the Gandhara school of Buddhist art. The area contains numerous Buddhist monastic ensembles and sanctuaries, as well as fortified edifices from the Islamic period. The site is also testimony to the tragic destruction by the Taliban of the two standing Buddha statues, which shook the world in March 2001.</p>",
//        "justification_en": "<p><em>Criterion (i):</em> The Buddha statues and the cave art in Bamiyan Valley are an outstanding representation of the Gandharan school in Buddhist art in the Central Asian region.</p>\n<p><em>Criterion (ii)</em> : The artistic and architectural remains of Bamiyan Valley, and an important Buddhist centre on the Silk Road, are an exceptional testimony to the interchange of Indian, Hellenistic, Roman, Sasanian influences as the basis for the development of a particular artistic expression in the Gandharan school. To this can be added the Islamic influence in a later period.</p>\n<p><em>Criterion (iii):</em> The Bamiyan Valley bears an exceptional testimony to a cultural tradition in the Central Asian region, which has disappeared.</p>\n<p><em>Criterion (iv):</em> The Bamiyan Valley is an outstanding example of a cultural landscape which illustrates a significant period in Buddhism.</p>\n<p><em>Criterion (vi):</em> The Bamiyan Valley is the most monumental expression of the western Buddhism. It was an important centre of pilgrimage over many centuries. Due to their symbolic values, the monuments have suffered at different times of their existence, including the deliberate destruction in 2001, which shook the whole world.</p>",
//        "date_inscribed": 2003,
//        "secondary_dates": "",
//        "danger_list": "Y 2003",
//        "longitude": 67.82525,
//        "latitude": 34.84694,
//        "area_hectares": 158.9265,
//        "criteria_txt": "(i)(ii)(iii)(iv)(vi)",
//        "category": "Cultural",
//        "states_name_en": "Afghanistan",
//        "region_en": "Asia and the Pacific",
//        "iso_code": "af",
//        "udnp_code": "afg",
//        "transboundary": 0
//        },
//    {
//        "unique_number": 234,
//        "id_no": 211,
//        "name_en": "Minaret and Archaeological Remains of Jam",
//        "short_description_en": "<p>The 65m-tall Minaret of Jam is a graceful, soaring structure, dating back to the 12th century. Covered in elaborate brickwork with a blue tile inscription at the top, it is noteworthy for the quality of its architecture and decoration, which represent the culmination of an architectural and artistic tradition in this region. Its impact is heightened by its dramatic setting, a deep river valley between towering mountains in the heart of the Ghur province.</p>",
//        "justification_en": "<p><em>Criterion (ii):</em> The innovative architecture and decoration of the Minaret of Jam played a significant role in the development of the arts and architecture of the Indian sub-continent and beyond.</p>\n<p><em>Criterion (iii): </em>The Minaret of Jam and its associated archaeological remains constitute exceptional testimony to the power and quality of the Ghurid civilization that dominated its region in the 12th and 13th centuries.</p>\n<p><em>Criterion (iv): </em>The Minaret of Jam is an outstanding example of Islamic architecture and ornamentation in this region and played a significant role in their further dissemination.</p>",
//        "date_inscribed": 2002,
//        "secondary_dates": "",
//        "danger_list": "Y 2002",
//        "longitude": 64.51605556,
//        "latitude": 34.39655556,
//        "area_hectares": 70,
//        "criteria_txt": "(ii)(iii)(iv)",
//        "category": "Cultural",
//        "states_name_en": "Afghanistan",
//        "region_en": "Asia and the Pacific",
//        "iso_code": "af",
//        "udnp_code": "afg",
//        "transboundary": 0
//        }
//    ];
// 1.1 functiona to dynamically populate the dropp down
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
    console.log($(element).parent().find(".item-description"));
    $(element).parent().find(".item-description").toggleClass("item-description-show");
}

// 1.2 function to search based on the drop down input (parse the object above)
function displayWhsBasedOnSearch(stateName) {
    var buildTheHtmlOutput = '<h3>World Heritage Sites with classical architecture in ' + stateName + '</h3>';
    $.each(whsObject, function (whsObjectKey, whsObjectValue) {
        if (whsObjectValue.states_name_en == stateName) {
            buildTheHtmlOutput += '<section id="results-page-wrapper" class="row">';
            buildTheHtmlOutput += '<section class="results-list" onclick="showItemDescription($(this))">';
            buildTheHtmlOutput += '<ul class="row">';
            buildTheHtmlOutput += '<li class="col-4"><img src="github-images/user-story-2.JPG"></li>';
            buildTheHtmlOutput += '<li class="col-8">' + whsObjectValue.name_en + '</li>';
            buildTheHtmlOutput += '</ul>';

            buildTheHtmlOutput += '</section>';
            buildTheHtmlOutput += '<section class="results-map col-6">';
            //            buildTheHtmlOutput += '<h4>' + whsObjectValue.name_en + '</h4>';

            //            buildTheHtmlOutput += getDataFromYoutube(whsObjectValue.name_en, 4);

            $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                    part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/v3/docs/search/list)
                    maxResults: 4, //number of results per page
                    key: "AIzaSyA3QfiMOBzaSmbyBYiKADXNIWtfM45mfzY",
                    q: whsObjectValue.name_en, //shearch query from the user
                    type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
                },
                function (receivedApiData) {
                    //show the json array received from the API call
                    console.log(receivedApiData);
                    // if there are no results it will show an error
                    if (receivedApiData.pageInfo.totalResults == 0) {
                        alert("No videos found!");
                    }
                    //if there are results, call the displaySearchResults
                    else {



                        $.each(receivedApiData.items, function (videosArrayKey, videosArrayValue) {

                            //display the first image
                            //                    if(videosArrayKey == 0) {
                            //                        buildTheHtmlOutput += '<a href=""><img src="' + videosArrayValue[0].snippet.thumbnails.high.url + '" class="url-link"></a>';
                            //                    }
                            //display images from 2-4 images

                            buildTheHtmlOutput += '<a href=""><img src="' + videosArrayValue.snippet.thumbnails.high.url + '" class="url-link"></a>';
                            buildTheHtmlOutput += '<div class="thumbnails row">';
                            buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                            buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                            buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                            buildTheHtmlOutput += '</div>';



                        });



                        //use the HTML output to show it in the index.html

                    }
                });

            //            console.log(buildTheHtmlOutput);

            buildTheHtmlOutput += '</section>';

            buildTheHtmlOutput += '<section class="item-description">';


            buildTheHtmlOutput += '<p>' + whsObjectValue.short_description_en + '</p>';

            buildTheHtmlOutput += '</section>';
            buildTheHtmlOutput += '</section>';


        }

    });
    buildTheHtmlOutput += '<img src="https://www.maps.com/media/catalog/product/cache/1/thumbnail/2500x/17f82f742ffe127f42dca9de82fb58b1/s/i/signature_world_wall_map-2.jpeg">';

    $("main").html(buildTheHtmlOutput);

}

//1.3 function to display the details of a searched item

//1.3.1 make api call
function getDataFromYoutube(monument, numberOfImages) {
    var buildTheHtmlOutput = "";
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/v3/docs/search/list)
            maxResults: numberOfImages, //number of results per page
            key: "AIzaSyA3QfiMOBzaSmbyBYiKADXNIWtfM45mfzY",
            q: monument, //shearch query from the user
            type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
        },
        function (receivedApiData) {
            //show the json array received from the API call
            console.log(receivedApiData);
            // if there are no results it will show an error
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found!");
            }
            //if there are results, call the displaySearchResults
            else {



                $.each(receivedApiData.items, function (videosArrayKey, videosArrayValue) {

                    //display the first image
                    //                    if(videosArrayKey == 0) {
                    //                        buildTheHtmlOutput += '<a href=""><img src="' + videosArrayValue[0].snippet.thumbnails.high.url + '" class="url-link"></a>';
                    //                    }
                    //display images from 2-4 images

                    buildTheHtmlOutput += '<a href=""><img src="' + videosArrayValue.snippet.thumbnails.high.url + '" class="url-link"></a>';
                    buildTheHtmlOutput += '<div class="thumbnails row">';
                    buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                    buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                    buildTheHtmlOutput += '<img class="col-4" src="' + videosArrayValue.snippet.thumbnails.high.url + '">';
                    buildTheHtmlOutput += '</div>';



                });



                //use the HTML output to show it in the index.html

            }
        });
    return buildTheHtmlOutput;
}

//1.3.2 display the results of the api call




//STEP 2 use variable, functions objects (event listeners)

//2.1 when the page loads
$(document).ready(function () {
    $("main").hide();
    //    $(".item-description").hide();
    populateDropDown(whsObject);
});

//2.2 when click on search
$(".js-search-form").on("submit", function (event) {
    event.preventDefault();
    var stateName = $("#search-input").val();
    displayWhsBasedOnSearch(stateName);
    $("main").show();
});

//2.3 when click on the item for details
