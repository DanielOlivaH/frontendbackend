// backend/config.js
const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '',      // pon tu password si tienes
    database: 'bdgestion',
     port: 3306, // descomenta si usas puerto distinto
    connectTimeout: 60000

  }
};

module.exports = config;
