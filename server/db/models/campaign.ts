import { ModelObject, Model } from "objection";

export class Campaign extends Model {
  static get tableName() {
    return "campaigns";
  }
}

export type CampaignShape = ModelObject<Campaign>;