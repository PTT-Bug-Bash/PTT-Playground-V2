import { api_url, api_key } from "../../url";

const getAthletes = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
  };
  const resp = await fetch(`${api_url}/api/athletes`, options);
  const data = await resp.json();

  console.log(data);

  return data;
};

export default getAthletes;
