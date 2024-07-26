import { api_url, api_key } from "../../url";

const deleteBusiness = async (deletedBusiness) => {
  const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key
      },
      body: JSON.stringify(deletedBusiness)
  };

  const response = await fetch(`${api_url}/api/delete_business/${deletedBusiness.id}`, options);
  const data = await response.json();

  if (response.ok)
    return Promise.resolve(data);
  else 
    return Promise.reject(data);
}

export default deleteBusiness;