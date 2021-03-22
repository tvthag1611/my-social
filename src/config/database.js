const db = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  db: process.env.MYSQL_DATABASE,
  root_password: process.env.MYSQL_ROOT_PASSWORD,
  user_name: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
};

module.exports = {
  db,
  api_port: process.env.API_PORT || 3001,
  jwt_secret: process.env.JWT_SECRET,
};
