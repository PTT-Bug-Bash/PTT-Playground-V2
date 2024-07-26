import { ModelObject, Model } from "objection";

export class CampaignRepeats extends Model {
  static get tableName() {
    return "campaigns_repeat";
  }
}

export type CampaignShape = ModelObject<CampaignRepeats>;