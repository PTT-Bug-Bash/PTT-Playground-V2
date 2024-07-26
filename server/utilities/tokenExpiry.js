
import setupDB from "../db/db-setup";
import { User } from '../db/models/user'; 
const db = setupDB();


// // Function runs every 4 seconds to check registration token validity
setInterval(async function checkRegistrationTokenValidity() {
  try {
    const timeOfTokenCreation = await database.select("id", "createdtime").from("users");
    timeOfTokenCreation.map(async entryTime => {
      let timeInInt = parseInt(entryTime.createdtime);

      // Check if an hour has passed since the token was generated
      if (Date.now() > timeInInt + 60000 * 60) {
        await database
          .table("users")
          .where("id", entryTime.id)
          .update({ token: null }); //updates old tokens to null
      }
    });
  } catch (err) {
    console.log(err);
  }
}, 4000);

// Function runs every 6 seconds to remove reset password tokens older than one hour
setInterval(async function checkPasswordTokenValidity() {
  try {
    const tokenExpiry = await database.select("id", "reset_password_expires").from("users");
    tokenExpiry.map(async resetTime => {
      let timeInInt = parseInt(resetTime.reset_password_expires);
      if (Date.now() > timeInInt + 60000 * 60) {
        await database
          .table("users")
          .where("id", resetTime.id)
          .update({ reset_password_token: null });
      }
    });
  } catch (err) {
    console.log(err);
  }
}, 6000);