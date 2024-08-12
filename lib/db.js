// import mysql from 'mysql2/promise';

// export const db = mysql.createPool({
//   host: 'localhost',
//   user: 'rootusser',
//   password: '123456789',
//   database: 'flashcard',
// });


import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'mysql-38ea0a2d-noufalrahim6784-a327.k.aivencloud.com',
  port: '14409', 
  user: 'avnadmin',
  password: 'AVNS_SZFmP04uCrxo_gkIGeB',
  database: 'flashcards',
});
