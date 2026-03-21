const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const pool = new Pool({
   user: process.env.DB_USER || 'postgres',
   host: process.env.DB_HOST || 'localhost',
   database: process.env.DB_NAME || 'devops_db',
   password: process.env.DB_PASSWORD || 'postgres',
   port: 5432,
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', version: '1.0.0' });
});

app.get('/api/todos', async (req, res) => {
   try {
      const result = await pool.query('SELECT * FROM todos ORDER BY id');
      res.status(200).json(result.rows);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

app.post('/api/todos', async (req, res) => {
   try {
      const { title, completed = false } = req.body;
      if (!title || title.trim() === '') {
          return res.status(400).json({ error: 'Title required' });
      }
      const result = await pool.query(
         'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
         [title, completed]
      );
      res.status(201).json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// STUDENT TODO: Thêm API PUT và DELETE (Nếu đề bài yêu cầu)
app.put('/api/todos/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const { title, completed } = req.body;
       const result = await pool.query(
          'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
          [title, completed, id]
       );
       res.status(200).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
 });
 
 app.delete('/api/todos/:id', async (req, res) => {
    try {
       const { id } = req.params;
       await pool.query('DELETE FROM todos WHERE id = $1', [id]);
       res.status(200).json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
 });

const port = 8080;
if (process.env.NODE_ENV !== 'test') {
   app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;