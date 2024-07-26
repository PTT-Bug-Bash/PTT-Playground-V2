import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("athletes", (table) => {
        table.string("athlete_level");
        table.string("middle_name");
        table.string("grade_level");
        table.string("sport");
        table.boolean("opt_in");
        table.renameColumn("email", "personal_email");
		    table.renameColumn("image_url", "profile_image");
        table.renameColumn("school","sport_affiliation");
      })

      .createTable("athlete_profile", (table)  => {
        table.increments("id").primary();
        table.integer("athlete_id").unsigned().notNullable();
        table.string("license_image");
        table.string("school_email");
        table.string("insta_link");
        table.integer("insta_follower");
        table.string("tiktok_link");
        table.integer("tiktok_follower");
        table.string("twitter_link");
        table.integer("twitter_follower");
        table.string("facebook_link");
        table.integer("facebook_follower");
        table.string("gpa");
        table.string("youtube_link");
        table.integer("youtube_subs");
        table.string("position");
        table.string("interested_in");
        table.string("business_interest");
        table.date("dob");
        table.string("gender");
        table.string("support_cause");
        table.text("bio");
        table.string("ideal_dollar");
        table.string("exposure");
        table.string("refers");
        table.text("featured_images");
        table.string("payout_details");
        table.string("language");
        table.string("ethnicity");
        table.string("past_team");
        table.string("league_conference");
        table.string("achievements");
        table.string("specialization");
        table.boolean("ncaa_eligible");
        table.timestamps(true, true);
        table.foreign("athlete_id").references("athletes.id").onDelete("CASCADE");
      })
    
      .createTable("deal_preference", (table) => {
        table.increments("id").primary();
        table.integer("athlete_profile_id").unsigned().notNullable();
        table.integer("video_shoutout");
        table.integer("phone_call");
        table.integer("zoom_chat");
        table.integer("media_creation");
        table.integer("testing_feedback");
        table.integer("meet_greet");
        table.integer("tutorial_session");
        table.integer("q_and_a");
        table.integer("face_interview");
        table.integer("keynote_event");
        table.integer("podcast");
        table.integer("production_sess");
        table.integer("autograph");
        table.boolean("custom_experience");
        table.integer("facebook_post");
        table.integer("facebook_live");
        table.integer("facebook_story");
        table.integer("instagram_post");
        table.integer("instagram_reel");
        table.integer("instagram_story");
        table.integer("linkedin_post");
        table.integer("tiktok_post");
        table.integer("x_post");
        table.integer("x_video");
        table.integer("youtube_post");
        table.integer("youtube_short");
        table
          .foreign("athlete_profile_id")
          .references("athlete_profile.id")
          .onDelete("CASCADE");
        table.timestamps(true, true)
      })
    
      .createTable("locations", (table) => {
        table.increments("id").primary();
        table.integer("athlete_profile_id").unsigned().notNullable();
        table.point("curr_location");
        table.string("curr_city");
        table.string("curr_state");
        table.string("curr_street");
        table.string("curr_zipcode");
        table.string("affiliation_location");
        table.string("affiliation_city");
        table.string("affiliation_state");
        table.string("affilition_street");
        table.string("affiliation_zipcode");
        table.point("home_location");
        table.point("home_city");
        table.string("home_state");
        table.string("home_street");
        table.string("home_zipcode");
		    table.timestamps(true, true);
        table
          .foreign("athlete_profile_id")
          .references("athlete_profile.id")
          .onDelete("CASCADE");
      }) 
    
      .table("businesses", (table) => {
        table.boolean("opt_in");
        table.string("middle_name");
		    table.renameColumn("image_url","business_image");
      })
    
      .createTable("business_profile", (table) =>{
        table.increments("id").primary();
        table.integer("business_id").unsigned().notNullable();
        table.string("interested_sports");
        table.string("interested_school");
        table.string("business_industry");
        table.string("opportunity");
        table.string("budget");
        table.text("reason_for_sponsor");
        table.string("gender_preference");
        table.string("cause_affiliation");
        table.boolean("active_seeking").defaultTo("false");
        table.string("exposure");
        table.text("featured_images");
        table.string("pref_athlete_level");
        table.string("pref_grade_level");
        table.timestamps(true, true);
        table
          .foreign("business_id")
          .references("businesses.id")
          .onDelete("CASCADE");
      })
    
      .createTable("business_deals", (table) => {
        table.increments("id").primary();
        table.integer("business_profile_id").unsigned().notNullable();
        table.boolean("video_shoutout");
        table.boolean("phone_call");
        table.boolean("zoom_chat");
        table.boolean("media_creation");
        table.boolean("testing_feedback");
        table.boolean("meet_greet");
        table.boolean("tutorial_session");
        table.boolean("q_and_a");
        table.boolean("face_interview");
        table.boolean("keynote_event");
        table.boolean("podcast");
        table.boolean("production_sess");
        table.boolean("autograph");
        table.text("custom_experience");
        table.boolean("facebook_post");
        table.boolean("facebook_live");
        table.boolean("facebook_story");
        table.boolean("instagram_post");
        table.boolean("instagram_reel");
        table.boolean("instagram_story");
        table.boolean("linkedin_post");
        table.boolean("tiktok_post");
        table.boolean("x_post");
        table.boolean("x_video");
        table.boolean("youtube_post");
        table.boolean("youtube_short");
        table.timestamps(true, true);
        table
          .foreign("business_profile_id")
          .references("business_profile.id")
          .onDelete("CASCADE");
      }) 
    
      .createTable("campaigns", (table) => {
        table.increments("id").primary();
        table.integer("business_id").unsigned().notNullable();
        table.string("payment_type");
        table.string("sports");
        table.integer("monetary_value").unsigned();
        table.string("event_type");
        table.string("icon_image");
        table.text("description");
        table.timestamps(true, true);
        table
          .foreign("business_id")
          .references("businesses.id")
          .onDelete("CASCADE");
      }) 
	  
      .createTable("athlete_campaign", (table) => {
        table.increments("id").primary();
        table.integer("athlete_id").unsigned().notNullable();
        table.integer("campaign_id").unsigned().notNullable();
        table.timestamps(true, true);
        table
          .foreign("athlete_id")
          .references("athletes.id")
          .onDelete("CASCADE");
        table
          .foreign("campaign_id")
          .references("campaigns.id")
          .onDelete("CASCADE");
      })
	  
      .createTable("matches",(table) => {
        table.increments("id").primary();
        table.integer("chosen_athlete").unsigned();
        table.integer("campaign_id").unsigned();
        table.timestamps(true, true);
        table
          .foreign("chosen_athlete")
          .references("athletes.id")
          .onDelete("SET NULL");
        table
          .foreign("campaign_id")
          .references("campaigns.id")
          .onDelete("SET NULL");
      })
	  
      .createTable('campaign_image', (table) => {
        table.increments('id').primary();
        table.integer('campaign_id').unsigned();
        table.text('image_url');
        table
          .foreign("campaign_id")
          .references("campaigns.id")
          .onDelete("SET NULL");
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("athletes", async function (table) {
      table.dropColumn("athlete_level");
      table.dropColumn("middle_name");
      table.dropColumn("grade_level");
      table.dropColumn("sport");
      table.dropColumn("opt_in");
      table.renameColumn("personal_email", "email");
      table.renameColumn("profile_image", "image_url");
      table.renameColumn("sport_affiliation","school");
    }) 
    .then(function () {
      return knex.schema.table("businesses", function (table) {
        table.dropColumn("opt_in");
        table.dropColumn("middle_name");
        table.renameColumn("business_image","image_url");
      })
    })
    .then(function () {
      return knex.schema.dropTableIfExists("deal_preference")
        .dropTableIfExists("locations")
        .dropTableIfExists("business_deals")
        .dropTableIfExists("matches")
        .dropTableIfExists("campaign_image")
        .dropTableIfExists("athlete_campaign")
        .dropTableIfExists("athlete_profile")
        .dropTableIfExists("business_profile")
        .dropTableIfExists("campaigns")
    });
}

