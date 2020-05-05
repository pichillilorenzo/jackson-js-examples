import {Entity, hasMany, model, property} from '@loopback/repository';
import {JsonClassType, JsonIgnoreProperties, JsonManagedReference, JsonProperty} from 'jackson-js';
import {Book, BookWithRelations} from './book.model';

@model({settings: {strict: false}})
export class Writer extends Entity {
  // Define well-known properties here
  @property({type: 'number', id: true, generated: false})
  @JsonProperty()
  id: number;

  @property({type: 'string', required: true})
  @JsonProperty()
  firstname: string;

  @JsonProperty()
  @property({type: 'string', required: true})
  lastname: string;

  @property({type: 'string', required: true})
  @JsonProperty()
  biography: string;

  @property({type: 'string', required: true})
  @JsonProperty()
  image: string;

  @JsonProperty()
  @JsonClassType({type: () => [Array, [Book]]})
  @JsonManagedReference({contextGroups: ['writerContextApi']})
  @JsonIgnoreProperties({value: ['writer'], contextGroups: ['bookContextApi']})
  @hasMany(() => Book)
  books: Book[];

  constructor(data?: Partial<Writer>) {
    super(data);
  }

  getId() {
    return this.id;
  }

  @JsonProperty()
  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}

export interface WriterRelations {
  // describe navigational properties here
  books: BookWithRelations[];
}

export type WriterWithRelations = Writer & WriterRelations;
