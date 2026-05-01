const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// api.hira.com
app.use(cors({ origin: 'http://localhost:5173' }));


const students = [
  { id: 1, name: 'Alice', age: 20, major: 'Computer Science' },
  { id: 2, name: 'Bob', age: 22, major: 'Mathematics' },
  { id: 3, name: 'Charlie', age: 21, major: 'Physics' },
  { id: 4, name: 'Diana', age: 23, major: 'Biology' },
  { id: 5, name: 'Eve', age: 19, major: 'Chemistry' }
];

app.get('/students', (_req, res) => {
  res.json(students);
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
