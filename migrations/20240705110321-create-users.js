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
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: {type: 'string', notNull: true, unique: true},
    password: {type: 'string', notNull: true},
    role_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'role_id_fk',
        table: 'roles',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION'
        }
      }
    }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
