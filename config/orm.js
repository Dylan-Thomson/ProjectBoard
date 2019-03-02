const connection = require('./connection');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  const arr = [];

  for (const key in obj) {
    let value = obj[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(`${key}=${value}`);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
  selectAll: (table, callback) => {
    connection.query('SELECT * FROM ??', table, (err, result) => {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  selectOne: (table, condition, callback) => {
    let queryString = 'SELECT * FROM ';
    queryString += table;
    queryString += ' WHERE ';
    queryString += condition;
    console.log(queryString);

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  insertOne: (table, cols, vals, callback) => {
    let queryString = `INSERT INTO ${table}`;
    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  updateOne: (table, objColVals, condition, callback) => {
    let queryString = `UPDATE ${table}`;
    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString);


    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
};

module.exports = orm;
