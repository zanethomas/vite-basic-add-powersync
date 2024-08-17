import { Schema, Table, Column, ColumnType } from '@powersync/web';

export const schema = new Schema([
	new Table({
	  name: "list",
	  columns: [new Column({ name: "item", type: ColumnType.TEXT })],
	}),
 ]);