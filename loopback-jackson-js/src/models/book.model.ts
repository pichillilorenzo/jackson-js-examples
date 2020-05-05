import {belongsTo, Entity, model, property} from '@loopback/repository';
import {JsonBackReference, JsonClassType, JsonFormat, JsonFormatShape, JsonIgnore, JsonProperty, JsonView} from 'jackson-js';
import {Writer, WriterWithRelations} from '.';
import {ProfileViews} from '../views';

@model({settings: {strict: false}})
export class Book extends Entity {
  // Define well-known properties here
  @property({type: 'number', id: true, generated: false})
  @JsonProperty()
  id: number;

  @property({type: 'string', required: true})
  @JsonProperty()
  title: string;

  @property({type: 'string', required: true})
  @JsonProperty()
  cover: string;

  @property({type: 'number', required: true})
  @JsonProperty()
  @JsonView({value: () => [ProfileViews.registered]})
  @JsonFormat({shape: JsonFormatShape.STRING, toFixed: 2})
  price: number;

  @JsonProperty()
  @JsonClassType({type: () => [Writer]})
  @JsonBackReference({contextGroups: ['writerContextApi']})
  writer: Writer;

  @JsonIgnore()
  @belongsTo(() => Writer)
  writerId: number;

  constructor(data?: Partial<Book>) {
    super(data);
  }

  getId() {
    return this.id;
  }
}

export interface BookRelations {
  // describe navigational properties here
  writer: WriterWithRelations;
}

export type BookWithRelations = Book & BookRelations;
