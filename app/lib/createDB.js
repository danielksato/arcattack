'use strict'

function doesDBReflectSchema (table, schemaCols) {
  const cols = Object.keys(schemaCols);
  const DBTablesinSchema = table.every((col) => {
    return cols.indexOf(col.name) >= 0;
  });
  const schemaTablesInDB = cols.every((schemaCol) => {
    return table.map((col) => col.name).indexOf(schemaCol) >= 0;
  });
  const typesMatch = table.every((tableCol) => {
    return schemaCols[tableCol.name] &&
      schemaCols[tableCol.name].includes(tableCol.type);
  });
  return DBTablesinSchema && schemaTablesInDB && typesMatch;
}

module.exports = function (schema, db) {
  const tables = Object.keys(schema).map((key) => {
    return {name: key, cols: schema[key]}
  });
  tables.forEach((table) => {
    // table names can't be params - this is a SQLite bug
    db.all(`PRAGMA table_info(${table.name})`, [], (err, res) => {
      if (err) return console.log(err);
      if (!doesDBReflectSchema(res, table.cols)) {
        db.run(`DROP TABLE ${table.name}`, (err) => {
          err && console.log(err);
          const cols = Object.keys(table.cols).map((col) => {
            return `${col} ${table.cols[col]}`;
          }).join(',');
          db.run(`CREATE TABLE ${table.name} (${cols})`, (err) => {
            err && console.log(err);
          });
        });
      } else console.log('DB and Schema are the same');
    });
  });
};