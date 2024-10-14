const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());

// MySQL connection setup
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dh@nvi2123",
  database: "movie_ticket_management",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Serve static files from the frontend directory
app.use(express.static('frontend'));

// Routes for serving HTML files
app.get("/sign_up", (req, res) => {
  res.sendFile("html/index.html", { root: __dirname + '/frontend' });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/pricing', (req, res) => {
  res.sendFile('html/pricing.html', { root: __dirname + '/frontend' });
});

app.get('/interstellar', (req, res) => {
  res.sendFile('html/interstellar.html', { root: __dirname + '/frontend' });
});

// Add other routes and database operations here

app.post("/sign_up", (req, res) => {
  const name = req.body.name;
  const phn_no = req.body.phone;
  const usr_email = req.body.email;
  const password = req.body.password;

  const query = `INSERT INTO user_ (usr_name, phn_no, usr_email, password_) VALUES (?, ?, ?, ?)`;
  connection.query(query, [name, phn_no, usr_email, password], (err, result) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("User added to the database");
    res.sendFile('html/ticket.html', { root: __dirname + '/frontend' });
  });
});

// Endpoint for updating tickets and user
app.get('/updateTicketAndUser', (req, res) => {
  console.log('Received request for /updateTicketAndUser');

  const movieId = req.query.movieId;

  connection.query(`SELECT * FROM tickets WHERE movie_id = ?`, [movieId], (error, results) => {
    if (error) {
      console.error('Error fetching ticket information', error);
      return res.status(500).json({ success: false, message: 'Error fetching ticket information', error: error.message });
    }

    if (results.length > 0 && results[0].quantity > 0) {
      const movieName = results[0].movie_name;

      connection.query(`UPDATE tickets SET quantity = quantity - 1 WHERE movie_id = ?`, [movieId], (error) => {
        if (error) {
          console.error('Error updating ticket quantity', error);
          return res.status(500).json({ success: false, message: 'Error updating ticket quantity', error: error.message });
        }

        const currentTime = new Date().toLocaleTimeString();
        const ticketCode = `TKNO${results[0].quantity + 1}`;

        connection.query(
          'INSERT INTO user_tickets (movie_name, time, code) VALUES (?, ?, ?)',
          [movieName, currentTime, ticketCode],
          (error) => {
            if (error) {
              console.error('Error updating user_tickets table', error);
              return res.status(500).json({ success: false, message: 'Error updating user_tickets table', error: error.message });
            }

            console.log('Ticket booked successfully');
            res.json({ success: true, message: 'Ticket booked successfully' });
          }
        );
      });
    } else {
      console.log('No tickets available');
      res.json({ success: false, message: 'No tickets available' });
    }
  });
});

// Endpoint for fetching user tickets
app.get('/mytickets', (req, res) => {
  const query = 'SELECT * FROM user_tickets';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Tickets</title>
      </head>
      <body>
        <h1>My Tickets</h1>
        <ul>
          ${results.map(ticket => `
            <li>${ticket.movie_name} 
              <form action="/delete" method="post" style="display:inline;">
                <input type="hidden" name="id" value="${ticket.ticket_id}">
                <button type="submit">Delete</button>
              </form>
            </li>`).join('')}
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  });
});

// Endpoint for fetching theatre details
app.get('/theatre', (req, res) => {
  const query = 'SELECT * FROM THEATRE';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Theatres</title>
      </head>
      <body>
        <h1>Theatres</h1>
        <ul>
          ${results.map(theatre => `
            <li>${theatre.THEATRE_ID} ${theatre.movie_name} ${theatre.THEATRE_NAME} ${theatre.LOCATION}</li>`).join('')}
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
