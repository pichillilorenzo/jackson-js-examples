import { Writer } from './Writer.model';
import Sequelize from 'sequelize';
export declare class Book extends Sequelize.Model {
    id: number;
    name: string;
    writer: Writer;
    static init(sequelize: any): any;
    static associate(): void;
}
