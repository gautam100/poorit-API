// ...existing code...

// Add this new route
router.post('/result/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const examResult = req.body;
        
        // Save to exam_results table
        const result = await db.query(
            'INSERT INTO exam_results (user_id, total_questions, total_correct, total_incorrect, total_skipped) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [userId, examResult.totalQuestions, examResult.totalCorrect, examResult.totalIncorrect, examResult.totalSkipped]
        );

        // Save category-wise results
        for(const categoryResult of examResult.resultArray) {
            await db.query(
                'INSERT INTO exam_categories (exam_result_id, category_name, correct_answers, total_questions) VALUES ($1, $2, $3, $4)',
                [result.rows[0].id, categoryResult.category, categoryResult.answers.filter(a => a.answer === 'Correct').length, categoryResult.answers.length]
            );
        }

        res.status(200).json({ message: 'Exam results saved successfully' });
    } catch (error) {
        console.error('Error saving exam results:', error);
        res.status(500).json({ error: 'Failed to save exam results' });
    }
});

// ...existing code...
