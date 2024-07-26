import { Model, ModelObject } from "objection";

export class User extends Model {
  // Static method to specify the table name
  static get tableName() {
    return "users";
  }

  // Instance properties
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  registered!: string;
  token!: string;
  createdtime!: string;
  emailverified!: string;
  tokenusedbefore!: string;
  reset_password_expires: string;
  role!: string;
}

// Type for user objects
export type UserShape = ModelObject<User>;
