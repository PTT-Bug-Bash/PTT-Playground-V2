import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw('TRUNCATE TABLE notes_history CASCASE');
    await knex.raw('TRUNCATE TABLE admin_notes CASCASE');
    await knex.raw('TRUNCATE TABLE deal_preference CASCADE');
    await knex.raw('TRUNCATE TABLE locations CASCADE');
    await knex.raw('TRUNCATE TABLE business_deals CASCADE');
    await knex.raw('TRUNCATE TABLE matches CASCADE');
    await knex.raw('TRUNCATE TABLE campaign_image CASCADE');
    await knex.raw('TRUNCATE TABLE athlete_campaign CASCADE');
    await knex.raw('TRUNCATE TABLE athlete_profile CASCADE');
    await knex.raw('TRUNCATE TABLE business_profile CASCADE');
    await knex.raw('TRUNCATE TABLE athletes CASCADE');
    await knex.raw('TRUNCATE TABLE campaigns CASCADE');
    await knex.raw('TRUNCATE TABLE businesses CASCADE');
    await knex.raw('TRUNCATE TABLE users CASECASE');

    // Inserts seed entries
    await knex("athletes").insert([
      {   
        id: 0,
        first_name: "Hunter",
        middle_name: "A",
        last_name: "Solano",
        personal_email: "hunter.solano@yahoo.com",
        password: "",
        phone: "(254) 300-1903",
        address: "",
        city: "Lorena",
        state: "Texas",
        zip: "",
        athlete_level: "College",
        grade_level: "Freshman",
        sport_affiliation: "Baylor",
        sport: "Football",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/fbix94wn_F3B43D97-4A0C-43F8-AE87-DF7C31538ADE.jpeg",
      },
      {
        id: 1,
        first_name: "Mariah",
        middle_name: "A",
        last_name: "Solano",
        personal_email: "mariah.andreana@yahoo.com",
        password: "",
        phone: "(254) 424-5859",
        address: "",
        city: "San Antonio",
        state: "Texas",
        zip: "",
        athlete_level: "College",
        grade_level: "Junior",
        sport_affiliation: "University of Texas at Austin",
        sport: "Volleyball",
        opt_in: false,
        profile_image:"",
      },
      {
        id: 2,
        first_name: "Tyon",
        middle_name: "",
        last_name: "Davis",
        personal_email: "tyondavis99@gmail.com",
        password: "",
        phone: "(405) 833-1293",
        address: "",
        city: "Oklahoma City",
        state: "Oklahoma",
        zip: "",
        athlete_level: "College",
        grade_level: "5th-Year",
        sport_affiliation: "University of Tulsa",
        sport: "Football",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/src127au_62B34ACF-CDC1-450D-BF13-DBA23E0043D9.jpeg",
      },
      {
        id: 3,
        first_name: "Luke",
        middle_name: "E",
        last_name: "Jeffus",
        personal_email: "lej6683@utulsa.edu",
        password: "",
        phone: "(918) 845-0226",
        address: "",
        city: "Sand Springs",
        state: "Oklahoma",
        zip: "",
        athlete_level: "College",
        grade_level: "Sophmore",
        sport_affiliation: "University of Tulsa",
        sport: "Soccer",
        opt_in: false,
        profile_image: "",
      },
      {
        id: 4,
        first_name: "Sean",
        middle_name: "DR",
        last_name: "Korsmo",
        personal_email: "skorsmo18@gmail.com",
        password: "",
        phone: "(701) 202-1926",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "",
        sport_affiliation: "University of Tulsa",
        sport: "Cross-Country, Track and Field",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/x35yw9ue_17909F5A-BF16-4E04-BB20-FC5E250CC448.jpeg",

      },
      {
        id: 5,
        first_name: "Everitt",
        middle_name: "",
        last_name: "Rogers",
        personal_email: "footballeveritt@gmail.com",
        password: "",
        phone: "(254) 289-1610",
        address: "",
        city: "Tulsa",
        state: "Oklahoma",
        zip: "",
        athlete_level: "College",
        grade_level: "Sophmore",
        sport_affiliation: "University of Tulsa",
        sport: "Football",
        opt_in: false,    
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/aiev5png_82AEBFB6-F4AB-4306-A446-34B2269DA25B.jpeg",

      },
      {
        id: 6,
        first_name: "Julia",
        middle_name: "",
        last_name: "Richard",
        personal_email: "julia.b.richard7@gmail.com",
        password: "",
        phone: "(405) 535-5032",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "Freshman",
        sport_affiliation: "University of Tulsa",
        sport: "Track and Field",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/ugcxkt91_E4C978AE-A521-4A65-9467-EEE5B850DCC6.jpeg",
      
      },
      {
        id: 7,
        first_name: "Jayda",
        middle_name: "",
        last_name: "Gibson",
        personal_email: "jaydagibson02@gmail.com",
        password: "",
        phone: "(817) 880-9568",
        address: "800 S Tucker Dr",
        city: "Tulsa",
        state: "Oklahoma",
        zip: "74104",
        athlete_level: "College",
        grade_level: "Freshman",
        sport_affiliation: "University of Tulsa",
        sport: "Track and Field",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/ylt1be37_AB989B10-7457-4D22-83BE-90F6D85389A3.jpeg",

      },
      {
        id: 8,
        first_name: "Keagan",
        middle_name: "Joseph",
        last_name: "Perez",
        personal_email: "kjperez22@gmail.com",
        password: "",
        phone: "(407) 274-7424",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "Freshman",
        sport_affiliation: "Embry Riddle Aeronautical University",
        sport: "Baseball",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/d8tx1jnw_116ADD63-FE55-42F1-97C4-1C0535FBF59C.jpeg",

      },
      {
        id: 9,
        first_name: "Evan",
        middle_name: "Andrew",
        last_name: "Sanni-Thomas",
        personal_email: "east7203@gmail.com",
        password: "",
        phone: "(832) 482-5449",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "Sophmore",
        sport_affiliation: "University of Tulsa",
        sport: "Track and Field",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/aqo8jeu1_F752D303-80A5-4082-8BBF-1B5AFC757C6D.jpeg",
      },
      {
        id: 10,
        first_name: "Jon-Michael",
        middle_name: "",
        last_name: "Terry",
        personal_email: "jonterry8221@gmail.com",
        password: "",
        phone: "(918) 850-1067",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "5th-Year",
        sport_affiliation: "University of Tulsa",
        sport: "Football",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/1jfoyrvz_3209CA17-340F-4BC3-954A-ADD5C087FF6B.jpeg",

      },
      {
        id: 11,
        first_name: "Canon",
        middle_name: "R",
        last_name: "Peters",
        personal_email: "canonp4@gmail.com",
        password: "",
        phone: "(214) 493-5317",
        address: "",
        city: "Tulsa",
        state: "Oklahoma",
        zip: "",
        athlete_level: "College",
        grade_level: "Freshman",
        sport_affiliation: "University of Tulsa",
        sport: "Football",
        opt_in: false,
        profile_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/5bps7wlt_6053B189-6B2C-4732-9CF2-7C2CD3B0B0F7.jpeg",

      },
      {
        id: 12,
        first_name: "Bedirhan",
        middle_name: "",
        last_name: "Celayir",
        personal_email: "",
        password: "",
        phone:"",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "",
        grade_level: "",
        sport_affiliation: "",
        sport: "",
        opt_in: false,
        profile_image:"",
      },
      {
        id: 13,
        first_name: "Jonah",
        middle_name: "",
        last_name: "Anderson",
        personal_email: "jonahando@gmail.com",
        password: "",
        phone: "(208) 661-4131",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "",
        sport_affiliation: "University of Oregon",
        sport: "Football",
        opt_in: false,
        profile_image:"",
      },
      {
        id: 14,
        first_name: "UTD",
        middle_name: "",
        last_name: "CS - Athlete",
        personal_email: "hunter@rattled.co",
        password: "",
        phone:"",
        address: "",
        city: "",
        state: "",
        zip: "",
        athlete_level: "College",
        grade_level: "5th-Year",
        sport_affiliation: "The University of Texas at Dallas",
        sport: "Rowing",
        opt_in: false,
        profile_image:"",
      },
  ]);
  await knex.raw('ALTER SEQUENCE athletes_id_seq RESTART WITH 15');
  await knex('athlete_profile').insert([
    {
      id: 0,
      athlete_id: 0,
      license_image: "https://s3.amazonaws.com/smartmatchapp/a657430fe35509292d4c6783094d000a/hqxiyngj_Screen+Shot+2022-02-24+at+3.22.49+PM.png",
      school_email: "hunter.solano@yahoo.com",
      insta_link: "@athletereserve",
      insta_follower: 100000,
      tiktok_link: "@athletereserve",
      tiktok_follower: 10000,
      twitter_link: "@athletereserve",
      twitter_follower: 100000,
      facebook_link: "@athletereserve",
      facebook_follower: 20000,
      gpa: "3.50-3.25" , 
      youtube_link: "@athletereserve", 
      youtube_subs: 10000, 
      position: "QB",
      interested_in: "Grand Openings, Live Events, Meet and Greets, Product Photo Shoots, Signings, Social Media Posts, Speaking Engagements, TV Commercial Opportunities, Virtual Events, Other, Unsure", 
      business_interest: "Apparel, Beverage, Finance, Fitness, Food, Grocery, Health, Real Estate, Sports, Technology, Other", 
      dob: "1996-02-02", 
      gender: "Male", 
      support_cause: "Unsure", 
      bio: "I am quarterback at Baylor, I am looking for a sponsorship opportunities", 
      ideal_dollar: "$2500 or more", 
      exposure: "Friend/Family", 
      refers: "N/A",
    },
    {
      id: 1,
      athlete_id: 1,
      license_image: "",
      school_email: "mariah.andreana@yahoo.co",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "4.00-3.75" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "Libero",
      interested_in: "Signing", 
      business_interest: "Apparel", 
      dob: "1994-03-29", 
      gender: "Female", 
      support_cause: "Education", 
      bio: "I'm a great volleyball player :)", 
      ideal_dollar: "$2500 or more", 
      exposure: "Friend/Family", 
      refers: "Brother",
    },
    {
      id: 2,
      athlete_id: 2,
      license_image: "",
      school_email: "tmd5549@utulsa.edu",
      insta_link: "ty0ndavis",
      insta_follower: 3400,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "Tyondavis3",
      twitter_follower: 260,
      facebook_link: "",
      facebook_follower: null,
      gpa: "3.75-3.50" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "CB",
      interested_in: "Unsure", 
      business_interest: "Unsure", 
      dob: "1999-05-22", 
      gender: "Male", 
      support_cause: "Unsure", 
      bio: "", 
      ideal_dollar: "$500-$750", 
      exposure: "Instagram", 
      refers: "",
    },
    {
      id: 3,
      athlete_id: 3,
      license_image: "",
      school_email: "Lej6683@utulsa.edu",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "4.00-3.75", 
      youtube_link: "", 
      youtube_subs: null, 
      position: "Midfielder",
      interested_in: "Meet and Greets, Product Photo Shoots, Signings, Social Media Posts", 
      business_interest: "Food, Beverage, Health, Fitness, Sports, Apparel", 
      dob: "2001-09-13", 
      gender: "Male", 
      support_cause: "Community Development, Education, Environment, Health, Human and Civil Rights", 
      bio: "", 
      ideal_dollar: "$100-$250, $250-$300, $500-$750, $750-$1000", 
      exposure: "Instagram", 
      refers: "",
    },
    {
      id: 4,
      athlete_id: 4,
      license_image: "",
      school_email: "sdk1902@utulsa.edu",
      insta_link: "sean_korsmo",
      insta_follower: 2500,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "sean_korsmo",
      twitter_follower: 30,
      facebook_link: "Sean_Korsmo",
      facebook_follower: 100,
      gpa: "" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "",
      interested_in: "Grand Openings, Live Events, Meet and Greets, Product Photo Shoots, Signings, Social Media Posts, Speaking Engagements, TV Commercial Opportunities, Virtual Events, Other, Unsure", 
      business_interest: "Apparel, Beverage, Finance, Fitness, Food, Grocery, Health, Real Estate, Sports, Technology, Other, Unsure", 
      dob: "2002-11-19", 
      gender: "Male", 
      support_cause: "Animals, Arts/Culture/Humanities, Community Development, Education, Environment, Health, Human and Civil Rights, Human Services, International, Research and Public Policy, Religion, Other, None, Unsure", 
      bio: "", 
      ideal_dollar: "$0-$100, $100-$250, $250-$500, $500-$750, $750-$1000, $1000-$1500, $1500-$2000, $2000-$2500, $2500 or more", 
      exposure: "Other", 
      refers: "",
    },
    {
      id: 5,
      athlete_id: 5,
      license_image: "",
      school_email: "egr3674@utulsa.edu",
      insta_link: "3veritt_",
      insta_follower: 2853,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "3veritt_",
      twitter_follower: 1050,
      facebook_link: "",
      facebook_follower: null,
      gpa: "3.50-3.25" , 
      youtube_link: "BIG E TV", 
      youtube_subs: 300, 
      position: "Defensive-Line",
      interested_in: "Grand Openings, Signings, Meets and Greets, Product Photo Shoots, Social Media Posts, TV Commercial Opportunities", 
      business_interest: "Apparel, Beverage, Finance, Fitness, Food, Grocery, Health, Real Estate, Sports, Technology", 
      dob: "2001-11-01", 
      gender: "Male", 
      support_cause: "Animals, Arts/Culture/Humanities, Community Development, Education, Environment", 
      bio: "Defensive Tackle @ The University of Tulsa", 
      ideal_dollar: "$0-$100, $100-$250, $250-$500, $500-$750, $750-$1000, $1000-$1500, $1500-$2000, $2000-$2500, $2500 or more", 
      exposure: "Instagram", 
      refers: "",
    },
    {
      id: 6,
      athlete_id: 6,
      license_image: "",
      school_email: "jbr4262@utulsa.edu",
      insta_link: "julia.richard___",
      insta_follower: null,
      tiktok_link: "julia.richard7",
      tiktok_follower: 473,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "4.00-3.75" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "100m-400m",
      interested_in: "", 
      business_interest: "", 
      dob: "2002-06-07", 
      gender: "Female", 
      support_cause: "", 
      bio: "", 
      ideal_dollar: "", 
      exposure: "Other", 
      refers: "",
    },
    {
      id: 7,
      athlete_id: 7,
      license_image: "",
      school_email: "Jrg9854@utulsa.edu",
      insta_link: "Jaydaa.xo2",
      insta_follower: null,
      tiktok_link: "Jayy.x02",
      tiktok_follower: 7559,
      twitter_link: "GibsonJayda",
      twitter_follower: 31,
      facebook_link: "",
      facebook_follower: null,
      gpa: "4.00-3.75" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "Sprinter",
      interested_in: "Grand Openings, Live Events, Meet and Greets, Product Photo Shoots, Signings, Social Media Posts, Speaking Engagements, TV Commercial Opportunities, Virtual Events, Other, Unsure", 
      business_interest: "Sports", 
      dob: "2002-12-12", 
      gender: "Female", 
      support_cause: "Human and Civil Rights, Human Services", 
      bio: "All dreams can come true if we have the courage to pursue them", 
      ideal_dollar: "$250-$500", 
      exposure: "Referral Code", 
      refers: "",
    },
    {
      id: 8,
      athlete_id: 8,
      license_image: "",
      school_email: "perezk20@my.erau.edu",
      insta_link: "@kjperez22",
      insta_follower: 920,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "kjperez2205",
      twitter_follower: 392,
      facebook_link: "",
      facebook_follower: null,
      gpa: "" , 
      youtube_link: "", 
      youtube_subs: null,
      position: "Pitcher",
      interested_in: "Grand Openings, Live Events, Meet and Greets, Product Photo Shoots, Signings, Social Media Posts, Speaking Engagements, TV Commercial Opportunities, Virtual Events, Other, Unsure", 
      business_interest: "Sports", 
      dob: "2002-12-12", 
      gender: "Male", 
      support_cause: "Animals, Education, Environment, Health, International", 
      bio: "", 
      ideal_dollar: "$0-$100, $100-$250, $250-$500, $500-$750, $750-$1000", 
      exposure: "Family/Friend", 
      refers: "Jennifer Perez (Mother)",
    },
    {
      id: 9,
      athlete_id: 9,
      license_image: "",
      school_email: "Eas5328@utulsa.edu",
      insta_link: "Evan.a.st",
      insta_follower: 461,
      tiktok_link: "Evanthomas54",
      tiktok_follower: 53,
      twitter_link: "EvanSanni",
      twitter_follower: 7,
      facebook_link: "",
      facebook_follower: null,
      gpa: "3.25-3.00" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "400m",
      interested_in: "Grand Openings, Live Events, Meet and Greets, Product Photo Shoots, Signings, Social Media Posts, Speaking Engagements, TV Commercial Opportunities, Virtual Events, Other, Unsure", 
      business_interest: "Apparel, Beverage, Finance, Fitness, Food, Grocery, Health, Real Estate, Sports, Technology, Other, Unsure", 
      dob: "2003-07-20", 
      gender: "Male", 
      support_cause: "Animals, Arts/Culture/Humanities, Community Development, Education, Environment, Health, Human and Civil Rights, Human Services, International, Research and Public Policy, Religion, Other, None, Unsure", 
      bio: "I like food and fun\r\nMinecraft\r\nFollower of Jesus\r\nFishing\r\nRandom stuff\r\nComputer Engineering Major", 
      ideal_dollar: "$0-$100, $100-$250, $250-$500, $500-$750, $750-$1000, $1000-$1500, $1500-$2000, $2000-$2500, $2500 or more", 
      exposure: "Other", 
      refers: "It was on the school cafeteria table",
    },
    {
      id: 10,
      athlete_id: 10,
      license_image: "",
      school_email: "jat8582@utulsa.edu",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "3.25-3.00" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "Linebacker",
      interested_in: "", 
      business_interest: "", 
      dob: "1997-08-15", 
      gender: "Male", 
      support_cause: "", 
      bio: "", 
      ideal_dollar: "", 
      exposure: "Friend/Family, Google/Internet Search", 
      refers: "Tyon Davis",
    },
    {
      id: 11,
      athlete_id: 11,
      license_image: "",
      school_email: "crp0146@utulsa.edu",
      insta_link: "Canon.Peters",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "3.00-2.75" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "Safety",
      interested_in: "Product Photo Shoots, Social Media Posts, Other", 
      business_interest: "Apparel, Fitness, Food, Health, Sports, Technology", 
      dob: "2002-11-11", 
      gender: "Male", 
      support_cause: "Animals, Environment, Religion", 
      bio: "Football player at The university of Tulsa. Originally from Dallas, Texas. Have background in heat and fitness", 
      ideal_dollar: "$100-$250, $250-$500", 
      exposure: "Other", 
      refers: "",
    },
    {
      id: 12,
      athlete_id: 12,
      license_image: "",
      school_email: "",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "" , 
      youtube_link: "", 
      youtube_subs: null, 
      position: "",
      interested_in: "", 
      business_interest: "", 
      dob: null, 
      gender: "", 
      support_cause: "", 
      bio: "", 
      ideal_dollar: "", 
      exposure: "", 
      refers: "",
    },
    {
      id: 13,
      athlete_id: 13,
      license_image: "",
      school_email: "Jonahando@gmail.com",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "" , 
      youtube_link: "", 
      youtube_subs: null, 
      interested_in: "", 
      business_interest: "", 
      dob: null, 
      gender: "", 
      support_cause: "", 
      bio: "", 
      ideal_dollar: "", 
      exposure: "", 
      refers: "",
    },
    {
      id: 14,
      athlete_id: 14,
      license_image: "",
      school_email: "athlete@utdallas.edu",
      insta_link: "",
      insta_follower: null,
      tiktok_link: "",
      tiktok_follower: null,
      twitter_link: "",
      twitter_follower: null,
      facebook_link: "",
      facebook_follower: null,
      gpa: "Less Than 2.75" , 
      youtube_link: "", 
      youtube_subs: null,
      position: "",
      interested_in: "", 
      business_interest: "", 
      dob: "1995-07-01", 
      gender: "Non-binary", 
      support_cause: "", 
      bio: "", 
      ideal_dollar: "", 
      exposure: "", 
      refers: "",
    },
  ]);
  await knex.raw('ALTER SEQUENCE athlete_profile_id_seq RESTART WITH 15');
  await knex('deal_preference').insert([
    {
      id:0,
      athlete_profile_id:0,
    },
    {
      id:1,
      athlete_profile_id:1,
    },
    {
      id:2,
      athlete_profile_id:2,
    },
    {
      id:3,
      athlete_profile_id:3,
    },
    {
      id:4,
      athlete_profile_id:4,
    },
    {
      id:5,
      athlete_profile_id:5,
    },
    {
      id:6,
      athlete_profile_id:6,
    },
    {
      id:7,
      athlete_profile_id:7,
    },
    {
      id:8,
      athlete_profile_id:8,
    },
    {
      id:9,
      athlete_profile_id:9,
    },
    {
      id:10,
      athlete_profile_id:10,
    },
    {
      id:11,
      athlete_profile_id:11,
    },
    {
      id:12,
      athlete_profile_id:12,
    },
    {
      id:13,
      athlete_profile_id:13,
    },
    {
      id:14,
      athlete_profile_id:14,
    },
  ]);
  await knex.raw('ALTER SEQUENCE deal_preference_id_seq RESTART WITH 15');

  await knex('locations').insert([
    {
      id:0,
      athlete_profile_id: 0,
      affiliation_city: "Waco",
      affiliation_state: "Texas"
    },
    {
      id:1,
      athlete_profile_id: 1,
      affiliation_city: "Austin",
      affiliation_state: "Texas"
    },
    {
      id:2,
      athlete_profile_id: 2,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:3,
      athlete_profile_id: 3,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:4,
      athlete_profile_id: 4,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:5,
      athlete_profile_id: 5,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:6,
      athlete_profile_id: 6,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:7,
      athlete_profile_id: 7,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:8,
      athlete_profile_id: 8,
      affiliation_city: "Daytona Beach",
      affiliation_state: "Florida"
    },
    {
      id:9,
      athlete_profile_id: 9,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:10,
      athlete_profile_id: 10,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:11,
      athlete_profile_id: 11,
      affiliation_city: "Tulsa",
      affiliation_state: "Oklahoma"
    },
    {
      id:12,
      athlete_profile_id: 12,
    },
    {
      id:13,
      athlete_profile_id: 13,
      affiliation_city: "Eugene",
      affiliation_state: "Oregon"
    },
    {
      id:14,
      athlete_profile_id: 14,
      affiliation_city: "Richardson",
      affiliation_state: "Texas"
    },
  ]);
  await knex.raw('ALTER SEQUENCE locations_id_seq RESTART WITH 15');

  await knex("businesses").insert([
    {
      id: 0,
      business_name: "Waco Drip",
      first_name: "Hunter",
      middle_name: "",
      last_name: "Solano",
      password: "",
      email: "info@wacodrip.com",
      address: "2901 Keathley Dr",
      phone: "(254)300-1903",
      city: "Lorena",
      state: "Texas",
      zip: "76655",
      opt_in: false,
      location: knex.raw(
        "st_GeomFromText('POINT (-97.22763803658431 31.458891020835793)', 4326)"
      ),
    },

    {
      id: 1,
      business_name: "Inheritance Juicery",
      first_name: "",
      middle_name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      opt_in: false,
    },
    {
      id: 2,
      business_name: "UTD CS",
      first_name: "UTD",
      middle_name: "",
      last_name: "CS - Business",
      password: "",
      email: "hello@huntersolano.com",
      address: "",
      phone: "",
      city: "",
      state: "",
      zip: "",
      opt_in: false,
    },

    {
      id: 3,
      business_name: "Soul training",
      first_name: "Fred",
      middle_name: "",
      last_name: "Solis",
      password: "",
      email: "drew.solano@gmail.com",
      address: "123 cherry st",
      phone: "(254) 742-8522",
      city: "Gatesville",
      state: "Texas",
      zip: "76655",
      opt_in: false,
      location: knex.raw(
        "st_GeomFromText('POINT (-97.74352999999996 31.434900000000027)', 4326)"
      ),
    },
  ]);
  await knex.raw('ALTER SEQUENCE businesses_id_seq RESTART WITH 4');

  await knex('business_profile').insert([
  {
    id:0,
    business_id: 0,
    interested_sports: "Cross-Country, Football",
    business_industry: "Real Estate",
    opportunity: "Social Media Posts",
    budget: "$100-$250",
    pref_athlete_level: "College",
    pref_grade_level: "Sophmore",
    gender_preference: "Male",
    cause_affiliation: "Other",
    active_seeking: true,
  },

  {
    id: 1,
    business_id: 1,
  },

  {
    id: 2,
    business_id: 2,
    interested_sports: "Golf",
    interested_school: "The University of Texas at Dallas",
    business_industry: "Technology"
  },

  {
    id: 3,
    business_id:3,
  }


  ]);
  await knex.raw('ALTER SEQUENCE business_profile_id_seq RESTART WITH 4');
  await knex('business_deals').insert([
  {
    id: 0,
    business_profile_id:0,
  },
  {
    id: 1,
    business_profile_id:1,
  },
  {
    id: 2,
    business_profile_id:2,
  },
  {
    id: 3,
    business_profile_id:3,
  }

  ]);
  await knex.raw('ALTER SEQUENCE business_deals_id_seq RESTART WITH 4');

  await knex('campaigns').insert([
    {
      business_id: 0,
      payment_type: "Cold Hard Cash",
      sports: "Test Sport",
      description: "Test Event",
      event_type: "Test",
      monetary_value: 50,
      icon_image: ""
    }
  ]);

  await knex('users').insert([
    {
      first_name:"Staff",
      last_name: "Test",
      email: "test_staff@test.com",
      password: "$2a$12$92zxe5BVA/TLicrrNygGye2OfomnPVAZGDtuPLqapNcGUWg6fTvm6",
      role: "Staff",
      emailverified: true,
      tokenusedbefore: true,
      entity_id: null
    },
    {
      first_name:"Athlete",
      last_name: "Test",
      email: "test_athlete@test.com",
      password: "$2a$12$92zxe5BVA/TLicrrNygGye2OfomnPVAZGDtuPLqapNcGUWg6fTvm6",
      role: "Athlete",
      emailverified: true,
      tokenusedbefore: true,
      entity_id: 0
    }, 
    {
      first_name:"Brand",
      last_name: "Test",
      email: "test_brand@test.com",
      password: "$2a$12$92zxe5BVA/TLicrrNygGye2OfomnPVAZGDtuPLqapNcGUWg6fTvm6",
      role: "Brand",
      emailverified: true,
      tokenusedbefore: true,
      entity_id: 0
    }
  ]);
};
