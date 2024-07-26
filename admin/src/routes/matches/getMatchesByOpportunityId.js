import { api_url, api_key } from "../../url";

const getMatchesByOpportunityId = async (opportunity_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
  };
  const resp = await fetch(`${api_url}/api/campaign_matches/${opportunity_id}`, options);

  let data;
  
  try {
    data = await resp.json();
  } catch (err) {
    data = undefined;
  }

  return data;
};

export default getMatchesByOpportunityId;