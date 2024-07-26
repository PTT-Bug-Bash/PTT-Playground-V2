import React, { useState, useEffect} from 'react';
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import "../../assets/style/bottomDrawer.css";
import ImageCarousel from "./ImageCarousel";
import Resizer from "react-image-file-resizer";
import getOpportunitiesFromBrandId from '../../routes/campaign/getOpportunityFromBrandId';
import ExpandOpportunity from '../Opportunities/ExpandOpportunity';
import { Dialog, DialogTitle } from '@mui/material';

const drawerBleeding = 0;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

/* Used for 1-2 images only */
function StandardImageList({imageUrls}) {
  return (
    <ImageList 
      className={imageUrls.length === 1 ? 'single-image' : 'two-image'} 
      sx={{ p: 2, marginLeft: 'auto', marginRight: 'auto'}} 
      cols={imageUrls.length === 2 ? 2 : 1} 
      rowHeight='auto'
    >
      {imageUrls.map((imageUrl) => (
        <ImageListItem>
          <img
            srcSet={`${imageUrl}`}
            src={`${imageUrl}`}
            alt={imageUrl}
            loading="lazy"
            className={imageUrls.length === 1 ? 'single-image' : 'two-image'} 
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function BusinessIconImage({imageUrl}) {
  return (
    <ImageListItem sx={{ marginLeft: 'auto', marginRight: 'auto', p: 2, width: 192, height: 192 }} key={imageUrl}>
      <img
        srcSet={`${imageUrl}`}
        src={`${imageUrl}`}
        alt={imageUrl}
        loading="lazy"
        style={{borderRadius: '50%', aspectRatio: '1/1', objectFit: 'cover'}}
      />
    </ImageListItem>
  );
}

function BottomDrawer({payload, isActive, onShow, onHide, entityID}) {
  const userID = entityID;
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  const [data, setData] = useState({ opportunities: [] });
  //to track the open state for each opportunity
  const [openOpportunityDialogs, setOpenOpportunityDialogs] = useState({});

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
          //console.log("GENERATED: ", uri); // resized new image uri
          resolve(uri); // Resolve the promise with the resized image URI
        },
        'base64' // output type
      );
    });
  }
  
  //handle opening dialog for a specific opportunity
  const handleClickOpen = (opportunityIndex) => {
    setOpenOpportunityDialogs({
      ...openOpportunityDialogs,
      [opportunityIndex]: true,
    });
  }
  //handle closing dialog for a specific opportunity
  const handleClose = (opportunityIndex) => {
    setOpenOpportunityDialogs({
      ...openOpportunityDialogs,
      [opportunityIndex]: false,
    });
  }

  const handleSubmitExpand = (opportunityIndex) => {
    //reload the deals in case opportunities gets added/removed during submission process
    fetchDeals();
    //closes dialog on submit
    handleClose(opportunityIndex);
  }

  //function for fetching brand deals
  async function fetchDeals() {
    if (payload && payload.properties) {
      try {
          const opportunities = await getOpportunitiesFromBrandId(payload.properties.id);
          setData({ opportunities });
          //console.log("Read deals from ", payload.properties.business_name, "ID: ", payload.properties.id)
          //console.log(data)
      } catch (error) {
          console.log("Error: ", error.message)
      }
    }
  };

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
  
  useEffect(() => {
    //clear opportunity state before fetching new ones for the brand
    setData({ opportunities: [] });
    //fetch for opportunities from the specific brand in the pop up
    fetchDeals();
    if (payload && payload.properties && payload.properties.business_image) {
      //fetch business image if the brand have already uploaded a image for their business
      fetchAndResizeImage(payload.properties.business_image)
        .then(resizedUri => {
          setResizedImageUrl(resizedUri);
        });
    } else {
      setResizedImageUrl("https://kodilan.com/img/empty-company-logo.8437254b.png");
    }
    //for checking the correctness of the prop passed 
    // if(userID)
    //   console.log("entity id: " , userID.entityID);
  }, [payload]);

  return (
    <Root>    
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(85vh - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={document.body}
        anchor="bottom"
        open={isActive}
        onClose={onHide}
        onOpen={onShow}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
          <Puller/> 
          {(payload != null ?         
            <div style={{maxHeight: '80vh'}} className="popup-container">
              <Typography 
                className="campaign-text" 
                sx={{
                  fontWeight: 'bold', 
                  paddingTop: 2, 
                  fontSize: '36px' 
                }}
              >
                {payload.properties.business_name}
              </Typography>
              
              { (payload.properties.address && payload.properties.city)
                ? <Typography className="campaign-text" sx={{fontSize: '18px' }}>
                    {`${payload.properties.address} · ${payload.properties.city}`}
                  </Typography>
                : null 
              }

              { payload.properties.business_image 
                ? <BusinessIconImage imageUrl={ resizedImageUrl } />
                : <BusinessIconImage imageUrl={"https://kodilan.com/img/empty-company-logo.8437254b.png"} /> 
              }

              <Typography 
                className="campaign-text" 
                sx={{
                  fontWeight: 'bold', 
                  fontSize: '28px' 
                }}
              >
                {/*Changing page title based on amount of opportunities*/}
                {data.opportunities.length > 0 ? (
                  data.opportunities.length === 1 ? `Opportunity Available` 
                  : `List of Opportunities`
                )
                : ("")
                }
              </Typography>
              
              {/* if the business have at least 1 opportunity, create opportunity cards
                    if a business have no opportunities, display a message indicating it*/}
              <div className='listing'>
                {data.opportunities.length > 0 ? (
                  data.opportunities.map((opportunity, index) => (
                    <div key={index} className='opportunityCard'>
                      <Button className='opportunityTitleButton' sx={{ fontWeight: 'bold', fontSize: 'large' , padding: '0', transition: '0.5s ease-in-out'}} size="large" 
                        onClick={() => handleClickOpen(index)} // Pass index to handleClickOpen
                      >
                        {opportunity.title}
                      </Button>

                      {/*Dialog for viewing more info on the opportunity as well as apply*/}
                      <Dialog onClose={() => handleClose(index)} open={openOpportunityDialogs[index] || false}> {/* Use specific open state for this opportunity */}
                        <DialogTitle>Manage Opportunity</DialogTitle>
                        <ExpandOpportunity opportunityItem={opportunity} userType={"athlete"} entityID={userID.entityID} onSubmit={() => handleSubmitExpand(index)} />
                      </Dialog>

                      <Typography>{opportunity.description}</Typography>
                      <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '12px', paddingTop: '1vh' }}>
                        {"event type: " + opportunity.event_type}
                      </Typography>
                      {/* Display other properties of the opportunity here if needed*/}
                    </div>
                  ))
                ) : (
                  <Typography sx={{ padding: '5vh', color: 'grey', textAlign: 'center', fontSize: 'large'}}>
                    This brand does not have any opportunities available at the moment. Please check again later!
                  </Typography>
                )}
              </div>

              { payload.properties.imageUrls
                ? payload.properties.imageUrls.length < 3 
                  ? <StandardImageList imageUrls={payload.properties.imageUrls}/> 
                  : <ImageCarousel imageUrls={payload.properties.imageUrls}/>
                : null
              }
            </div> : null)}

            {/* Interest Button disabled for the time being
            <div className="static-bar">
              <Button className="interest-button" color="inherit">{`I'm Interested`}</Button>
            </div>
            */ }
      </SwipeableDrawer>
    </Root>
  );
}

export default BottomDrawer;