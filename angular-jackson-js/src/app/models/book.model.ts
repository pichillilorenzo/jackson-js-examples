import { JsonProperty, JsonClassType, JsonBackReference, JsonView, JsonIgnore } from 'jackson-js';
import { Writer } from './writer.model';

export class Book {
  @JsonProperty()
  id: number;
  @JsonProperty()
  title: string;
  @JsonProperty()
  cover: string;
  @JsonProperty()
  @JsonClassType({type: () => [Writer]})
  @JsonBackReference()
  writer: Writer;
  @JsonProperty()
  price: number;

  @JsonProperty()
  @JsonClassType({type: () => [Date]})
  createdAt: Date;
  @JsonProperty()
  @JsonClassType({type: () => [Date]})
  updatedAt: Date;

  @JsonIgnore()
  formattedPrice: string;

  @JsonProperty()
  setPrice(value: string) {
    this.price = parseFloat(value);
    this.formattedPrice = value;
  }

}
