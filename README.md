# Gateway to Roman Architecture API Capstone
Thinkful API Capstone Project

![landing page](https://github.com/EGrebowski/gateway-to-roman-architecture-api-capstone/blob/master/github-images/user-story-1.JPG)

![results page](https://github.com/EGrebowski/gateway-to-roman-architecture-api-capstone/blob/master/github-images/user-story-2.JPG)

![detailed results section](https://github.com/EGrebowski/gateway-to-roman-architecture-api-capstone/blob/master/github-images/user-story-3.JPG)

## Background

I built this app because I love visiting ancient classical monuments when I travel, and want to make it easier to find the best sites in a particular area when I plan travel.

## Use Case
This app helps users plan travel itineraries by providing details on ancient Greek and Roman monuments from the UNESCO list of World Heritage Sites, combining information from UNESCO, Google Maps, and YouTube. The user is able to access a list of monuments and thier locations on a map, as well as a description and images for each.

## Working Prototye
A live example of the project can be found at https://egrebowski.github.io/gateway-to-roman-architecture-api-capstone

## Functionality
This app's functionality includes:
* Search for UNESCO World Heritage Sites
* The app returns a list of sites organized by country with a thumbnail image and the locations plotted on a map
* Click on a list item to view more images, a link to the YouTube video, and a description of the site

## Technology
* HTML
* CSS
* JavaScript
* jQuery


The app uses an object in JSON format as the database for UNESCO World Heritage Sites, converted from a CSV file.
The app uses AJAX JSON calls to the <a href="https://maps.googleapis.com">Google Maps</a> API to return the location map of UNESCO results.
The app uses AJAX JSON calls to the <a href="https://www.googleapis.com/youtube/v3/search">YouTube</a> API to return thumbnail images and a video of each result.

## Responsive
App is built to be responsive across mobile, tablet, laptop, and desktop screen resolutions.


User Story: As a user, I want to be able to pull a comprehensive list of Greek and Roman WHS and descriptions based on a search by country, so that I can plan my travel around them.

From the home search page:
* The user sees the webpage title, description/instructions, search box, and search button
* The user types a country into the search box and clicks "go"
* If input is invalid country: error message appears
* If input is valid country: results page loaded

From the results page:
* The user sees the title of the website and description of results
* If the country has no World Heritage Sites: message appears saying there are no WHS in that country
* If the country does have WHS: display full list of results, divided into two sections:
* Left section: user sees a list with a thumbnail image and the name of the site
* Right section: user sees a map that plots all locations in results list
* Items in both sections are clickable

If user clicks on result in list or map:
* Pop-up appears displaying the name, large image (clickable link to YouTube UNESCO video), smaller thumbnail images, and description
* User can close window by clicking x in corner. Returns user to results page.
