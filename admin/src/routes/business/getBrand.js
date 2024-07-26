import { api_url, api_key } from "../../url";

const getBrand = async (brand_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
  };
  const resp = await fetch(`${api_url}/api/businesses/${brand_id}`, options);
  const data = await resp.json();

  console.log(data);

  return data;
};

export default getBrand;