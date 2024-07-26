import setupDB from "./db/db-setup";
import { Athlete } from "./db/models/athlete";
import { AthleteProfile } from "./db/models/athlete_profile";
import { DealPreference } from "./db/models/deal_preference";
import { Location } from "./db/models/locations";
import { Business } from "./db/models/business";
import { BusinessProfile } from "./db/models/business_profile";
import { BusinessDeal } from "./db/models/business_deal";
import { Campaign }  from "./db/models/campaign";
import { CampaignImage } from "./db/models/campaign_image";
import { Matches } from "./db/models/matches";
import { AdminNotes } from "./db/models/admin_notes";
import { User } from "./db/models/user";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { IGeocodeResponse, geocode } from "@esri/arcgis-rest-geocoding";
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto';
import sendEmail from "./utilities/sendEmail";
import checkRegistrationFields from "./validation/register";
import knexPostgis from "knex-postgis";

var cors = require("cors");
var bodyParser = require("body-parser");
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.API_BASE_URL;
const baseUrl2 = process.env.APP_BASE_URL;

const db = setupDB();
const st = knexPostgis(db);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const arcgis_auth = ApiKeyManager.fromKey(
  "AAPKb2b4ca5502554b68b174f4465a84dd5cu06tpcZB81u-jHco-iLC9v6wyiS-SShLnT2pXY9QpVY2FrDlHIs8b5FaQMwf8DOB"
);

const getCoordinates = async (
  address: string,
  _state: string,
  zip: string
): Promise<IGeocodeResponse> => {
  return geocode({
    address: address,
    postal: parseInt(zip),
    countryCode: "USA",
    authentication: arcgis_auth,
  });
};

const createPoint = (x: number, y: number): any => {
  if (x === null || y === null)
    return null;

  return st.setSRID(st.makePoint(x, y), 4326);
}

app.get("/", (_req: any, res: any) => {
  res.send("Hello World!");
});

app.get("/api", (_req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/ingest_from_sma", (req: any, res: any) => {
  const body = req.body;
  console.log(body);
  res.json({ message: "Hello from server!" });
});

