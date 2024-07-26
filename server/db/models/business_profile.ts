import { ModelObject, Model } from "objection";

export class BusinessProfile extends Model {
  static get tableName() {
    return "business_profile";
  }
}

export type BusinessProfileShape = ModelObject<BusinessProfile>;