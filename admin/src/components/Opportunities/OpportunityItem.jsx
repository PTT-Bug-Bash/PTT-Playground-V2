// import node modules
import { FaTimes , FaEdit} from "react-icons/fa"
import { useState , useEffect } from "react";

// import components
import Card from "../../components/Card";

// import styles
import "../../assets/style/index.css"

function OpportunityItem(props) {
    const { item , entityID , userType, handleOpenEdit, handleOpenExpand, handleDelete, matches, brands} = props;
    const [appliedText, setAppliedText] = useState('');
    const [subText , setSubText] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState(brands.filter(brnd => brnd.id === item.business_id));


    useEffect(() => {
        // This effect runs when `allMatches` is updated, which only occurs after the data is fetched
        if (userType.toLowerCase() === "athlete" && matches.length > 0) {
            // Find if the match already exists
            if (matches.filter(match => match.chosen_athlete === entityID && match.campaign_id === item.id).length >= 1) {
                setAppliedText(`Applied for this Opportunity`);
                setSubText(`current Status: ${matches.filter(match => match.chosen_athlete === entityID && match.campaign_id === item.id)[0].status}`);
                setColor("card-blue");
            }
        }
        console.log(matches.length);
        if ((userType.toLowerCase() === "staff" || userType.toLowerCase() === "brand") 
            && matches.filter(match => match.campaign_id === item.id).length >= 1 ) {
                setColor("card-gold")
                setAppliedText("Athlete has Applied")
        }
        else if (userType.toLowerCase() === "staff" || userType.toLowerCase() === "brand") {
            if (item.campaign_status === "accept") {
                setColor("card-green")
                setAppliedText("Opportunity Approved")
            }
            else if (item.campaign_status === "reject") {
                setColor("card-red")
                setAppliedText("Opportunity Rejected ")
            }
            else {
                setColor("card-blue")
                setAppliedText("Needs Review & Approval")
            }
        }
    }, []);  // Adding dependencies



    if (userType.toLowerCase() === "athlete") {
        return (
            <Card color={color}>
                <div className="card-head">
                    <img src={item.icon_image} alt="Opportunity logo" />
                    <div className="stacked-head">
                        <div className="text-title">{item.title}</div>
                        <div className="sub-title">{appliedText}</div>
                        <div className="sub-title">{subText}</div>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => handleOpenExpand(item)} className="accept apply-button">
                            Open
                        </button>
                    </div>
                </div>
                <div className="text-description">{item.description}</div>
            </Card>
        )
    }
    else {
        return (
            <Card color={color}>
                <button onClick={() => { if(window.confirm("Are you sure you want to delete?")){handleDelete(item);}}} className="close">
                <FaTimes color="Orange"></FaTimes>
                <span class="tooltiptext">Delete Opportunity</span>
                </button>
                <button onClick={() => handleOpenEdit(item)} className="edit">
                <FaEdit color="Orange" />
                <span class="tooltiptext">Edit Opportunity</span>
                </button>
                <div className="card-head">
                    <img src={item.icon_image.length > 5? item.icon_image : "https://kodilan.com/img/empty-company-logo.8437254b.png"} alt="Opportunity logo" />
                    <div className="stacked-head">
                        <div className="text-title">{item.title}</div>
                        <div className="sub-title">Brand: {brand.length === 1 ? brand[0].business_name : ""}</div>
                        <div className="sub-title">{appliedText}</div>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => handleOpenExpand(item)} className="accept apply-button">
                            Open
                        </button>
                    </div>
                </div>
                <div className="text-description">{item.description}</div>
            </Card>
        )
    }
}

export default OpportunityItem