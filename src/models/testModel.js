const pool = require("../config/database");

class TestModel {
  static async fetchQuestions(ques_table, options_table) {
    const result = await pool.query(
      `WITH random_questions AS (
    SELECT 
        q.id,
        q.question,
        encode(q.correct_answer::text::bytea, 'base64') as correct_answer,
        q.is_enable
    FROM exam.` +
        ques_table +
        ` q
    WHERE q.is_enable = true
    ORDER BY RANDOM()
    LIMIT 10
)
SELECT 
    rq.id AS question_id,
    rq.question,
    rq.correct_answer,
    json_agg(
        json_build_object(
            'option_id', o.id,
            'option_text', o.option
        ) ORDER BY o.id
    ) AS options
FROM random_questions rq
LEFT JOIN exam.` +
        options_table +
        ` o ON o.ques_id = rq.id 
WHERE o.is_enable = true
GROUP BY 
    rq.id,
    rq.question,
    rq.correct_answer
ORDER BY rq.id
        `
    );
    return result.rows;
  }

  static async fetchCategories() {
    const result = await pool.query(`SELECT 
        c.id,
        c.cat_name,
        c.ques_table,
        c.options_table
    FROM exam.master_category c
    WHERE c.is_enable = true ORDER BY c.sequence`);
    return result.rows;
  }

  static async saveResult(user_id) {
    const body = req.body;
    const result = await pool.query(`INSERT INTO exam_results (user_id, total_ques, total_correct_ans,total_incorrect_ans,total_category, created_on) VALUES('${user_id}','','','','','')`);
    return result.rows;
  }
}

module.exports = TestModel;
