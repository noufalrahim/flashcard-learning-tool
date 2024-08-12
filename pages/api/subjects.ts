import {db} from '../../lib/db';

export default async function handler(req: any, res: any) {
    try {
      const [rows] = await db.query('SELECT * FROM subjects');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
