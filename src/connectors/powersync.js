import { WASQLitePowerSyncDatabaseOpenFactory, Schema, Table, Column, ColumnType } from '@powersync/web';
import DummyConnector from './dummy';

const AppSchema = new Schema([
  new Table({
    name: "list",
    columns: [new Column({ name: "item", type: ColumnType.TEXT })],
  }),
]);

let PowerSync;

export const openDatabase = async () => {
  PowerSync = new WASQLitePowerSyncDatabaseOpenFactory({
    schema: AppSchema,
    dbFilename: 'test.sqlite'
  }).getInstance();

  console.log('connecting to database ...');
  await PowerSync.init();
  await PowerSync.connect(new DummyConnector());
  console.log('connected to database');
}

export const insertItem = async (item) => {	
  return PowerSync.execute('INSERT INTO list(id, item) VALUES(uuid(), ?)', [item]);
}

export const loadItems = async () => {
  return await PowerSync.getAll('SELECT * FROM list');
};

export const updateItem = async (id, item) => {
	  PowerSync.execute('UPDATE list SET item = ? WHERE id = ?', [item, id]);
}