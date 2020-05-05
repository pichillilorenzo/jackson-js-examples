import { JsonProperty, JsonClassType,
  JsonIgnoreProperties, JsonManagedReference, JsonCreator, JsonCreatorMode, JsonGetter } from 'jackson-js';
import { Book } from './Book';
import Sequelize from 'sequelize';

@JsonIgnoreProperties({value: ['sequelize', 'isNewRecord', '_options', '_changed',
  '_modelOptions', '_previousDataValues', 'dataValues']})
export class Writer extends Sequelize.Model {
  @JsonProperty()
  id: number;
  @JsonProperty()
  firstname: string;
  @JsonProperty()
  lastname: string;
  @JsonProperty()
  biography: string;
  @JsonProperty()
  image: string;

  @JsonProperty()
  @JsonClassType({type: () => [Array, [Book]]})
  @JsonManagedReference({contextGroups: ['writerContextApi']})
  @JsonIgnoreProperties({value: ['writer'], contextGroups: ['bookContextApi']})
  books: Book[] = [];

  static init(sequelize) {
    // @ts-ignore
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        biography: Sequelize.STRING,
        image: Sequelize.STRING,
      },
      {sequelize}
    );
  }

  static associate() {
    this.hasMany(Book, {
      foreignKey: 'writerId',
      as: 'books'
    });
  }

  @JsonCreator({mode: JsonCreatorMode.DELEGATING})
  static buildFromJson(writer: Writer) {
    return Writer.build(writer, {
      include: [{
        all: true
      }]
    });
  }

  @JsonProperty()
  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @JsonGetter()
  getBooks(): Array<Book> {
    return (this.get() as Writer).books;
  }
}
