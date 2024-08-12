import { db } from '../../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { question, answer, subject_id } = req.body;

    if (!question || !answer || !subject_id) {
      return res.status(400).json({ message: 'question and answer are required' });
    }

    try {
      const result = await db.query(
        'INSERT INTO flashcards (question, answer, subject_id) VALUES (?, ?, ?)',
        [question, answer, subject_id]
      );
      
      res.status(201).json({ message: 'FlashCard Added successfully'});
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
