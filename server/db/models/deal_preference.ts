import { ModelObject, Model } from "objection";

export class DealPreference extends Model {
  static get tableName() {
    return "deal_preference";
  }
}

export type DealPreferenceShape = ModelObject<DealPreference>;