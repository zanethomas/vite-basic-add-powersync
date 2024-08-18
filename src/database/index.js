import { connect, PowerSync } from '@/connectors/powersync';
import {schema} from './schema';

export const openDatabase = async () => {
	await connect(schema, 'add-powersync.sqlite');
}

export const insertItem = async (item) => {
  return PowerSync.execute("INSERT INTO list(id, item) VALUES(uuid(), ?) RETURNING *", [item]);
}

export const loadItems = async () => {
  return PowerSync.getAll('SELECT * FROM list');
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
