import { db } from '../../lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name ) {
      return res.status(400).json({ message: 'question and answer are required' });
    }

    try {
      const result = await db.query(
        'INSERT INTO subjects (name) VALUES (?)',
        [name]
      );
      
      res.status(201).json({ message: 'Subject Added successfully'});
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
