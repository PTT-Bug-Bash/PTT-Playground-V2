/**
 * Creates the map, current location button, navigation/rotation
 * buttons, search bar, and sorted scroll wheel.
 **/

// import node modules
import React, { useRef, useEffect, useState } from 'react';
// add ! to exclude mapbox-gl from transpilation and disable the eslint rule
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import * as turf from '@turf/turf';
import { Button } from 'semantic-ui-react';
import Resizer from "react-image-file-resizer";
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material';

// import components
import BottomDrawer from '../components/Map/bottomDrawer.js'

// import routes
import getBusinesses from '../routes/business/getBusinesses.js';
import getBrandProfiles from '../routes/business_profile/getBrandProfiles.js';

// import style
import '../assets/style/map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN; // gets token from .env.local

function Map(props){
  const entityID = props;
  const mapContainer = useRef(null);
  const [active, setActive] = useState(false);
  const [drawerPayload, setDrawerPayload] = useState(null)
  const [fetched, setFetchStatus] = useState(null); // On successful fetch, arrows will show with scroll list. Otherwise, don't show arrows 
  //const [BrandProfiles, setBrandProfiles] = useState(null) re-enable if fetching brand profile is needed

  //for left/right buttons on scroll wheel
  function leftScroll() {
    const left = document.querySelector(".scrollWheel");
    left.scrollBy({
      top: 0,
      left: -500,
      behavior: "smooth",
    });
  }
  function rightScroll() {
    const right = document.querySelector(".scrollWheel");
    right.scrollBy({
      top: 0,
      left: 500,
      behavior: "smooth",
    });
  }

  // Initialize map when component mounts
  useEffect(() => {
    let mygeojson = 
    {
      "type": "FeatureCollection", 
      "features": []
    }

    getBusinesses().then( (data) => {
      for (let brand of data) { // convert json to geoJSON
        let coords = null;

        if(brand.longitude && brand.latitude) {
          coords = [brand.longitude, brand.latitude]
        }

        let properties = brand;
        delete properties.location;     
        let feature = {
          "type": "Feature", 
          "geometry": {
            "type": "Point", 
            "coordinates": coords
          }, 
          "properties": properties,
          "distance": null,
          "business_industry": null,
        };
          
        mygeojson.features.push(feature);
        setFetchStatus(true);

        //after fetching brand info, fetch brand profile then map the industry information onto each brand
        //currently disabled since filtering feature is disabled
        //fetchData()
        //addIndustry(mygeojson, BrandProfiles)
      }
    }).catch((error) => {
      setFetchStatus(false);
    });

    // uncomment if fetching brand profile is needed
    // //fetching brand profiles
    // async function fetchData() {
    //   try {
    //       let brands = await getBrandProfiles();
    //       setBrandProfiles(brands);
    //       setFetchStatus(true);
    //   } catch (error) {
    //     setFetchStatus(false)
    //   }
    // }
    // //mapping industry from brand profile onto brand object
    // function addIndustry(brands, brandsProfile) {
    //   let id=0;
    //   for (const brand of brands.features) {
    //     if (brandsProfile[id]) {
    //       brand.business_industry = brandsProfile[id].business_industry;
    //     }
    //     id++;
    //   }
    // }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-97.1, 31.5],
      zoom: 9
    });

    map.on('load', function () {
      geolocate.trigger();  // moves user location to current coordinates

      //get the current location coordinates and call sortCards for sorting by distance
      geolocate.on('geolocate', function(e) {
        var lon = e.coords.longitude;
        var lat = e.coords.latitude
        const position = {
          type: "Point",
          coordinates: [lon, lat]
        };
        //addIndustry(mygeojson, BrandProfiles)
        sortCards(position, mygeojson);
      });
    })
  
    // Wait until the map loads to make changes to the map.
    map.on('load', () => {
      /* Add the data to map as a layer */
      //add only the source without styling a layer
      map.addSource('places', {
        type: 'geojson',
        data: mygeojson
      });

      //Create a new MapboxGeocoder instance.
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        autocomplete: false,
        minLength: 4,
        placeholder: 'Enter a location',
      });
      
      /**
        * Add:
        * - The location listings on the bottom of the page
        * - The search box (MapboxGeocoder) onto the map
        * - The markers onto the map
        */
      buildLocationList(mygeojson);
      map.addControl(geocoder, 'top-left');
      addMarkers(mygeojson);

      /**
        * Listen for when a geocoder result is returned. When one is returned, 
        * call sortCards for sorting
        */
      geocoder.on('result', (event) => {
        /* Get the coordinate of the search result */
        const searchResult = event.result.geometry;

        sortCards(searchResult, mygeojson);
      });
    });

    /**
      * - Calculate distances
      * - Sort opportunities by distance
      * - Rebuild the listings
      * - Adjust the map camera
      */
    function sortCards(searchResult, brands){
      /**
        * Calculate distances:
        * For each opportunity, use turf.disance to calculate the distance
        * in miles between the searchResult and the opportunity. Assign the
        * calculated value to a property called `distance`.
        */
      const options = { units: 'miles' };
      for (const brand of brands.features) {
        if (brand.geometry.coordinates) {
          brand.distance = turf.distance(
            searchResult,
            brand.geometry,
            options
          );
        }
      }
      
      //addIndustry(brands, BrandProfiles)

      /**
        * Sort opportunity by distance from closest to the `searchResult`
        * to furthest.
        */
      brands.features.sort((a, b) => {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0; // a must be equal to b
      });

      /**
        * Rebuild the listings:
        * Remove the existing listings and build the location
        * list again using the newly sorted opportunity.
        */
      const listings = document.getElementById('listings');
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(brands);      
    }

    //Add a marker to the map for every opportunity listing.
    function addMarkers(brands) {
      /* For each feature in the GeoJSON object: */
      for (const brand of brands.features) {
        /* Create a div element for the marker. */
        const el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${brand.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';
    
        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        if(brand.geometry.coordinates) {
          new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(brand.geometry.coordinates)
          .addTo(map);
        }

        /**
          * Listen to the element and when it is clicked, do three things:
          * 1. Fly to the point
          * 2. Close all other popups and display popup for clicked opportunity
          * 3. Highlight listing in scroll wheel (and remove highlight for all other listings)
          **/
        el.addEventListener('click', (e) => {
          /* Fly to the point */
          flyToBrand(brand);
          /* Close all other popups and display popup for clicked opportunity */
          createPopUp(brand);
          /* Highlight listing in scroll wheel */
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          const listing = document.getElementById(`listing-${brand.properties.id}`);
          listing.classList.add('active');
          // scroll to the active card
          listing.scrollIntoView({ behavior: 'smooth' }); 
        });
      }
    }

    //image resizing function that takes in image file then returns a resized uri of the image
    function resizeFile(file) {
      return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          file,
          500, // new image max width
          500, // new image max height
          'PNG', // default type
          100, // new image quality
          0, // rotation degree
          (uri) => {
            //console.log(uri); // resized new image uri
            resolve(uri); // Resolve the promise with the resized image URI
          },
          'base64' // output type
        );
      });
    }
    //since the resizeFile function were having issue loading image url instead of image file, this function will 
    //    fetch the image url and convert it to a blob object then call the image resizing function
    // Function to fetch image from URL , converts to blob object, then return the resized image uri
    async function fetchAndResizeImage(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return resizeFile(blob);
      } catch (error) {
        console.error('Error fetching and resizing image:', error);
        return "https://kodilan.com/img/empty-company-logo.8437254b.png";  // Default image on error
      }
    }
    
    //Add a listing for each opportunity to the scroll wheel.
    function buildLocationList(brands) {
      //clear the list before adding listings again
      const listings = document.getElementById('listings');
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }

      for (const brand of brands.features) {
        
        /* Add a new listing section to the scroll wheel. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${brand.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        const listingLeft = listing.appendChild(document.createElement('div'));
        listingLeft.className = 'listing-left-side';

        const listingRight = listing.appendChild(document.createElement('div'));
        listingRight.className = 'listing-right-side';
         
        /* Add the link to the individual listing created above. */       
        // const link = listingLeft.appendChild(document.createElement('a'));
        // link.href = '#';
        // link.className = 'BrandTitle';
        // link.id = `link-${brand.properties.id}`;
        // link.innerHTML = `${brand.properties.business_name}`;
        
        //switched to header element since link isn't currently being utilized
        const BrandTitle = listingLeft.appendChild(document.createElement('h2'));
        BrandTitle.textContent = brand.properties.business_name;
        BrandTitle.className = 'BrandTitle';
    
        /* Add details to the individual listing. */
        //this div contains the distance from user as well as a button to open the oppurtunity slide-out for a specific brand
        const details = listingLeft.appendChild(document.createElement('div'));

        if (brand.distance) {
          const roundedDistance = Math.round(brand.distance * 100) / 100;
          details.innerHTML += `<div class='distance'><strong>${roundedDistance}</strong> miles away</div>`;
        }
        else {
          details.innerHTML += `<br />`;
        }

        //The campaign feature will be integrated into this part of the card
        /* Button on card to toggle larger popup with more information */
        const DetailButton = details.appendChild(document.createElement('button'));
        DetailButton.addEventListener('click', function() {
          // #1 This should be commented if developer wants to disable the button
          setActive(true)
          setDrawerPayload(brand)
        })
        DetailButton.className = 'card-campaign-button';
        DetailButton.textContent =  "View opportunity";
        // #2 This should be uncommented if developer wants to disable the button
        //DetailButton.textContent = "Campaign details coming soon!";

        //image for the business is currently only a hard-coded placeholder, will have to fetch the actual image for later versions
        //  regarding business logo, must also establish a logo dimension
        const image = document.createElement('img');
        image.className = 'card-business-icon';
        //image.src = brand.properties.business_image ? brand.properties.business_image : "https://kodilan.com/img/empty-company-logo.8437254b.png";
        //if a brand have uploaded an image for their business, resize the image then load it onto the card
        //  else, use default icon for business without resizing
        if(brand.properties.business_image){
          const imageUrl = brand.properties.business_image
          fetchAndResizeImage(imageUrl)
            .then((resizedImageUrl) => {
              image.src = resizedImageUrl; // Set the src attribute of the image element
              image.loading = "lazy";
            })
        }
        else{
          image.src = "https://kodilan.com/img/empty-company-logo.8437254b.png";      
        }
        listingRight.appendChild(image);

        /**
          * Listen to the element and when it is clicked, do four things:
          * 1. Update the `currentFeature` to the opportunity associated with the clicked link
          * 2. Fly to the point
          * 3. Close all other popups and display popup for clicked opportunity
          * 4. Highlight listing in scroll wheel (and remove highlight for all other listings)
          **/
        listing.addEventListener('click', function () {
          for (const feature of brands.features) {
            if (this.id === `listing-${feature.properties.id}`) {
              flyToBrand(feature);
              createPopUp(feature);
            }
          }
          const activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          this.classList.add('active');
        });
      }
    }

    /**
      * Use Mapbox GL JS's `flyTo` to move the camera smoothly
      * a given center point.
      **/
    function flyToBrand(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      });
    }

    //Create a Mapbox GL JS `Popup` for markers.
    function createPopUp(currentFeature) {
      const popUps = document.getElementsByClassName('mapboxgl-popup');
      /** Check if there is already a popup on the map and if so, remove it */
      if (popUps[0]) popUps[0].remove();
      
      if(currentFeature.geometry.coordinates) {

        //if the business have a photo, use their photo to create popup, if not then use generic photo to do it
        if(currentFeature.properties.business_image){
          //business image gets resized to improve performance
          const imageUrl = currentFeature.properties.business_image
          fetchAndResizeImage(imageUrl)
            .then((resizedImageUrl) => {
              let imageSrc = resizedImageUrl; // Set the src attribute of the image element
              const popup = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat(currentFeature.geometry.coordinates)
                .setHTML(`<img src="${imageSrc}" style="aspect-ratio: 1 / 1; object-fit: cover;"></img>`)
                .addTo(map);
            })
        }
        else {
          const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(`<img src=${"https://kodilan.com/img/empty-company-logo.8437254b.png"}></img>`)
            .addTo(map);  
        }
        
      }
      else {
        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setHTML(`<img src=${currentFeature.properties.business_image ? currentFeature.properties.business_image : "https://kodilan.com/img/empty-company-logo.8437254b.png"}></img>`)
          .addTo(map);
      }            
    }

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserHeading: false  // arrow direction above user marker
    });

    map.addControl(geolocate);
  
    geolocate.on('error', () => {
      alert('An error event has occurred. Please make sure you have enabled location services for this site.');
    });
    
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);
  
  //filtering feature code (does not currently filter):
  // //records whether the industry category is checked
  // const [checkedIndustry, setCheckedIndustry] = React.useState(false);
  // //records the specific industries checked for filtering
  // const [industryName, setIndustryName] = React.useState([]);

  // const handleResetFilter = () => {
  //   setCheckedIndustry(false);
  //   setIndustryName([]);
  // }
  // //for handling apply filter button
  // const handleApplyFilter = () => {  
  //   // if(checkedIndustry) {
  //   //   console.log(industryName)
  //   // }
  //   // else
  //   //   alert("No filter option selected")
  // }

  // const handleIndustryFilter = (event) => {
  //   setCheckedIndustry(event.target.checked);
  // };
  // //the industries selected
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setIndustryName(
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  // const ITEM_HEIGHT = 25;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  // const industries = [
  //   'Real Estate',
  //   'Technology',
  //   'Dining',
  //   'Fitness',
  // ];

  return (
    <div>
      {active === true ? <BottomDrawer payload={drawerPayload} isActive={active} onShow={() => setActive(true)} onHide={() => setActive(false)} entityID={entityID}/> : <BottomDrawer isActive={false} /> }      
      {/* uncomment if you'd like to re-enable filter feature
        <div className='filter-overlay'>
          <p className='filterTitle'>Anything specific in mind?</p>
          <div className='filterOptions'>
            <div className='filterButtons'>
              <Button className='resetFilter' onClick={handleResetFilter}>Reset Filter</Button>
              <Button className='narrowSearch' onClick={handleApplyFilter}>Narrow Search</Button>
            </div>
            <div className='industryDiv'>
              <Checkbox
                  className="industryCheck"
                  checked={checkedIndustry}
                  onChange={handleIndustryFilter}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disableRipple
                  size= "small"
                  sx={{
                    paddingTop: 1,
                  }}
                />
                <FormControl sx={{ margin: 1, marginLeft:0, width: "35%"}} size="small">
                  <InputLabel id="industryDropdownLabel">Industry</InputLabel>
                  <Select
                    labelId="industryDropdownLabel"
                    id="industryDropdown"
                    multiple
                    value={industryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Industry" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {industries.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox 
                          checked={industryName.indexOf(name) > -1} 
                          disableRipple
                          sx={{
                            '&:hover': { bgcolor: 'transparent' },
                          }}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </div>
          </div>
        </div>
      */}
      <div ref={mapContainer} className="map-container map" id="map"/>  
      <div className="cover"> 
        <div className='scrollWheel'>
          <div id='listings' className='listings'></div>
        </div>
        {fetched ? <div className="left" onClick={leftScroll}><IoIosArrowBack/></div> : null}
        {fetched ? <div className="right" onClick={rightScroll}><IoIosArrowForward/></div>  : null}
      </div>
    </div>
  );
}

export default Map;
