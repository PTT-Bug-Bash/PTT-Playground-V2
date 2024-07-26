import React , { useState, createContext, useEffect } from "react";
import getOpportunities from "../../../routes/campaign/getOpportunities";

const OpportunityContext = createContext()

export const OpportunityProvider = ({children}) => {
    const [data, setData] = useState([]);

    //fetch data entries from database
    useEffect(() => { 
        fetchOpportunities();
    }, []);

    const [loading, setLoading] = useState(false);
  
    const fetchOpportunities = async () => {
      setLoading(true);
      // simulate fetching data
      const dataO = await getOpportunities();
      console.log("Data updated in context:", dataO);
      setData([...dataO]);
      setLoading(false);
    };
  
    const refreshOpportunities = () => {
      fetchOpportunities();
    };


    return <OpportunityContext.Provider value={{data , refreshOpportunities}}>
        {children}
    </OpportunityContext.Provider>
}

export default OpportunityContext