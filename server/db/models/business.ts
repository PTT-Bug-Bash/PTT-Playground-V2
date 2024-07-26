import { ModelObject, Model } from "objection";

export class Business extends Model {
    static get tableName() {
        return 'businesses';
    }
}

export type BusinessShape = ModelObject<Business>;