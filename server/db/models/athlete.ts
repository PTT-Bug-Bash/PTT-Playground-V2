import { ModelObject, Model } from "objection";

export class Athlete extends Model {
  static get tableName() {
    return "athletes";
  }
}

export type AthleteShape = ModelObject<Athlete>;