// send email
app.post('/api/send-email', authenticateKey, async (req: Request, res: Response) => {
  const { to, subject, content } = req.body;

  // Validation for the request data
  if (!to || !Array.isArray(to) || to.length === 0 || !to.every(email => typeof email === 'string')) {
    return res.status(400).json({ message: 'Invalid or missing "address" field of emails' });
  }
  if (!subject || typeof subject !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "subject" field' });
  }
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "content" field' });
  }

  try {
   
    sendEmail.Email(to, subject, content);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

//#region User

// register user
app.post("/api/register", authenticateKey, async (req: Request, res: Response) => {
  const userData = req.body;
  const { errors, isValid } = checkRegistrationFields(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
 

  try {
    const token = await new Promise<string>((resolve, reject) => {
        crypto.randomBytes(48, (err, buf) => {
            if (err) reject(err);
            else resolve(buf.toString('base64').replace(/\//g, '').replace(/\+/g, '-'));
        });
    });
  
      // Check if the email already exists in the database
      const existingUser = await db('users').where('email', userData.email).first();
    if (existingUser) {
      if(existingUser.emailverified === 'false'){
        return res.status(400).json({ email: "Email already exists, please verify your email." });
      }
      return res.status(400).json({ email: "Email already exists, please login or try another email." });
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(userData.password1, salt);
    const tokenExpiration = new Date(Date.now() + 120000).toISOString();
    const users: User[] = await db("users").returning(["id", "email", "token","role"])
    .insert({
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    password: hash,
    registered: new Date().toISOString(),
    token,
    role: userData.role,
    createdtime: new Date().toISOString(),
    emailverified: "f",
    tokenusedbefore: "f"
});
    if (users.length === 0) {
      console.error("No user returned from the database.");
      return res.status(500).json({ error: "Failed to register user." });
    }
    
    const user = users[0];
    const to = [user.email];
    const link = `${baseUrl2}/verify/${user.token}`;
    const sub = "Athletereserve.com - Confirm Registration";
    let content = `<body><p>Please verify your email to activate your account by clicking the link.</p> <a href="${link}">Verify email</a></body>`;
 
    sendEmail.Email(to, sub, content);
    res.status(200).json({ message: "Registration successful, please check your email to verify." });
  } catch (error) {
    console.error("Registration error:", error);
    // errors.account = "Email already registered or other database error";
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

// verify user
app.get("/api/verify/:token", authenticateKey, async (req: Request, res: Response) => {
  const { token } = req.params;
  const errors: { [key: string]: string } = {};

  try {
    const user = await db
      .from("users")
      .where({ token, tokenusedbefore: "f" })
      .first();

    if (user) {
      const data = await db
        .returning(["email", "emailverified", "tokenusedbefore"])
        .from("users")
        .where({ id: user.id })
        .update({ emailverified: "t", tokenusedbefore: "t" });

      if (data) {
        res.json("Email verified! Please login to access your account");
      } else {
        errors.updateFailed = "Failed to update user verification status.";
        res.status(500).json(errors);
      }
    } else {
      const check = await db
        .select("email", "emailverified", "tokenusedbefore")
        .from("users")
        .where("token", token)
        .first();

      if (check && check.emailverified) {
        errors.alreadyVerified = "Email already verified. Please login to your account.";
        res.status(400).json(errors);
      } else {
        errors.email_invalid = "Invalid or expired token. Please check your email for the correct verification link or request a new one.";
        res.status(400).json(errors);
      }
    }
  } catch (err) {
    console.error("Database error during email verification:", err);
    errors.db = "Database error.";
    res.status(500).json(errors);
  }
});

// login user
app.post("/api/login", authenticateKey, async (req: any, res: any) => {
  try {
    const user = await db
      .select("id", "email", "password", "role", "entity_id")
      .from("users")
      .where({ email: req.body.email })
      .andWhere("emailverified", true)
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      entity_id: user.entity_id  // Include entity_id in the JWT payload if needed
    };
    
    const token = jwt.sign(payload, process.env.secretOrKey, { expiresIn: 3600 });

    res.json({
      success: true,
      token: "Bearer " + token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        entity_id: user.entity_id  // Sending entity_id to the client
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// forgot password route
app.post("/api/forgot", authenticateKey, async (req: Request, res: Response) => {
  try {
    let resetToken: string = await new Promise((resolve, reject) => {
      crypto.randomBytes(48, (err, buf) => {
        if (err) reject(err);
        resolve(buf.toString("hex"));
      });
    });

    const expirationDate: string = new Date(Date.now() + 3600000).toISOString();

    const emailData = await db.table("users").select("*").where("email", req.body.email);
    if (emailData.length === 0) {
      res.status(400).json("Invalid email address");
    } else {
      await db.table("users")
        .where("email", emailData[0].email)
        .update({
          reset_password_token: resetToken,
          reset_password_expires: expirationDate,
          reset_password_token_used: false
        });

      const to = [req.body.email];
      const link = `${baseUrl2}/reset-password/${resetToken}`;
      const sub = "Reset Password";
      const content  = `<body><p>Please reset your password.</p><a href="${link}">Reset Password</a></body>`;
      sendEmail.Email(to, sub, content);

      res.status(200).json("Please check your email for the reset password link");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Bad Request");
  }
});

// Reset password route
app.post("/api/reset_password/:token", authenticateKey, async (req: Request, res: Response) => {
  const token: string = req.params.token;
  try {
    const data = await db
      .select(["id", "email"])
      .from("users")
      .where({ reset_password_token: token, reset_password_token_used: false });

    if (data.length > 0) {

      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(req.body.password1, salt);

      const user = await db("users")
        .returning("email")
        .where({ id: data[0].id, email: data[0].email })
        .update({ password: hash, reset_password_token_used: true });

      const sub = "Password change for your account.";
      const content = `The password for your account registered under ${data[0].email} has been successfully changed.`;
      sendEmail.Email(data[0].email, sub, content);
      res.json("Password successfully changed for " + data[0].email + "!");
    } else {
      res.status(400).json("Password reset error!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Bad request");
  }
});

//Get all users route
app.get('/api/users', authenticateKey, async (req, res) => {
  try {
    const sortByVerified = req.query.sortByVerified === 'true';
    const usersQuery = db.select('id', 'first_name','last_name','email', 'role', 'emailverified','createdtime').from('users');
    if (sortByVerified) {
      usersQuery.orderBy('emailverified', 'desc');
    }
    const users = await usersQuery;
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// get specific user
app.get('/api/users/:id', authenticateKey, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.query().select("*").findById(id);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
})

// Update user details route
app.put('/api/users/:id',  authenticateKey, async (req: Request, res: Response) => {
  const { id } = req.params;
  interface UserUpdateRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
}
  const { first_name, last_name, email, role } = req.body as UserUpdateRequest;
   
  const updateData: UserUpdateRequest = {};
  if (first_name !== undefined) updateData.first_name = first_name;
  if (last_name !== undefined) updateData.last_name = last_name;
  if (email !== undefined) updateData.email = email;
  if (role !== undefined) updateData.role = role;

  try {
    
    await db('users').where('id', id).update(updateData);
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//Delete users route
app.delete('/api/users/:id', authenticateKey, async (req, res) => {
  const { id } = req.params;
  try {
    await db('users').where('id', id).del();
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// link user to athlete id
app.post('/api/link_user_to_athlete/:user_id&:athlete_id', authenticateKey, async (req: Request, res: Response) => {
  const { user_id, athlete_id } = req.params;

  try {

    // confirm user id is valid
    const user = await User.query().select("*").findById(user_id);

    if (!(user instanceof User))
      throw new Error("Error linking user to athlete: invalid user_id supplied.");

    // confirm athlete id is valid
    const athlete = await Athlete.query().select("*").findById(athlete_id);

    if (!(athlete instanceof Athlete))
      throw new Error("Error linking user to athlete: invalid athlete_id supplied.");

    await db('users').where('id', user_id).update({ entity_id: athlete_id })

    res.json({ message: "User linked successfully to athlete" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message});
  }
});

// link user to brand id
app.post('/api/link_user_to_brand/:user_id&:brand_id', authenticateKey, async (req: Request, res: Response) => {
  const { user_id, brand_id } = req.params;

  try {

    // confirm user id is valid
    const user = await User.query().select("*").findById(user_id);

    if (!(user instanceof User))
      throw new Error("Error linking user to brand: invalid user_id supplied.");

    // confirm brand id is valid
    const brand = await Business.query().select("*").findById(brand_id);

    if (!(brand instanceof Business))
      throw new Error("Error linking user to brnad: invalid brand_id supplied.");

    await db('users').where('id', user_id).update({ entity_id: brand_id })

    res.json({ message: "User linked successfully to brand" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message});
  }
});

//#endregion

//#region Athletes

// get all athletes
app.get("/api/athletes", authenticateKey, async (_req: any, res: any) => {
  try {
    const athletes = await Athlete.query().select(
      "*",
      st.x("location").as("longitude"),
      st.y("location").as("latitude"),
    ).orderBy("updated_at", "desc");
    
    console.log(athletes);
    res.json(athletes);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get athlete
app.get("/api/athletes/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const athlete = await Athlete.query().findById(id).select(
      "*",
      st.x("location").as("longitude"),
      st.y("location").as("latitude")
    );
    res.json(athlete);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create athlete
app.post("/api/athletes", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, athleteModel.athlete);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating athlete: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);
    console.log(body);

    let coordinates;

    if (body.address === "" || body.state === "" || body.zip === "")
      coordinates = [ null, null ];
    else 
      await getCoordinates(body.address, body.state, body.zip).then(async (resp) => {
        coordinates = [
          resp.candidates[0].location.x,
          resp.candidates[0].location.y,
        ];
      });
  
    const athlete = await Athlete.query().insert({
      ...body,
      location: createPoint(coordinates[0], coordinates[1])
    });
    
    res.json({ athlete });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update athlete
app.put("/api/update_athlete", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, athleteModel.athlete);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating athlete: Invalid data");
    }

    console.log("UDPATE ATHLETE");
    console.log(model);

    let coordinates;

    if (model.address === "" || model.state === "" || model.zip === "")
      coordinates = [ null, null ];
    else
      await getCoordinates(model.address, model.state, model.zip).then(async (resp) => {
        coordinates = [
          resp.candidates[0].location.x,
          resp.candidates[0].location.y,
        ];
      });
    
    const athlete = await Athlete.query()
    .update({
      ...model,
      location: createPoint(coordinates[0], coordinates[1])
    })
    .where("id", model.id);
      
    res.json(athlete);
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete athlete
app.delete("/api/delete_athlete/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line no-console
    console.log("Deleting Athlete: " + id);

    const athlete = await Athlete.query().deleteById(id);

    res.json(athlete);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Athlete Profile

// get all athlete profiles
app.get("/api/athlete_profiles", authenticateKey, async (_req:any, res: any) => {
  try {
    const profiles = await AthleteProfile.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(profiles);

    res.json(profiles);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get athlete profile
app.get("/api/athlete_profiles/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const profile = await AthleteProfile.query().findById(id);

    res.json(profile);
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create athlete profile
app.post("/api/athlete_profiles", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, athlete_profile.athlete_profile);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating athlete_profile: Invalid data");
    }

    const temp = (({ id, ...others }) => others)(model);
    let { dob, ...body } = temp;

    if ( dob === "")
      dob = null;
    
    // first confirm foreign key exists
    const athlete = await Athlete.query().findById(body.athlete_id);

    if (athlete instanceof Athlete) {
      const profile = await AthleteProfile.query().insert({
        ...body,
        dob: dob
      });
  
      res.json(profile);
    } else 
      throw new Error("Error inserting athlete_profile: invalid athlete_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update athlete profile
app.put("/api/update_athlete_profile", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, athlete_profile.athlete_profile);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating athlete_profile: Invalid data");
    }

    // first confirm foreign key exists
    const athlete = await Athlete.query().findById(model.athlete_id);

    if (athlete instanceof Athlete) {
      const profile = await AthleteProfile.query().update({
        ...model
      }).where("id", model.id);
  
      res.json(profile);
    } else 
      throw new Error("Error updating athlete_profile: invalid athlete_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete athlete profile
app.delete("/api/delete_athlete_profile/:id", authenticateKey, async (req: any, res: any) => {
  try { 
    const { id } = req.params;

    // eslint-disable-next-line no-console
    console.log("Deleting Athlete Profile: " + id);

    const profile = await AthleteProfile.query().deleteById(id);

    res.json(profile);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Athlete Deal Preference

// get all deal preferences
app.get("/api/athlete_deal_preferences", authenticateKey, async (_req: any, res: any) => {
  try {
    const preferences = await DealPreference.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(preferences);

    res.json(preferences);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get deal preference
app.get("/api/athlete_deal_preferences/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const preference = await DealPreference.query().findById(id);

    res.json(preference);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create deal preference
app.post("/api/athlete_deal_preferences", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, deal_preference.deal_preference);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating deal_preference: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const profile = await AthleteProfile.query().findById(body.athlete_profile_id);

    if (profile instanceof AthleteProfile) {
      const preference = await DealPreference.query().insert({
        ...body
      });
  
      res.json(preference);
    } else
      throw new Error("Error inserting deal_preference: invalid athlete_profile_id supplied.");    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update deal preference
app.put("/api/update_deal_preference", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, deal_preference.deal_preference);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating deal_preference: Invalid data");
    }

    // first confirm foreign key exists
    const profile = await AthleteProfile.query().findById(model.athlete_profile_id);

    if (profile instanceof AthleteProfile) {
      const preference = await DealPreference.query().update({
        ...model
      }).where("id", model.id);

      res.json(preference);
    } else
      throw new Error("Error updating deal_preference: invalid athlete_profile_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete deal preference
app.delete("/api/delete_deal_preference/:id", authenticateKey, async (req: any, res: any) =>{
  try {
    const { id } = req.params;

    const preference = await DealPreference.query().deleteById(id);

    res.json(preference);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Athlete Locations

// get all locations
app.get("/api/athlete_locations", authenticateKey, async (_req: any, res: any) => {
  try {
    const locations = await Location.query().select(
      "*",
      st.x("curr_location").as("curr_longitude"),
      st.y("curr_location").as("curr_latitude"),
      st.x("affiliation_location").as("affiliation_longitude"),
      st.y("affiliation_location").as("affiliation_latitude"),
      st.x("home_location").as("home_longitude"),
      st.y("home_location").as("home_latitude")
    ).orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(locations);

    res.json(locations);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get location
app.get("/api/athlete_locations/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const location = await Location.query().findById(id).select(
      "*",
      st.x("curr_location").as("curr_longitude"),
      st.y("curr_location").as("curr_latitude"),
      st.x("affiliation_location").as("affiliation_longitude"),
      st.y("affiliation_location").as("affiliation_latitude"),
      st.x("home_location").as("home_longitude"),
      st.y("home_location").as("home_latitude")
    );

    res.json(location);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create location
app.post("/api/athlete_locations", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, locations.athlete_locations);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating athlete_locations: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const profile = await AthleteProfile.query().findById(body.athlete_profile_id);

    if (profile instanceof AthleteProfile) {
      let currCoordinates: number[];
      let affiliationCoordinates: number[];
      let homeCoordinates: number[];

      // create points based on address, state, and zip
      if (body.curr_street === "" || body.curr_state === "" || body.curr_zipcode === "")
        currCoordinates = [ null, null ];
      else
        await getCoordinates(body.curr_street, body.curr_state, body.curr_zipcode).then(
          async (resp) => {
            currCoordinates = [ resp.candidates[0].location.x, resp.candidates[0].location.y]
          }
        );

      if (body.affilition_street === "" || body.affiliation_state === "" || body.affiliation_zipcode === "")
        affiliationCoordinates = [ null, null ];
      else
        await getCoordinates(body.affilition_street, body.affiliation_state, body.affiliation_zipcode).then( 
          async (resp) => {
            affiliationCoordinates = [ resp.candidates[0].location.x, resp.candidates[0].location.y ];
          }
        );
      
      if (body.home_street === "" || body.home_state === "" || body.home_zipcode === "")
        homeCoordinates = [ null, null ];
      else
        await getCoordinates(body.home_street, body.home_state, body.home_zipcode).then(
          async (resp) => {
            homeCoordinates = [ resp.candidates[0].location.y, resp.candidates[0].location.y ];
          }
        );

      const location = await Location.query().insert({
        ...body,
        curr_location: createPoint(currCoordinates[0], currCoordinates[1]),
        affiliation_location: createPoint(affiliationCoordinates[0], affiliationCoordinates[1]),
        home_location: createPoint(homeCoordinates[0], homeCoordinates[1])
      });

      res.json(location);
    } else
      throw new Error("Error inserting location: invalid athlete_profile_id supplied");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update location
app.put("/api/update_athlete_location", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, locations.athlete_locations);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating athlete_location: Invalid data");
    }
    
    // first confirm foreign key exists
    const profile = await AthleteProfile.query().findById(model.athlete_profile_id);

    if (profile instanceof AthleteProfile) {
      let currCoordinates: number[];
      let affiliationCoordinates: number[];
      let homeCoordinates: number[];

      if (model.curr_street === "" || model.curr_state === "" || model.curr_zipcode === "")
        currCoordinates = [ null, null ];
      else
        await getCoordinates(model.curr_street, model.curr_state, model.curr_zipcode).then(
          async (resp) => {
            currCoordinates = [ resp.candidates[0].location.x, resp.candidates[0].location.y]
          }
        );

      if (model.affilition_street === "" || model.affiliation_state === "" || model.affiliation_zipcode === "")
        affiliationCoordinates = [ null, null ];
      else
        await getCoordinates(model.affilition_street, model.affiliation_state, model.affiliation_zipcode).then( 
          async (resp) => {
            affiliationCoordinates = [ resp.candidates[0].location.x, resp.candidates[0].location.y ];
          }
        );
      
      if (model.home_street === "" || model.home_state === "" || model.home_zipcode === "")
        homeCoordinates = [ null, null ];
      else
        await getCoordinates(model.home_street, model.home_state, model.home_zipcode).then(
          async (resp) => {
            homeCoordinates = [ resp.candidates[0].location.y, resp.candidates[0].location.y ];
          }
        );

      const location = await Location.query().update({
        ...model,
        curr_location: createPoint(currCoordinates[0], currCoordinates[1]),
        affiliation_location: createPoint(affiliationCoordinates[0], affiliationCoordinates[1]),
        home_location: createPoint(homeCoordinates[0], homeCoordinates[1])
      }).where("id", model.id);

      res.json(location);
    } else
      throw new Error("Error updating location: invalid athlete_profile_id supplies");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

// delete location
app.delete("/api/delete_athlete_location/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const location = await Location.query().deleteById(id);

    res.json(location);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Business

// get all businesses
app.get("/api/businesses", authenticateKey, async (_req: any, res: any) => {
  try {
    const businesses = await Business.query().select(
      "*",
      st.x("location").as("longitude"),
      st.y("location").as("latitude"),
    ).orderBy("updated_at", "desc");

    console.log(businesses);
    res.json(businesses);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get business
app.get("/api/businesses/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const athlete = await Business.query().findById(id).select(
      "*",
      st.x("location").as("longitude"),
      st.y("location").as("latitude")
    );

    res.json(athlete);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create business
app.post("/api/businesses", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, brand.brand);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating brand: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);
    console.log(body);

    let coordinates: number[];

    if (body.address === "" || body.state === "" || body.zip === "")
      coordinates = [ null, null ];
    else
      await getCoordinates(body.address, body.state, body.zip).then(async (resp) => {
        coordinates = [
          resp.candidates[0].location.x,
          resp.candidates[0].location.y,
        ];
      });

    console.log(coordinates);
    const business = await Business.query().insert({
      ...body,
      location: createPoint(coordinates[0], coordinates[1])
    });

    res.json({ business });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update business
app.put("/api/update_business", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, brand.brand);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating brand: Invalid data");
    }
    
    console.log("UDPATE BUSINESS");
    console.log(model);

    let coordinates: number[];

    if (model.address === "" || model.state === "" || model.zip === "")
      coordinates = [ null, null ];
    else
      await getCoordinates(model.address, model.state, model.zip).then(async (resp) => {
        coordinates = [
          resp.candidates[0].location.x,
          resp.candidates[0].location.y,
        ];
      });

    console.log(coordinates);
    const business = await Business.query()
      .update({
        ...model,
        location: createPoint(coordinates[0], coordinates[1])
      })
      .where("id", model.id);

    res.json(business);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete business
app.delete("/api/delete_business/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log("DELETE BUSINESS");
    console.log(body);
    const business = await Business.query().deleteById(body.id);

    res.json(business);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Business Profile

// get all business profiles
app.get("/api/business_profiles", authenticateKey, async (_req: any, res: any) => {
  try {
    const profiles = await BusinessProfile.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(profiles);

    res.json(profiles);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get business profile
app.get("/api/business_profiles/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const profile = await BusinessProfile.query().findById(id);
    
    res.json(profile);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create business profile
app.post("/api/business_profiles", authenticateKey, async (req:any, res: any) => {
  try {
    let model = Object.assign({}, brand_profile.brand_profile);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating brand_profile: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const business = await Business.query().findById(body.business_id);

    if (business instanceof Business) {
      const profile = await BusinessProfile.query().insert({
        ...body
      });

      res.json(profile);
    } else
      throw new Error("Error inserting business_profile: invalid business_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

// update business profile
app.put("/api/update_business_profile", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, brand_profile.brand_profile);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating brand_profile: Invalid data");
    }
    
    //first confirm foreign key exists
    const business = await Business.query().findById(model.business_id);

    if (business instanceof Business) {
      const profile = await BusinessProfile.query().update({
        ...model
      }).where("id", model.id);

      res.json(profile);
    } else
      throw new Error("Error updating business_profile: invalid business_id supplies.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete business profile
app.delete("/api/delete_business_profile/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const profile = await BusinessProfile.query().deleteById(id);

    res.json(profile);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Business Deals

// get all business deals
app.get("/api/business_deals", authenticateKey, async (_req: any, res: any) => {
  try {
    const deals = await BusinessDeal.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(deals);

    res.json(deals);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get business deal
app.get("/api/business_deals/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const deal = await BusinessDeal.query().findById(id);

    res.json(deal);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

// create business deal
app.post("/api/business_deals", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, brand_deals.brand_deals);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating brand_deals: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const profile = await BusinessProfile.query().findById(body.business_profile_id);

    if (profile instanceof BusinessProfile) {
      const deal = await BusinessDeal.query().insert({
        ...body
      });

      res.json(deal);
    } else
      throw new Error("Error inserting business_deal: invalid business_profile_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

// update business deal
app.put("/api/update_business_deal", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, brand_deals.brand_deals);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating brand_deals: Invalid data");
    }
    
    // first confirm foreign key exists
    const profile = await BusinessProfile.query().findById(model.business_profile_id);

    if (profile instanceof BusinessProfile) {
      const deal = await BusinessDeal.query().update({
        ...model
      }).where("id", model.id);

      res.json(deal);
    } else
      throw new Error("Error updating business_deal: invalid business_profile_id supplies.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

// delete business deal
app.delete("/api/delete_business_deal/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const deal = await BusinessDeal.query().deleteById(id);

    res.json(deal);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

//#endregion

//#region Campaign

// get all campaigns
app.get("/api/campaigns", authenticateKey, async (_req: any, res: any) => {
  try {
    const campaigns = await Campaign.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(campaigns);

    res.json(campaigns);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get campaign
app.get("/api/campaigns/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.query().findById(id);

    res.json(campaign);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get campaign for a business
app.get("/api/campaigns_per_business/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { business_id } = req.params;
    const campaigns =  await Campaign.query().select("*").where("business_id", business_id).orderBy("updated_at", "desc");

    res.json(campaigns);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create campaign
app.post("/api/campaigns", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, opportunity.opportunity);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating opportunity: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const business = await Business.query().findById(body.business_id);

    if (business instanceof Business) {
      const campaign = await Campaign.query().insert({
        ...body
      });

      res.json(campaign);
    } else
      throw new Error("Error inserting campaign: invalid business_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update campaign
app.put("/api/update_campaign", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, opportunity.opportunity);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating opportunity: Invalid data");
    }
    
    // first confirm foreign key exists
    const business = await Business.query().findById(model.business_id);

    if (business instanceof Business) {
      const campaign = await Campaign.query().update({
        ...model
      }).where("id", model.id);

      res.json(campaign);
    } else
      throw new Error("Error updating campaign: invalid business_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete campaign
app.delete("/api/delete_campaign/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.query().deleteById(id);

    res.json(campaign);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Campaign Image

// get all campaign images
app.get("/api/campaign_images", authenticateKey, async (_req: any, res: any) => {
  try {
    const images = await CampaignImage.query().select("*");

    // eslint-disable-next-line no-console
    console.log(images);

    res.json(images);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get campaign image
app.get("/api/campaign_images/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const image = await CampaignImage.query().findById(id);

    res.json(image);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create campaign image
app.post("/api/campaign_images", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, opportunity_image.opportunity_image);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating opportunity_image: Invalid data");
    }

    const body = (({ id, ...others }) => others)(model);

    // first confirm foreign key exists
    const campaign = await Campaign.query().findById(body.campaign_id);

    if (campaign instanceof Campaign) {
      const image = await CampaignImage.query().insert({
        ...body
      });

      res.json(campaign);
    } else
      throw new Error("Error inserting campaign_image: invalid campaign_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update campaign image
app.put("/api/update_campaign_image", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, opportunity_image.opportunity_image);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating opportunity_image: Invalid data");
    }

    // first confirm foreign key exists
    const campaign = await Campaign.query().findById(model.campaign_id);

    if (campaign instanceof Campaign) {
      const image = await CampaignImage.query().update({
        ...model
      }).where("id", model.id);

      res.json(image);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete campaign image
app.delete("/api/delete_campaign_image/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const image = await CampaignImage.query().deleteById(id);

    res.json(image);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//#endregion

//#region Matches

// get all matches
app.get("/api/matches", authenticateKey, async (_req: any, res: any) => {
  try {
    const matches = await Matches.query().select("*").orderBy("updated_at", "desc");

    // eslint-disable-next-line no-console
    console.log(matches);

    res.json(matches);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get all matches for an athlete
app.get("/api/athlete_matches/:athleteid", authenticateKey, async (req: any, res: any) => {
  try {
   const { athlete_id } = req.params;
   const matches =  await Matches.query().where("chosen_athlete", athlete_id).orderBy("updated_at", "desc"); 

   res.json(matches);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// get all matches for an opportunity
app.get("/api/campaign_matches:/:campaignid", authenticateKey, async (req: any, res: any) => {
  try {
    const { campaign_id } = req.params;
    const matches =  await Matches.query().where("campaign_id", campaign_id).orderBy("updated_at", "desc");
 
    res.json(matches);
   } catch (err) {
     // eslint-disable-next-line no-console
     console.error(err.message);
     res.status(500).json({ message: err.message });
   }
})

// get match
app.get("/api/matches/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const match = await Matches.query().findById(id);

    res.json(match);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create match
app.post("/api/matches", authenticateKey, async (req: any, res: any) => {
    try {
      let model = Object.assign({}, opportunity_matches.opportunity_matches);
      let data = req.body;

      if (!verifySchema(model, data)) {
        throw new Error("Error creating match: invalid data");
      }

      const body = (({ id, ...others }) => others)(model);

      // first confirm foreign keys exist
      const athlete = await Athlete.query().findById(body.chosen_athlete);

      const campaign = await Campaign.query().findById(body.campaign_id);

      if (athlete instanceof Athlete && campaign instanceof Campaign) {
        const match = await Matches.query().insert({
          ...body,
        });

        res.json(match);
      } else
        throw new Error("Error inserting match: invalid chosen_athlete or campaign_id supplied.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      res.status(500).json({ message: err.message });
    }
});

// update match
app.put("/api/update_match", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, opportunity_matches.opportunity_matches);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating matches: invalid data");
    }

    // first confirm foreign keys exist
    const athlete = await Athlete.query().findById(model.chosen_athlete);

    const campaign = await Campaign.query().findById(model.campaign_id);

    if (athlete instanceof Athlete && campaign instanceof Campaign) {
      const match = await Matches.query().update({
        ...model,
      }).where("id", model.id);

      res.json(match);
    } else
      throw new Error("Error updating match: invalid chosen_athlete or campaign_id supplied.");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete match
app.delete("/api/delete_match/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line no-console
    console.log("Deleting Match: " + id);

    const match = await Matches.query().deleteById(id);

    res.json(match);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
})

//#endregion

//#region Notes

// get notes
app.get("/api/notes", authenticateKey, async (_req: any, res: any) => {
  try {
    const notes = await AdminNotes.query().select("*");

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get specific note
app.get("/api/notes/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const note = await AdminNotes.query().findById(id);

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get notes by athlete
app.get("/api/athlete_notes/:athleteid", authenticateKey, async (req: any, res: any) => {
  try {
    const { athlete_id } = req.params;
    const notes = await AdminNotes.query().select("*").where("athlete_id", athlete_id);

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get notes by business
app.get("/api/brand_notes/:brandid", authenticateKey, async (req: any, res: any) => {
  try {
    const { brand_id } = req.params;
    const notes = await AdminNotes.query().select("*").where("business_id", brand_id);

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create athlete note
app.post("/api/athlete_notes", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, note.note);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating athlete_note: Invalid data");
    }
    const body = (({ note_id, ...others }) => others)(model);

    // first confirm athlete exists
    const athlete = await Athlete.query().findById(body.athlete_id);

    if (athlete instanceof Athlete) {
      const note = await AdminNotes.query().insert({
        ...body
      });

      res.json(note);
    } else 
      throw new Error("Error inserting athlete note: invalid athlete_id supplied.");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update athlete note
app.put("/api/athlete_notes", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, note.note);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating athlete_note: Invalid data");
    }

    // first confirm athlete exists
    const athlete = await Athlete.query().findById(model.athlete_id);

    if (athlete instanceof Athlete) {
      const note = await AdminNotes.query().update({
        ...model
      }).where("note_id", model.note_id);

      res.json(note);
    } else
      throw new Error("Error updating athlete note: invalid athlete_id supplied");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// create brand note
app.post("/api/brand_notes", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, note.note);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error creating brand_note: Invalid data");
    }

    const body = (({ note_id, ...others }) => others)(model);

    // first confirm brand exists
    const brand = await Business.query().findById(body.business_id);

    if (brand instanceof Business) {
      const note = await AdminNotes.query().insert({
        ...body
      });

      res.json(note);
    } else
      throw new Error("Error inserting brand note: invalid brand_id supplied");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update brand note
app.put("/api/brand_notes", authenticateKey, async (req: any, res: any) => {
  try {
    let model = Object.assign({}, note.note);
    let data = req.body;

    if (!verifySchema(model, data)) {
      throw new Error("Error updating brand_note: Invalid data");
    }

    // first confirm brand exists
    const brand = await Business.query().findById(model.business_id);

    if (brand instanceof Business) {
      const note = await AdminNotes.query().update({
        ...model
      }).where("note_id", model.note_id);

      res.json(note);
    } else
      throw new Error("Error updating brand note: invalid brand_id supplied");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete note
app.delete("/api/notes/:id", authenticateKey, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const note = await AdminNotes.query().deleteById(id);

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

//#endregion

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log("Server started on port 8000");
});

//#region utilities

// utility to match schema in content of body of a request with expected schema

import "../admin/src/models/db_models.js";
import { athlete as athleteModel, athlete_profile, brand, brand_deals, brand_profile, deal_preference, locations, note, opportunity, opportunity_image, opportunity_matches } from "../admin/src/models/db_models.js";
import { create } from "domain";

function verifySchema(model: Object, object: Object) {
  const modelKeys = Object.keys(model);

  // check if every property in the model exists in the specified object
  const match = modelKeys.every(property => object.hasOwnProperty(property));

  if (!match) {
    modelKeys.forEach(property => {
      if (!object.hasOwnProperty(property))
        console.log("Object missing property: " + property);
    })
    return false;
  }

  // add values to model properties from object
  modelKeys.forEach(property => {
    console.log("Working on property: " + property);
    model[property as keyof Object] = object[property as keyof Object] as never;
  });

  return true;
}

function authenticateKey(req: any, res: any, next: any) {
  let api_key = req.get("x-api-key");
  
  if (api_key !== process.env.API_KEY)
    return res.status(401).json({
      message: "Unauthorized Request"
    });
  else
    next();
}

//#endregion
