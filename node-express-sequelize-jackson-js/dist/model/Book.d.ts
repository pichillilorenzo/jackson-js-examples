import { Writer } from './Writer';
import { Model } from 'sequelize-typescript';
export declare class Book extends Model<Book> {
    id: number;
    name: string;
    date: Date;
    writer: Writer;
    constructor(id: number, name: string, date: Date, writer: Writer);
}
