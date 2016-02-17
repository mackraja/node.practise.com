//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/dummy';
//var connectionString = "pg://postgres:postgres@localhost:5432/dummy";

var connectionString = {
	    host: '',			 				// server name or IP address;
	    port: 5432,							// port
	    database: '',						// database name
	    user: '',							// user name 
	    password: ''						// password
	};

module.exports = connectionString;