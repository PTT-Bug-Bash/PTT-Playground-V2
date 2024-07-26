# AR Frontend Componenets

## AthleteForm.jsx
This is the signup form for athletes. The form fields are up to date with Athlete Sign-Up Required Fields as documented in the most recent database schema and the Form Questions document provided by Hunter. There are user creation routes that instantiate a new Athlete in the database upon submission. In the future, user profiles should be built for an athlete to view and edit both the Athlete Sign-Up Required Fields and the Athlete Detailed Optional Fields.

## BusinessForm.jsx
This is the signup form for businesses. The form fields are up to date with Business Sign-Up Required Fields as documented in the most recent database schema and the Form Questions document provided by Hunter. There are user creation routes that instantiate a new Business in the database upon submission. In the future, user profiles should be built for a business owner to view and edit both the Business Sign-Up Required Fields and the Business Detailed Optional Fields.

## HomePage.js
This is the landing page for the web app that allows you to navigate to either the map, athlete form, or business form. This is not for end users - only for developer access.

## ImageCarousel.js
This file handles the [carousel](https://www.npmjs.com/package/react-multi-carousel) component that gets used on the campaign popup in BottomDrawer.js. The responsive guidelines establish how many images will show per device view.

## AR_Map_Process_Flow.pdf
This pdf documents the process flow and the design of the Map component

## Map.js
This file first initializes the map using Mapbox GL JS, fetches brand data from backend, and then takes care of the following:

### Geolocation
Geolocation uses the user's current location to determine their position on the map. This is used for positioning as well as calculating how far opportunities are in relation to the user.

### Geocoding (Search)
The search allows a user to enter an address on the map.

### Rotation & Zoom Buttons
Adds buttons at the top right to rotate and zoom in/out the map.

### Markers
There is a marker for each opportunity at its location. Clicking on a marker shows the respective card on the scrollbar, which has more information about the opportunity.

There is also an image of the opportunity/business logo shown above the marker.

### Horizontal Scrollbar w/ Cards
This part lets you browse through all the markers from the scrollbar at the bottom. Selecting a card on the scrollbar zooms into the respective marker on the map

First builds opportunity listing by iterating through fetched data. In buildLocationList(), all locations get iterated through and added to the scrollbar listing.

To make the map interactive, two functions get called using event listeners when a card is clicked on: flyToBrand() zooms in and centers the map on the correct location,and CreatePopUp() displays a popup at that loaction.

### Sorting
Sorts the cards on the scrollbar according to the current location (when the current location button is clicked) or the searched location (when a location is searched using the searchbar).

First, an event listener saves the coordinates of the searched/current location in variable searchResult.

Then, Turf.js library is used to find destances between the searcResult and each opportunity. The opportunities are then sorted by the distance found and the list is rebuilt.

When searched/current loaction is recieved, we can show the view to include both the location and closest opportunity to show more context. We experimented to show the opportunity as well in the same view if it is within 50 miles, but removed our implementation after deciding that a button feature for this would be better. Future developers can implement this feture if interested.

## BottomDrawer.js
The BottomDrawer file contains the code that generates the larger campaign popup view and was implemented using the material UI [SwipeableDrawer](https://mui.com/material-ui/api/swipeable-drawer/) component. \
\
There is also an ImageCarousel component used, however it does not center images on the carousel if there are only 1 or 2.\
As a workaround, we've implemented two separate functions that get used depending on how many images the business may have. \
If there are only one or two images, they will not use the carousel and instead get displayed on their own (StandardImageList). If there are 3 or more, a carousel (from ImageCarousel.js file) will be used to allow the user to scroll through. These images should be stored in the database as a URL.

* Something that needs to be added in the future is a standard for image sizing. The carousel gets glitchy if images of different orientations are used - therefore, it would be best to establish a guideline for businesses when they upload photos - maybe accept square images only? And make sure to establish a size guideline (i.e. less than 5mb photos)

The BusinessIconImage function displays the business logo image on the campaign popup.
