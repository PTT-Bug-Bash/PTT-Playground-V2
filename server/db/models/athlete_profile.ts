import { ModelObject, Model } from "objection";

export class AthleteProfile extends Model {
  static get tableName() {
    return "athlete_profile";
  }
}

export type AthleteProfileShape = ModelObject<AthleteProfile>;