import { ModelObject, Model } from "objection";

export class Matches extends Model {
    static get tableName() {
        return "matches";
    }
}

export type MatchesShape = ModelObject<Matches>;