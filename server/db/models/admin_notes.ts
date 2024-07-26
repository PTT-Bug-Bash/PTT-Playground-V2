import { ModelObject, Model } from "objection";

export class AdminNotes extends Model {
  static get tableName() {
    return "admin_notes";
  }
}

export type AdminNotesShape = ModelObject<AdminNotes>;