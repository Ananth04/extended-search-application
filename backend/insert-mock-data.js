const sqlite3 = require('sqlite3').verbose();

const predefinedValues = {
    Technology: {
      name: ['Laptop Pro', 'Smartphone X', 'Tablet Plus', 'Smartwatch Elite', 'Camera Ultra', 'Gaming Console Max', 'Headphones Supreme', 'Fitness Tracker Pro', 'Drone Pro', 'VR Headset Pro', 'Smart Home Device Plus', 'E-reader Premium', 'Digital Camera Deluxe', 'External Hard Drive Pro', 'Printer Advanced'],
      type: ['Laptop', 'Smartphone', 'Tablet', 'Smartwatch', 'Camera', 'Gaming Console', 'Headphones', 'Fitness Tracker', 'Drone', 'VR Headset', 'Smart Home Device', 'E-reader', 'Digital Camera', 'External Hard Drive', 'Printer'],
      price: ['599', '899', '349', '299', '999', '799', '149', '129', '599', '799', '199', '249', '699', '149', '299'],
      color: ['Black', 'Silver', 'White', 'Blue', 'Red', 'Green', 'Gold', 'Pink', 'Purple', 'Yellow', 'Orange', 'Brown', 'Gray', 'Cyan', 'Magenta'],
      weight: ['1.5', '0.8', '0.6', '0.3', '2.0', '1.2', '0.1', '0.2', '1.8', '1.5', '0.5', '0.4', '1.0', '0.2', '0.7'],
      release_date: ['2022-01-01', '2022-02-15', '2022-03-10', '2022-04-25', '2022-05-20', '2022-06-05', '2022-07-30', '2022-08-15', '2022-09-20', '2022-10-15', '2022-11-10', '2022-12-25', '2023-01-05', '2023-02-20', '2023-03-15'],
      specifications: ['High-end specifications', 'Premium features', 'Advanced technology', 'Cutting-edge design', 'Innovative functionality', 'Powerful performance', 'Sleek and stylish', 'Top-notch quality', 'State-of-the-art features', 'Exceptional durability', 'Modern design', 'Enhanced user experience', 'Versatile functionality', 'Efficient and reliable', 'Next-gen technology'],
      manufacturer_id: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      countryofOriginID: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      average_rating: ['4.5', '4.2', '4.8', '4.0', '4.6', '4.3', '4.9', '4.1', '4.7', '4.4', '5.0', '4.2', '4.8', '4.5', '4.6'],
      warranty_period: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
      battery_life: ['10', '12', '8', '14', '16', '20', '6', '18', '15', '12', '8', '10', '14', '16', '20'],
      storage_capacity: ['256', '512', '128', '64', '1TB', '2TB', '256', '512', '128', '64', '1TB', '2TB', '256', '512', '128'],
      ram: ['16', '32', '8', '4', '64', '128', '16', '32', '8', '4', '64', '128', '16', '32', '8'],
      processor_type: ['Intel Core i9', 'AMD Ryzen 9', 'Apple M1', 'Qualcomm Snapdragon', 'Samsung Exynos', 'Intel Core i7', 'AMD Ryzen 7', 'Apple A14 Bionic', 'Qualcomm Snapdragon', 'Samsung Exynos', 'Intel Core i5', 'AMD Ryzen 5', 'Apple A12 Bionic', 'Qualcomm Snapdragon', 'Samsung Exynos'],
    },
    Country: {
        name: ['United States', 'China', 'India', 'Brazil', 'Russia', 'United Kingdom', 'France', 'Germany', 'Japan', 'South Korea', 'Canada', 'Australia', 'South Africa', 'Mexico', 'Italy'],
        continent: ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia', 'Antarctica', 'North Pole', 'South Pole', 'Mars', 'Moon', 'Atlantis', 'Atlantis 2', 'Atlantis 3', 'Atlantis 4'],
        population: ['331002651', '1444216107', '1380004385', '212559417', '145934462', '67886011', '65273511', '83783942', '126476461', '51269185', '37742154', '25499884', '59308690', '128932753', '60461826'],
        size: ['9833517', '9596961', '3287263', '8515767', '17098242', '243610', '551695', '357022', '377975', '100210', '9976140', '7692024', '1221037', '1964375', '301340'],
        gdp: ['21433225', '14342903', '2875148', '18397502', '16847246', '2678452', '2966972', '4454846', '5081770', '1762676', '1648198', '1417937', '761733', '1145559', '2103163'],
        num_tech_products: ['5000', '8000', '3500', '1200', '4000', '600', '1500', '1000', '2000', '800', '700', '6000', '100', '900', '200'],
        capital_city: ['Washington, D.C.', 'Beijing', 'New Delhi', 'Brasília', 'Moscow', 'London', 'Paris', 'Berlin', 'Tokyo', 'Seoul', 'Ottawa', 'Canberra', 'Pretoria', 'Mexico City', 'Rome'],
        official_language: ['English', 'Mandarin', 'Hindi', 'Portuguese', 'Russian', 'English', 'French', 'German', 'Japanese', 'Korean', 'English', 'English', 'Afrikaans', 'Spanish', 'Italian'],
        currency: ['USD', 'CNY', 'INR', 'BRL', 'RUB', 'GBP', 'EUR', 'EUR', 'JPY', 'KRW', 'CAD', 'AUD', 'ZAR', 'MXN', 'EUR'],
        internet_penetration_rate: ['87.3', '69.3', '50.1', '72.7', '76.7', '96.6', '91.0', '93.6', '93.3', '96.0', '91.8', '86.5', '64.7', '70.1', '76.2'],
        avg_life_expectancy: ['78.8', '76.7', '69.7', '75.7', '72.6', '81.3', '82.3', '80.9', '84.6', '83.3', '81.7', '83.3', '64.0', '75.1', '83.2'],
        literacy_rate: ['99.0', '96.4', '74.0', '93.2', '99.7', '99.0', '99.0', '99.0', '99.0', '98.0', '99.0', '99.0', '94.0', '93.5', '98.4'],
        political_system: ['Federal Republic', 'Socialist Republic', 'Federal Parliamentary Republic', 'Federal Republic', 'Federal Semi-Presidential Republic', 'Constitutional Monarchy', 'Semi-Presidential Republic', 'Federal Parliamentary Republic', 'Constitutional Monarchy', 'Republic', 'Federal Parliamentary Constitutional Monarchy', 'Federal Parliamentary Democracy', 'Constitutional Democracy', 'Federal Republic', 'Unitary Parliamentary Republic'],
        major_exports: ['Machinery', 'Electronics', 'Software', 'Agricultural Products', 'Oil and Gas', 'Financial Services', 'Luxury Goods', 'Automobiles', 'Technology Products', 'Steel', 'Natural Resources', 'Education Services', 'Minerals', 'Automobiles', 'Fashion'],
        climate_type: ['Temperate', 'Continental', 'Tropical', 'Tropical', 'Continental', 'Temperate', 'Temperate', 'Temperate', 'Temperate', 'Temperate', 'Temperate', 'Temperate', 'Temperate', 'Tropical', 'Mediterranean'],
        // Add more attributes as needed
    },
    Manufacturer: {
        name: ['Samsung', 'Apple', 'Sony', 'Microsoft', 'Toyota', 'General Electric', 'Siemens', 'Procter & Gamble', 'Coca-Cola', 'IBM', 'Nike', 'L\'Oréal', 'Volkswagen', 'Samsung Electronics', 'Intel'],
        headquarters: ['Seoul', 'Cupertino', 'Tokyo', 'Redmond', 'Toyota City', 'Boston', 'Munich', 'Cincinnati', 'Atlanta', 'Armonk', 'Beaverton', 'Clichy', 'Wolfsburg', 'Suwon', 'Santa Clara'],
        year_founded: ['1938', '1976', '1946', '1975', '1937', '1892', '1847', '1837', '1892', '1911', '1964', '1909', '1937', '1969', '1969'],
        num_employees: ['287000', '154000', '114400', '181000', '366283', '205000', '293000', '100000', '86000', '345900', '76800', '89000', '300000', '111000', '110000'],
        annual_revenue: ['211700', '365900', '79500', '168100', '272200', '95000', '85700', '67900', '33000', '73850', '37400', '29200', '227500', '221000', '77800'],
        market_cap: ['409000', '2700000', '120000', '2000000', '216000', '93600', '104000', '338000', '221000', '115000', '226000', '204000', '94000', '227000', '318000'],
        ceo: ['Kim Hyun Suk', 'Tim Cook', 'Kenichiro Yoshida', 'Satya Nadella', 'Akio Toyoda', 'H. Lawrence Culp Jr.', 'Roland Busch', 'David S. Taylor', 'James Quincey', 'Arvind Krishna', 'John Donahoe', 'Nicolas Hieronimus', 'Herbert Diess', 'Kinam Kim', 'Pat Gelsinger'],
        industry_sector: ['Electronics', 'Technology', 'Electronics', 'Technology', 'Automotive', 'Industrial Conglomerate', 'Engineering and Electronics', 'Consumer Goods', 'Beverages', 'Technology', 'Apparel', 'Cosmetics', 'Automotive', 'Electronics', 'Technology'],
        num_products: ['Mobile Phones', 'Smartphones', 'Consumer Electronics', 'Software', 'Automobiles', 'Power Generation', 'Automation and Control Systems', 'Consumer Goods', 'Beverages', 'Hardware, Software, Services', 'Athletic Shoes and Apparel', 'Beauty and Cosmetics', 'Automobiles', 'Consumer Electronics', 'Semiconductors'],
        global_presence: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
        stock_symbol: ['005930.KS', 'AAPL', '6758.T', 'MSFT', 'TM', 'GE', 'SIEGY', 'PG', 'KO', 'IBM', 'NKE', 'OR', 'VOW3.DE', '005930.KS', 'INTC'],
        environmental_rating: ['3.8', '4.2', '3.9', '4.1', '3.7', '3.5', '3.6', '4.0', '3.9', '3.8', '4.2', '4.3', '3.6', '4.2', '4.1'],
        avg_employee_salary: ['85000', '150000', '120000', '130000', '110000', '100000', '110000', '90000', '85000', '120000', '90000', '120000', '100000', '110000', '120000'],
        r_and_d_budget: ['15000', '11000', '8000', '16000', '11000', '5000', '9000', '7000', '3000', '12000', '5000', '6000', '14000', '13000', '11000'],
        patent_count: ['7500', '45000', '3500', '30000', '8000', '12000', '5500', '15000', '10000', '25000', '9000', '11000', '7000', '18000', '20000'],
        // Add more attributes as needed
    },
    Retailer: {
        name: ['Amazon', 'Walmart', 'Alibaba', 'Best Buy', 'Target', 'Tesco', 'Costco', 'Carrefour', 'JD.com', 'Apple Store', 'Nike Store', 'Zara', 'Lululemon', 'Samsung Experience Store', 'Sony Store'],
        type: ['Online', 'Offline', 'Online', 'Offline', 'Offline', 'Offline', 'Offline', 'Offline', 'Online', 'Offline', 'Offline', 'Offline', 'Offline', 'Offline', 'Offline'],
        locations: ['Global', 'Global', 'Global', 'United States', 'United States', 'United Kingdom', 'United States', 'France', 'China', 'Global', 'Global', 'Global', 'Global', 'Global', 'Global'],
        num_products_available: ['500 million', '200 million', '1 billion', '100 million', '50 million', '30 million', '20 million', '25 million', '800 million', '10 million', '5 million', '15 million', '3 million', '10 million', '7 million'],
        avg_customer_rating: ['4.8', '4.5', '4.7', '4.6', '4.4', '4.3', '4.5', '4.6', '4.8', '4.7', '4.6', '4.5', '4.9', '4.7', '4.6'],
        founded_year: ['1994', '1962', '1999', '1966', '1902', '1919', '1976', '1958', '1998', '2001', '1964', '1974', '1998', '1978', '1996'],
        ceo: ['Andy Jassy', 'Doug McMillon', 'Daniel Zhang', 'Corie Barry', 'Brian Cornell', 'Ken Murphy', 'W. Craig Jelinek', 'Alexandre Bompard', 'Richard Liu', 'Tim Cook', 'John Donahoe', 'Óscar Pérez Marcote', 'Calvin McDonald', 'Hyun Suk Kim', 'Kenichiro Yoshida'],
        annual_revenue: ['386 billion', '559 billion', '109 billion', '82 billion', '93 billion', '76 billion', '166 billion', '79 billion', '114 billion', '274 billion', '49 billion', '21 billion', '45 billion', '4 billion', '80 billion'],
        employee_count: ['810000', '2200000', '254000', '340000', '409000', '440000', '254000', '320000', '340000', '154000', '78000', '177000', '38000', '73000', '110000'],
        store_count: ['20', '11600', '0', '5500', '1850', '6900', '796', '12800', '0', '510', '1150', '226', '506', '837', '438'],
        online_traffic: ['2.8 billion', '2.5 billion', '3.2 billion', '500 million', '300 million', '120 million', '80 million', '50 million', '2 billion', '150 million', '80 million', '40 million', '30 million', '10 million', '20 million'],
        return_policy: ['30 Days', '90 Days', '15 Days', '30 Days', '30 Days', '28 Days', '90 Days', '15 Days', '7 Days', '30 Days', '30 Days', '14 Days', '30 Days', '30 Days', '14 Days'],
        shipping_options: ['Standard', 'Express', 'International', 'Standard', 'Express', 'Express', 'Standard', 'Express', 'International', 'Standard', 'Standard', 'Express', 'Express', 'Standard', 'Express'],
        exclusive_brands: ['Amazon Basics', 'Walmart Brands', 'Alibaba Brands', 'In-House Brands', 'In-House Brands', 'In-House Brands', 'In-House Brands', 'In-House Brands', 'JD Brands', 'Apple Products', 'Nike', 'Zara', 'Lululemon', 'Samsung Electronics', 'Sony'],
        membership_programs: ['Amazon Prime', 'Walmart+', 'Alibaba VIP', 'Best Buy Totaltech', 'Target Circle', 'Clubcard', 'Costco Membership', 'Carrefour Pass', 'JD Plus', 'Apple One', 'Nike Membership', 'Zara Membership', 'Lululemon Membership', 'Samsung Members', 'Sony Rewards'],
        // Add more attributes as needed
    },
    UserReviews: {
        username: ['user123', 'reviewer456', 'customer789', 'techFanatic', 'gadgetExplorer', 'digitalNomad', 'gamingPro', 'fashionGeek', 'musicLover', 'movieBuff', 'bookWorm', 'fitnessEnthusiast', 'photographyJunkie', 'travelAdventurer', 'foodie'],
        rating: ['5', '4', '3', '5', '4', '3', '5', '4', '3', '5', '4', '3', '5', '4', '3'],
        date_of_review: ['2023-01-01', '2023-02-15', '2023-03-10', '2023-04-20', '2023-05-05', '2023-06-30', '2023-07-12', '2023-08-25', '2023-09-18', '2023-10-03', '2023-11-22', '2023-12-08', '2024-01-14', '2024-02-29', '2024-03-22'],
        product_reviewed_id: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        review_text: ['Amazing product! Definitely recommend it!', 'Good value for money. Does the job well.', 'Not bad, but could be better.', 'Outstanding performance and design.', 'Satisfied with the purchase. No complaints.', 'Average product. Nothing special.', 'Top-notch quality. Impressed!', 'Decent features, but a bit pricey.', 'Met my expectations. Happy with it.', 'Must-have gadget for tech enthusiasts.', 'Could improve in terms of battery life.', 'Fashion-forward design. Love it!', 'Great for photography enthusiasts.', 'Perfect for travel. Lightweight and durable.', 'Delicious! Will order again.'],
        helpful_votes: ['20', '15', '10', '25', '18', '12', '30', '22', '17', '28', '21', '14', '35', '27', '19'],
        verified_purchase: ['true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true'],
        reviewer_location: ['New York', 'Los Angeles', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Toronto', 'Singapore', 'Dubai', 'Mumbai', 'Rio de Janeiro', 'Johannesburg', 'Mexico City', 'Rome'],
        reviewer_age_group: ['18-25', '26-35', '36-45', '46-55', '56+', '18-25', '26-35', '36-45', '46-55', '56+', '18-25', '26-35', '36-45', '46-55', '56+'],
        purchase_date: ['2023-01-01', '2023-02-15', '2023-03-10', '2023-04-20', '2023-05-05', '2023-06-30', '2023-07-12', '2023-08-25', '2023-09-18', '2023-10-03', '2023-11-22', '2023-12-08', '2024-01-14', '2024-02-29', '2024-03-22'],
        pros: ['Fast performance', 'Sleek design', 'Affordable price', 'High-quality camera', 'Responsive touchscreen', 'Long battery life', 'Excellent build quality', 'Intuitive user interface', 'Great sound quality', 'Versatile features', 'Large storage capacity', 'Comfortable fit', 'Impressive display', 'Compact and portable', 'Delicious taste'],
        cons: ['Limited storage space', 'Heavy and bulky', 'Expensive', 'Average battery life', 'Lack of customization options', 'Fragile construction', 'Slow processing speed', 'Complex menu system', 'Poor low-light camera performance', 'Limited app availability', 'Noisy fan', 'Uncomfortable to wear for long periods', 'Glare in bright sunlight', 'Prone to scratches', 'High calorie content'],
        image_url: ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8', 'url9', 'url10', 'url11', 'url12', 'url13', 'url14', 'url15'],
        video_url: ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8', 'url9', 'url10', 'url11', 'url12', 'url13', 'url14', 'url15'],
        recommended: ['true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true', 'true', 'false', 'true'],
        // Add more attributes as needed
    },
    TechnologyCountry: {
        technology_id:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        country_id: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    },
    RetailerTechnology: {
        retailer_id: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        technology_id:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    },
};

const generateMockData = (entity, numRecords) => {
    const mockData = [];
  
    for (let i = 1; i <= numRecords; i++) {
      const record = {};
  
      for (const attribute in predefinedValues[entity]) {
        const values = predefinedValues[entity][attribute];
        const randomIndex = Math.floor(Math.random() * values.length);
        record[attribute] = values[randomIndex];
      }
  
      mockData.push(record);
    }
  
    return mockData;
};
  
//Generate mock data for each entity
  const numRecords = 15;
  
  const countryMockData = generateMockData('Country', numRecords);
  const technologyMockData = generateMockData('Technology', numRecords);
  const manufacturerMockData = generateMockData('Manufacturer', numRecords);
  const retailerMockData = generateMockData('Retailer', numRecords);
  const userReviewsMockData = generateMockData('UserReviews', numRecords);
  const technologyCountryMockData = generateMockData('TechnologyCountry', numRecords);
  const retailerTechnologyMockData = generateMockData('RetailerTechnology', numRecords);
  
  const db = new sqlite3.Database('search-app.db');
// Function to insert mock data into the specified table
/*const insertMockData = (tableName, mockData) => {
  const columns = Object.keys(mockData);
  const values = columns.map(column => `"${mockData[column]}"`).join(', ');

  const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values});`;

  db.run(query, (err) => {
    if (err) {
      console.error(`Error inserting data into ${tableName}:`, err.message);
    } else {
      console.log(`Successfully inserted data into ${tableName}.`);
    }
  });
};*/

const insertMockData = (tableName, mockData) => {
    const columns = Object.keys(mockData[0]);
    console.log(columns);
  
    // Assuming that all arrays in mockData have the same length
    const numRecords = mockData.length;
    //console.log(`Number of Records: ${numRecords}`);

    console.log(`Generated Mock Data for ${tableName}:`, mockData);
    const insertPromises = [];
  
    for (let i = 0; i < numRecords; i++) {
        const values = columns.map(column => mockData[i][column]);
    console.log(`Values: ${values}`);
    const placeholders = columns.map(() => '?').join(', ');
    /*const placeholders = values.map((value) => {
        // Check if the value is a string, and add single quotes accordingly
        return typeof value === 'string' && isNaN(value) ? `'${value}'` : value;
      }).join(', ');*/
      //console.log(`Placeholders: ${placeholders}`);
      const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders});`;
        
        // Log the current record details
        //console.log(`Inserting into ${tableName}:`, values);
        console.log('Query:', query);

      const insertPromise = new Promise((resolve, reject) => {
        db.run(query, values, (err) => {
          if (err) {
            console.error(`Error inserting data into ${tableName}:`, err.message);
            reject(err);
          } else {
            console.log(`Successfully inserted data into ${tableName}.`);
            resolve();
          }
        });
        });
        insertPromises.push(insertPromise);
    }
    return Promise.all(insertPromises);
};

// Insert mock data for the 'Country' entity
//mockCountryEntries.forEach(mockData => insertMockData('Country', countryMockData));

insertMockData('Country', countryMockData);
insertMockData('Technology', technologyMockData);
insertMockData('Manufacturer', manufacturerMockData);
insertMockData('Retailer', retailerMockData);
insertMockData('UserReviews', userReviewsMockData);
insertMockData('TechnologyCountry', technologyCountryMockData);
insertMockData('RetailerTechnology', retailerTechnologyMockData)
.then(() => {
    // Do something after all inserts are completed
    console.log("All insert operations completed.");
  })
  .catch((err) => {
    console.error("Error during insert operations:", err.message);
});

// Close the database connection when done
db.close((err) => {
    if (err) {
      return console.error("Error closing the database connection:", err.message);
    }
    console.log("Database connection closed.");
});
