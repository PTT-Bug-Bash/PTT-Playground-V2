import { ModelObject, Model } from "objection";

export class NotesHistory extends Model {
  static get tableName() {
    return "notes_history";
  }
}

export type NotesHistoryShape = ModelObject<NotesHistory>;