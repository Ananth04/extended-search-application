const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in request body
app.use(express.json());

/*app.get('/create-database', (req, res) => {
  const db = new _Database('tech_database.db');

  // Create Technology table
  db.run(`
      CREATE TABLE IF NOT EXISTS Technology (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          price REAL,
          color TEXT,
          weight REAL,
          release_date DATE,
          specifications TEXT,
          manufacturer_id INTEGER,
          country_id INTEGER,
          average_rating REAL,
          warranty_period INTEGER,
          battery_life REAL,
          storage_capacity INTEGER,
          ram INTEGER,
          processor_type TEXT,
          FOREIGN KEY(manufacturer_id) REFERENCES Manufacturer(id),
          FOREIGN KEY(country_id) REFERENCES Country(id)
      )
  `);

  // Create Country table
  db.run(`
      CREATE TABLE IF NOT EXISTS Country (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          continent TEXT,
          population INTEGER,
          size REAL,
          gdp REAL,
          tech_product_count INTEGER,
          capital_city TEXT,
          official_language TEXT,
          currency TEXT,
          internet_penetration_rate REAL,
          average_life_expectancy REAL,
          literacy_rate REAL,
          political_system TEXT,
          major_exports TEXT,
          climate_type TEXT
      )
  `);

  // Create Manufacturer table
  db.run(`
      CREATE TABLE IF NOT EXISTS Manufacturer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          headquarters TEXT,
          year_founded INTEGER,
          employees_count INTEGER,
          annual_revenue REAL,
          market_cap REAL,
          ceo TEXT,
          industry_sector TEXT,
          products_count INTEGER,
          global_presence TEXT,
          stock_symbol TEXT,
          environmental_rating REAL,
          avg_employee_salary REAL,
          r_and_d_budget REAL,
          patent_count INTEGER
      )
  `);

  // Create Retailer table
  db.run(`
      CREATE TABLE IF NOT EXISTS Retailer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          locations TEXT,
          products_count INTEGER,
          avg_customer_rating REAL,
          founded_year INTEGER,
          ceo TEXT,
          annual_revenue REAL,
          employee_count INTEGER,
          store_count INTEGER,
          online_traffic INTEGER,
          return_policy TEXT,
          shipping_options TEXT,
          exclusive_brands TEXT,
          membership_programs TEXT
      )
  `);

  // Create UserReviews table
  db.run(`
      CREATE TABLE IF NOT EXISTS UserReviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          rating REAL,
          review_date DATE,
          product_id INTEGER,
          review_text TEXT,
          helpful_votes INTEGER,
          verified_purchase BOOLEAN,
          reviewer_location TEXT,
          reviewer_age_group TEXT,
          purchase_date DATE,
          pros TEXT,
          cons TEXT,
          image_url TEXT,
          video_url TEXT,
          recommended BOOLEAN,
          FOREIGN KEY(product_id) REFERENCES Technology(id)
      )
  `, (err) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
          return;
      }


    res.json({ success: true, message: 'Database and tables created successfully' });
    });
});
*/
const dbPromise = sqlite.open({
  filename: 'search-app.db',
  driver: sqlite3.Database,
});

app.get('/test', (req, res) => {
  res.send('Hello, this is a test endpoint!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

//get entities
app.get('/get-tables', async (req, res) => {
  const db = await dbPromise;

  // Query to get all tables from sqlite_master
  const query = 'SELECT name FROM sqlite_master WHERE type="table"';

  // Execute the query
  try {
      const tables = await db.all(query);
      res.json({ success: true, data: tables });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Search endpoint for Technology
app.get('/search-technology', async (req, res) => {
    const db = await dbPromise;

    // Get search query parameters from the request
    const { name, type, color, manufacturer, country } = req.query;

    // Construct the SQL query based on the provided parameters
    let sql = 'SELECT * FROM Technology WHERE 1=1';

    if (name) sql += ` AND name LIKE '%${name}%'`;
    if (type) sql += ` AND type LIKE '%${type}%'`;
    if (color) sql += ` AND color LIKE '%${color}%'`;
    if (manufacturer) sql += ` AND manufacturer_id IN (SELECT id FROM Manufacturer WHERE name LIKE '%${manufacturer}%')`;
    if (country) sql += ` AND country_id IN (SELECT id FROM Country WHERE name LIKE '%${country}%')`;

    // Execute the query
    db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.json({ success: true, data: rows });
        }

        // Close the database connection
        db.close();
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
