import { Book } from './Book.model';
import Sequelize from 'sequelize';
export declare class Writer extends Sequelize.Model {
    id: number;
    name: string;
    books: Book[];
    static init(sequelize: any): any;
    static associate(): void;
}
