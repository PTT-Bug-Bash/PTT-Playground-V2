import { api_url, api_key } from "../../url";

const getAthlete = async (athlete_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
  };
  const resp = await fetch(`${api_url}/api/athletes/${athlete_id}`, options);
  let data;
  try {
    data = await resp.json();
  } catch (err) {
    data = undefined;
  }

  console.log(data);

  return data;
};

export default getAthlete;