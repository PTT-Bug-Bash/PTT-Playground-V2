import { ModelObject, Model } from "objection";

export class CampaignImage extends Model {
  static get tableName() {
    return "campaign_image";
  }
}

export type CampaignImageShape = ModelObject<CampaignImage>;