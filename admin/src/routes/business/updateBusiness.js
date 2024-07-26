import { api_url, api_key } from "../../url";

const updateBusiness = async (business) => {
  const options = {
    method: 'PUT' ,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
    body: JSON.stringify(business)
  }

  const response = await fetch(`${api_url}/api/update_business`, options);
  const data = await response.json();

  if (response.ok)
    return Promise.resolve(data);
  else 
    return Promise.reject(data);
}

export default updateBusiness;