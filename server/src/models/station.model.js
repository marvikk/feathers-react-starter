const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'station.db'),
    autoload: true
  });

  Model.persistence.setAutocompactionInterval(300000);

  return Model;
};
