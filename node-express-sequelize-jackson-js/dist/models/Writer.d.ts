import { Book } from './Book';
import Sequelize from 'sequelize';
export declare class Writer extends Sequelize.Model {
    id: number;
    firstname: string;
    lastname: string;
    biography: string;
    image: string;
    books: Book[];
    static init(sequelize: any): any;
    static associate(): void;
    static buildFromJson(writer: Writer): Writer;
    get fullname(): string;
    getBooks(): Array<Book>;
}
