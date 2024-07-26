// import node modules
import { useState , useEffect , useContext} from 'react';

// import routes
import addMatch from '../../routes/matches/addMatch';
import deleteMatch from "../../routes/matches/deleteMatch";
import getMatches from "../../routes/matches/getMatches";
import updateOpportunity from '../../routes/campaign/updateOpportunity';
import getBusinesses from '../../routes/business/getBusinesses';

// import models
import { opportunity_matches } from "../../models/db_models"

// import style
import "../../assets/style/index.css"

function ExpandOpportunity(props) {
  const { opportunityItem, userType, entityID, onSubmit , athletesMatch} = props;

  const [ matchData, setMatchData ] = useState(opportunity_matches);
  var [ allMatches, setAllMatches ] = useState([]);
  const [ allBrands , setAllBrands ] = useState([]);
  const [ brandName , setBrandName ] = useState('');
  const [formData, setFormData] = useState(opportunityItem);
  const [status, setStatus] = useState(formData.campaign_status === null ? "" : formData.campaign_status);
  const [isApplied, setIsApplied] = useState(false);
  const [buttonText, setButtonText] = useState('Apply');
  const [fetched , setFetched] = useState(false);


  //fetch data entries from database
  useEffect(() => { 
      const fetchData = async () => {
        const dataM = await getMatches();
        const dataB = await getBusinesses();
        setAllMatches(dataM);
        setAllBrands(dataB);
        setFetched(true);        
      };
      fetchData();

  }, []);

  useEffect(() => {
    if (userType.toLowerCase() === "athlete") {
      // find if the match already exists
      allMatches = allMatches.filter((match) => (match.chosen_athlete === entityID && match.campaign_id === formData.id));
      if (allMatches.length >= 1)
      {
        setIsApplied(true);
        setButtonText("Unapply");
      }
    }
    else {
      const brands = allBrands.filter((brand) => brand.id === formData.business_id);
      setBrandName(brands[0]?.business_name);
    }
  },[fetched]);

  const handleStatus = (event) => {
    setStatus(event.target.value);
    console.log('Selected status:', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.campaign_status = status;
    console.log(formData.opportunity);
    updateOpportunity(formData)
      .then(() => {
        onSubmit();
      })
      .catch(error => {
        console.error("Error adding opportunity:", error);
      });
  };

  const handleApply = (event) => {
    event.preventDefault();
    if (!isApplied) {
      // Handle the application logic here
      console.log('Applying...');
      matchData.opportunity_matches.campaign_id = formData.id;
      matchData.opportunity_matches.chosen_athlete = entityID;
      matchData.opportunity_matches.status = "pending";
      addMatch(matchData.opportunity_matches);
      setIsApplied(true);
      setButtonText('Unapply');
      // set allMatches to current matchData incase athlete hits Unapply
      setAllMatches(matchData.opportunity_matches);
      onSubmit();
    } 
    else {
      // Handle the unapplication logic here
      deleteMatch(allMatches.filter(match => match.campaign_id === formData.id)[0]);
      setIsApplied(false);
      setButtonText('Apply');
      onSubmit();
    }
  };

  console.log("expand.....");
  console.log(athletesMatch);

  if (userType.toLowerCase() === "staff") {
    return (
      <>
        <div className='container-body'>
          <h1 class="title">{formData.title}</h1>
          <p class="description">{formData.description}</p>
          <div class="info-section">
              <label class="info-label">Brand Name:</label>
              <div class="info-content">{brandName}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Event Type:</label>
              <div class="info-content">{formData.event_type}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Skills or Qualifications:</label>
              <div class="info-content">{formData.sports}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Compensation Type:</label>
              <div class="info-content">{formData.payment_type}</div>
          </div>
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="status" className="block text-black-600 text-left">
                    Select Status
                  </label>
                  <select id="status" name="status" onChange={handleStatus} value={status} required>
                      <option value="" disabled>Select Status</option>
                      <option key={0} value="accept">Accept</option>
                      <option key={1} value="reject">Reject</option>
                  </select>
              </div>
              <button class="apply-button" type="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
          </form>
          <div class="info-section">
              <label class="info-label">Athletes who Applied:</label>
              {athletesMatch.length >= 1 && 
                athletesMatch.map((athlete) => <div key={athlete.id} class="info-content">Name: {athlete.first_name} {athlete.last_name}, Email: {athlete.personal_email}</div>)
              }
          </div>
        </div>
      </>
    )
  }
  else if (userType.toLowerCase() === "athlete") {
    return (
      <>
        <div class='container-body'>
          <h1 class="title">{formData.title}</h1>
          <p class="description">{formData.description}</p>
          <div class="info-section">
              <label class="info-label">Event Type:</label>
              <div class="info-content">{formData.event_type}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Skills or Qualifications:</label>
              <div class="info-content">{formData.sports}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Compensation Type:</label>
              <div class="info-content">{formData.payment_type}</div>
          </div>
          {/*Only enable apply button if the user has an ID (staff does not have an user ID)*/}
          {entityID != null ? 
            (<button class="apply-button" onClick={handleApply}>{buttonText}</button>) 
            : (<button class="apply-button disabled" disabled>Button Disabled For Staff View</button>)
          }
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className='container-body'>
        <h1 class="title">{formData.title}</h1>
          <p class="description">{formData.description}</p>
          <div class="info-section">
              <label class="info-label">Brand Name:</label>
              <div class="info-content">{brandName}</div>
          </div> 
          <div class="info-section">
              <label class="info-label">Event Type:</label>
              <div class="info-content">{formData.event_type}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Skills or Qualifications:</label>
              <div class="info-content">{formData.sports}</div>
          </div>
          <div class="info-section">
              <label class="info-label">Compensation Type:</label>
              <div class="info-content">{formData.payment_type}</div>
          </div>
        </div>
      </>
    )
  }
}

export default ExpandOpportunity