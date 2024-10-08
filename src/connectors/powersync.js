import { PowerSyncDatabase } from '@powersync/web';
import DummyConnector from './dummy';

export let PowerSync;


export const connect = async (schema, filename) => {
  PowerSync = new PowerSyncDatabase({
    schema,
    database: {
      dbFilename: filename
    }
  })

  console.log('connecting to powersync ...');
  await PowerSync.init();
  await PowerSync.connect(new DummyConnector());
  console.log('connected to powersync');
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

export const deleteItem = async (id) => {
  PowerSync.execute('DELETE FROM list WHERE id = ?', [id]);
}

export const deleteAllItems = async () => {
  PowerSync.execute('DELETE FROM list');
}
