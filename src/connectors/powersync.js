import { PowerSyncDatabase, Schema, Table, Column, ColumnType } from '@powersync/web';
import DummyConnector from './dummy';

export const AppSchema = new Schema([
  new Table({
    name: "list",
    columns: [new Column({ name: "item", type: ColumnType.TEXT })],
  }),
]);

let PowerSync;

export const openDatabase = async () => {
  PowerSync = new PowerSyncDatabase({
    schema: AppSchema,
    dbFilename: 'test.sqlite'
  }).getInstance();

  await PowerSync.init();
  await PowerSync.connect(new DummyConnector());
}

export const insertItem = async (item) => {	
  PowerSync.execute('INSERT INTO list(item) VALUES(?)', [item]);
}

export const loadItems = async () => {
  return await PowerSync.getAll('SELECT * FROM list');
};

export const updateItem = async (id, item) => {
	  PowerSync.execute('UPDATE list SET item = ? WHERE id = ?', [item, id]);
}