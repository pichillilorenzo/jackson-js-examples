import { Writer } from './Writer';
import Sequelize from 'sequelize';
export declare class Book extends Sequelize.Model {
    id: number;
    title: string;
    cover: string;
    writer: Writer;
    price: number;
    static init(sequelize: any): any;
    static buildFromJson(book: Book): Book;
    static associate(): void;
    getWriter(): Writer;
}
