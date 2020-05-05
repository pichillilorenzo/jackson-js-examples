import { Book } from './Book';
import { Model } from 'sequelize-typescript';
export declare class Writer extends Model<Writer> {
    id: number;
    name: string;
    books: Book[];
    constructor(id: number, name: string);
}
