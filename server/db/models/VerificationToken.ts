import { Model } from 'objection';

export class VerificationToken extends Model {
    static tableName = 'verification_tokens';
    id!: number;
    user_id!: number;
    token!: string;
    expires_at!: Date;

    static jsonSchema = {
        type: 'object',
        required: ['user_id', 'token', 'expires_at'],

        properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            token: { type: 'string', minLength: 1, maxLength: 255 },
            expires_at: { type: 'string', format: 'date-time' },
        }
    };
}
