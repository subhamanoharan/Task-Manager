'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`insert into users (name, password, role_id) values
    ('admin', crypt('admin', gen_salt('bf')), 1),
    ('user1', crypt('user1', gen_salt('bf')), 2);
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
