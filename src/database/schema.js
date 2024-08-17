import { Schema, Table, Column, ColumnType } from '@powersync/web';

export const AppSchema = new Schema([
	new Table({
	  name: "list",
	  columns: [new Column({ name: "item", type: ColumnType.TEXT })],
	}),
 ]);