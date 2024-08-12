import { db } from '../../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'FlashCard ID is required' });
    }

    try {
      const result = await db.query('DELETE FROM flashcards WHERE id = ?', [id]);

      res.status(200).json({ message: 'flashcard deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
