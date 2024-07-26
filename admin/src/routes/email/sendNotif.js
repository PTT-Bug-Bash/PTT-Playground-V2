import { api_url, api_key } from "../../url";

export async function sendAthleteEmail(firstName, lastName, email, phone, sport, school) {
  const to = "hunter@athletereserve.com";
  const sub = "New Athlete Application";
  const content = `
      <body> 
        <h1>New Athlete Application</h1>
        <p>Name: ${firstName} ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Sport: ${sport}</p>
        <p>School: ${school}</p>
      </body>
  `;
    
  return sendEmail(to, sub, content);
}

export async function sendOrgEmail(org, firstName, lastName, email, phone) {

  const to = "hunter@athletereserve.com";
  const sub = "New Athlete Application";
  const content = `
    <body> 
      <h1>New Organization Application</h1>
      <p>Organization Name: ${org}</p>
      <p>Representative Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
    </body>
  `;

  return sendEmail(to, sub, content);
}

export async function sendEmail(to, subject, content) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key
    },
    body: JSON.stringify({to, subject, content})
  };

  const response = await fetch(`${api_url}/api/send-email`, options);
  const data = await response.json();
    
  return data;
}