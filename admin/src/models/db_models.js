export const athlete = {
    athlete: {
        id: 0,
        first_name: "",
        last_name: "",
        personal_email: "",
        phone: "",
        athlete_level: "",
        grade_level: "",
        sport_affiliation: "",
        sport: "",
        address: "",
        city: "",
        zip: "",
        state: "",
        password: "",
        opt_in: false
    }
};

export const athlete_profile = {
    athlete_profile: {
        id: 0,
        athlete_id: 0,
        license_image: "",
        school_email: "",
        insta_link: "",
        insta_follower: 0,
        tiktok_link: "",
        tiktok_follower: 0,
        twitter_link: "",
        twitter_follower: 0,
        facebook_link: "",
        facebook_follower: 0,
        gpa: "",
        youtube_link: "",
        youtube_subs: 0,
        position: "",
        interested_in: "",
        business_interest: "",
        dob: "",
        gender: "",
        support_cause: "",
        bio: "",
        ideal_dollar: "",
        exposure: "",
        refers: "",
        payout_details: "",
        language: "",
        ethnicity: "",
        past_team: "",
        league_conference: "",
        achievements: "",
        specialization: "",
        ncaa_eligible: false
    }
}

export const deal_preference = {
    deal_preference: {
        id: 0,
        athlete_profile_id: 0,
        video_shoutout: 0,
        phone_call: 0,
        zoom_chat: 0,
        media_creation: 0,
        testing_feedback: 0,
        meet_greet: 0,
        tutorial_session: 0,
        q_and_a: 0,
        face_interview: 0,
        keynote_event: 0,
        podcast: 0,
        production_sess: 0,
        autograph: 0,
        custom_experience: false,
        facebook_post: 0,
        facebook_live: 0,
        facebook_story: 0,
        instagram_post: 0,
        instagram_reel: 0,
        instagram_story: 0,
        linkedin_post: 0,
        tiktok_post: 0,
        x_post: 0,
        x_video: 0,
        youtube_post: 0,
        youtube_short: 0
    }
}

export const locations = {
    athlete_locations: {
        id: 0,
        athlete_profile_id: 0,
        curr_street: "",
        curr_city: "",
        curr_state: "",
        curr_zipcode: "",
        affilition_street: "",
        affiliation_city: "",
        affiliation_state: "",
        affiliation_zipcode: "",
        home_street: "",
        home_city: "",
        home_state: "",
        home_zipcode: ""
    }
}

export const brand = {
    brand: {
        id: 0,
        business_name: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        zip: "",
        business_image: "",
        opt_in: false
    }
};

export const brand_profile = {
    brand_profile: {
        id: 0,
        business_id: 0,
        interested_sports: "",
        interested_school: "",
        business_industry: "",
        opportunity: "",
        budget: "",
        reason_for_sponsor: "",
        gender_preference: "",
        cause_affiliation: "",
        active_seeking: false,
        exposure: "",
        featured_images: "",
        pref_athlete_level: "",
        pref_grade_level: ""
    }
}

export const brand_deals = {
    brand_deals: {
        id: 0,
        business_profile_id: 0,
        video_shoutout: false,
        phone_call: false,
        zoom_chat: false,
        media_creation: false,
        testing_feedback: false,
        meet_greet: false,
        tutorial_session: false,
        q_and_a: false,
        face_interview: false,
        keynote_event: false,
        podcast: false,
        production_sess: false,
        autograph: false,
        custom_experience: "",
        facebook_post: false,
        facebook_live: false,
        facebook_story: false,
        instagram_post: false,
        instagram_reel: false,
        instagram_story: false,
        linkedin_post: false,
        tiktok_post: false,
        x_post: false,
        x_video: false,
        youtube_post: false,
        youtube_short: false
    }
}

export const opportunity = {
    opportunity: {
        id: 0,
        business_id: 0,
        payment_type: "",
        sports: "",
        description: "",
        event_type: "",
        monetary_value: 0,
        icon_image: "",
        title: "",
        athelete_qualification: "",
        campaign_status: "",
        comments: ""
    }
};

export const opportunity_image = {
    opportunity_image: {
        id: 0,
        campaign_id: 0,
        image_url: ""
    }
}

export const athlete_opportunity = {
    athlete_opportunity: {
        id: 0,
        athlete_id: 0,
        campaign_id: 0
    }
}

export const opportunity_matches = {
    opportunity_matches: {
        id: 0,
        chosen_athlete: 0,
        campaign_id: 0,
        status: ""
    }
}

export const note = {
    note: {
        note_id: 0,
        business_id: 0,
        athlete_id: 0,
        notes_summary: "",
        timestamp: ""
    }
}

export const user = {
    user: {
        id: 0, 
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isVerified: false, 
        role: "",
        entity_id: 0
    }
};
