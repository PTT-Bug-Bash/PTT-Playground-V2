import { ModelObject, Model } from "objection";

export class BusinessDeal extends Model {
  static get tableName() {
    return "business_deals";
  }
}

export type BusinessDealShape = ModelObject<BusinessDeal>;