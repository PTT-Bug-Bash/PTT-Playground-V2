// import node modules
import { useState , useEffect} from "react";
import { Dialog, DialogTitle } from '@mui/material';

// import components
import OpportunityList from "../Opportunities/OpportunityList"
import ExpandOpportunity from './ExpandOpportunity';
import OpportunityEditForm from './forms/OpportunityEditForm';

// import routes
import deleteOpportunity from "../../routes/campaign/deleteOpportunity";
import getOpportunities from "../../routes/campaign/getOpportunities";
import getAthletes from "../../routes/athlete/getAthletes";
import getMatches from "../../routes/matches/getMatches";
import getBusinesses from "../../routes/business/getBusinesses";

// import styles
import "../../assets/style/index.css"

function EditOpportunityDialog(props) {
  const { opportunityItem, open, onClose, onSubmit } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit Opportunity</DialogTitle>
      <OpportunityEditForm opportunityItem={opportunityItem} onSubmit={onSubmit} />
    </Dialog>
  )
}

function ExpandOpportunityDialog(props) {
  const { opportunityItem, userType, entityID, open, onClose, onSubmit, athletesMatch} = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Manage Opportunity</DialogTitle>
      <ExpandOpportunity opportunityItem={opportunityItem} userType={userType} entityID={entityID} onSubmit={onSubmit} athletesMatch={athletesMatch}/>
    </Dialog>
  )
}

function OpportunityBoard(props) {
  const { userType, entityID } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayExpand, setDisplayExpand] = useState(false);
  const [opportunityItem, setOpportunityItem] = useState(null);

  const [ athleteMatches, setAthleteMatches ] = useState([]);
  const [ matches , setMatches ] = useState([]);
  const [ athletes, setAthletes ] = useState([]);
  const [ brands, setBrands ] = useState([]);

  useEffect(() => { 
    fetchOpportunities();
    // eslint-disable-next-line
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    // simulate fetching data
    const temp = await getOpportunities();
    let opportunities;

    setMatches(await getMatches());
    setAthletes(await getAthletes());
    setBrands(await getBusinesses());
    
    switch (userType.toLowerCase()) {
      case "brand":
        opportunities = temp.filter((opportunity) => opportunity.business_id === entityID);
        break;
      case "athlete":
        opportunities = temp.filter((opportunity) => opportunity.campaign_status === "accept");
        break;
      default:
        opportunities = temp;
    }

    console.log("Data updated in context:", opportunities);
    setData(opportunities);
    setLoading(false);
  };

  const fetchAppliedAthletes = (item) => {

    // filter to get only matches for this one opportunity
    console.log("Athletes.......");
    if (matches.filter(match => match.campaign_id === item.id).length >= 1){
      setAthleteMatches(athletes.filter(athlete => matches.filter(match => match.chosen_athlete === athlete.id).length >= 1 ));
    }
    else{
      setAthleteMatches([]);
    }
  }

  // edit callback functions
  const handleOpenEdit = (opportunityItem) => {
    setOpportunityItem(opportunityItem);
    setDisplayEdit(true);
  }

  const handleCloseEdit = () => {
    setDisplayEdit(false);
  }

  const handleSubmitEdit = () => {
    setLoading(true);
    fetchOpportunities();
    handleCloseEdit();
  }

  // expand callback functions
  const handleOpenExpand = (opportunityItem) => {
    fetchAppliedAthletes(opportunityItem);
    setOpportunityItem(opportunityItem);
    setDisplayExpand(true);
  }

  const handleCloseExpand = () => {
    setDisplayExpand(false);
  }

  const handleSubmitExpand = () => {
    setLoading(true);
    fetchOpportunities();
    handleCloseExpand();
  }

  // delete callback functions
  const handleDelete = (opportunityItem) => {
    deleteOpportunity(opportunityItem).then(() => {
      fetchOpportunities();
      window.alert("Opportunity Deleted");
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userType.toLowerCase() !== 'staff' && (entityID === null || entityID === undefined)) {
    return <div>No entityID for user currently exists. Please save details first.</div>;
  }

  return (
      <div>
          <div className="container-body">
              <OpportunityList data={data} userType={userType} entityID={entityID} handleOpenEdit={handleOpenEdit} handleOpenExpand={handleOpenExpand} handleDelete={handleDelete} matches={matches} brands={brands}/>
          </div>
        {userType.toLowerCase() !== "athlete" &&
          <EditOpportunityDialog 
            opportunityItem={opportunityItem}
            open={displayEdit}
            onClose={handleCloseEdit}
            onSubmit={handleSubmitEdit}
          />
        }
        <div>
          <ExpandOpportunityDialog 
            opportunityItem={opportunityItem}
            userType={userType}
            entityID={entityID}
            open={displayExpand}
            onClose={handleCloseExpand}
            onSubmit={handleSubmitExpand}
            athletesMatch={athleteMatches}
          />
        </div>
      </div>
  )
}

//default props values
OpportunityBoard.defaultProps = {
  userType: 'staff',
  userID: 0,
}

export default OpportunityBoard