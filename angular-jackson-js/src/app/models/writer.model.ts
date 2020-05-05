import { JsonProperty, JsonClassType, JsonIdentityInfo, ObjectIdGenerator, JsonIgnoreProperties, JsonManagedReference } from 'jackson-js';
import { Book } from './book.model';

export class Writer {
  @JsonProperty()
  id: number;
  @JsonProperty()
  firstname: string;
  @JsonProperty()
  lastname: string;
  @JsonProperty()
  image: string;
  @JsonProperty()
  biography: string;

  @JsonProperty()
  @JsonClassType({type: () => [Array, [Book]]})
  @JsonManagedReference()
  books: Book[] = [];

  @JsonProperty()
  @JsonClassType({type: () => [Date]})
  createdAt: Date;
  @JsonProperty()
  @JsonClassType({type: () => [Date]})
  updatedAt: Date;

  @JsonProperty()
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
