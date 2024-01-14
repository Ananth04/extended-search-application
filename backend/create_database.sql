-- Create Technology table
CREATE TABLE Technology (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  price REAL,
  color TEXT,
  weight REAL,
  release_date DATE,
  specifications TEXT,
  manufacturer_id INTEGER,
  average_rating REAL,
  warranty_period INTEGER,
  battery_life INTEGER,
  storage_capacity INTEGER,
  ram INTEGER,
  processor_type TEXT,
  FOREIGN KEY(manufacturer_id) REFERENCES Manufacturer(id)
  -- Add other foreign key constraints based on relationships
);

-- Create Country table
CREATE TABLE Country (
  id INTEGER PRIMARY KEY,
  name TEXT,
  continent TEXT,
  population INTEGER,
  size REAL,
  gdp REAL,
  num_tech_products INTEGER,
  capital_city TEXT,
  official_language TEXT,
  currency TEXT,
  internet_penetration_rate REAL,
  avg_life_expectancy REAL,
  literacy_rate REAL,
  political_system TEXT,
  major_exports TEXT,
  climate_type TEXT
  -- Add other attributes as needed
);

-- Create Manufacturer table
CREATE TABLE Manufacturer (
  id INTEGER PRIMARY KEY,
  name TEXT,
  headquarters TEXT,
  year_founded INTEGER,
  num_employees INTEGER,
  annual_revenue REAL,
  market_cap REAL,
  ceo TEXT,
  industry_sector TEXT,
  num_products INTEGER,
  global_presence TEXT, -- Consider normalizing this field if necessary
  stock_symbol TEXT,
  environmental_rating REAL,
  avg_employee_salary REAL,
  r_and_d_budget REAL,
  patent_count INTEGER
  -- Add other attributes as needed
);

-- Create Retailer table
CREATE TABLE Retailer (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type TEXT,
  locations TEXT,
  num_products_available INTEGER,
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
);

-- Create UserReviews table
CREATE TABLE UserReviews (
  id INTEGER PRIMARY KEY,
  username TEXT,
  rating INTEGER,
  date_of_review DATE,
  product_reviewed_id INTEGER,
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
  FOREIGN KEY(product_reviewed_id) REFERENCES Technology(id)
);

-- Create TechnologyManufacturer table (Many-to-One relationship)
CREATE TABLE TechnologyManufacturer (
  technology_id INTEGER,
  manufacturer_id INTEGER,
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  FOREIGN KEY(manufacturer_id) REFERENCES Manufacturer(id),
  PRIMARY KEY(technology_id)
);

-- Create TechnologyCountry table (Many-to-Many relationship)
CREATE TABLE TechnologyCountry (
  technology_id INTEGER,
  country_id INTEGER,
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  FOREIGN KEY(country_id) REFERENCES Country(id),
  PRIMARY KEY(technology_id, country_id)
);

-- Create TechnologyUserReviews table (One-to-Many relationship)
CREATE TABLE TechnologyUserReviews (
  technology_id INTEGER,
  user_review_id INTEGER,
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  FOREIGN KEY(user_review_id) REFERENCES UserReviews(id),
  PRIMARY KEY(technology_id)
);

-- Create CountryTechnology table (Many-to-Many relationship)
CREATE TABLE CountryTechnology (
  country_id INTEGER,
  technology_id INTEGER,
  FOREIGN KEY(country_id) REFERENCES Country(id),
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  PRIMARY KEY(country_id, technology_id)
);

-- Create ManufacturerTechnology table (One-to-Many relationship)
CREATE TABLE ManufacturerTechnology (
  manufacturer_id INTEGER,
  technology_id INTEGER,
  FOREIGN KEY(manufacturer_id) REFERENCES Manufacturer(id),
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  PRIMARY KEY(manufacturer_id)
);

-- Create RetailerTechnology table (Many-to-Many relationship)
CREATE TABLE RetailerTechnology (
  retailer_id INTEGER,
  technology_id INTEGER,
  FOREIGN KEY(retailer_id) REFERENCES Retailer(id),
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  PRIMARY KEY(retailer_id, technology_id)
);

-- Create UserReviewsTechnology table (Many-to-One relationship)
CREATE TABLE UserReviewsTechnology (
  user_review_id INTEGER,
  technology_id INTEGER,
  FOREIGN KEY(user_review_id) REFERENCES UserReviews(id),
  FOREIGN KEY(technology_id) REFERENCES Technology(id),
  PRIMARY KEY(user_review_id)
);
