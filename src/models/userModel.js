const pool = require('../config/database');

class UserModel {
    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM "user"."users" WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async create(userData) {
        const { name, email, password, mobile, gender, organization } = userData;
        const result = await pool.query(
            'INSERT INTO "user"."users" (name, email, pwd, mobile, gender, institute, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, 1) RETURNING id, name, email',
            [name, email, password, mobile, gender, organization]
        );
        return result.rows[0];
    }
}

module.exports = UserModel;