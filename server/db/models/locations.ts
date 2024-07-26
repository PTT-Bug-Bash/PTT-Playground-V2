import { ModelObject, Model } from "objection";

export class Location extends Model {
  static get tableName() {
    return "locations";
  }
}

export type LocationShape = ModelObject<Location>;