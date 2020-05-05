import { JsonProperty, JsonClassType, JsonIgnoreProperties, JsonBackReference,
  JsonView, JsonFormat, JsonFormatShape, JsonCreator, JsonCreatorMode, JsonGetter } from 'jackson-js';
import { Writer } from './Writer';
import Sequelize from 'sequelize';
import { ProfileViews } from '../views';

@JsonIgnoreProperties({value: ['writerId', 'sequelize',  'isNewRecord', '_options',
  '_changed', '_modelOptions', '_previousDataValues', 'dataValues']})
export class Book extends Sequelize.Model {
  @JsonProperty()
  id: number;
  @JsonProperty()
  title: string;
  @JsonProperty()
  cover: string;

  @JsonProperty()
  @JsonClassType({type: () => [Writer]})
  @JsonBackReference({contextGroups: ['writerContextApi']})
  writer: Writer;

  @JsonProperty()
  @JsonView({value: () => [ProfileViews.registered]})
  @JsonFormat({shape: JsonFormatShape.STRING, toFixed: 2})
  price: number;

  static init(sequelize) {
    // @ts-ignore
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: Sequelize.STRING,
        cover: Sequelize.STRING,
        price: Sequelize.FLOAT
      },
      {sequelize}
    );
  }

  @JsonCreator({mode: JsonCreatorMode.DELEGATING})
  static buildFromJson(book: Book) {
    return Book.build(book, {
      include: [{
        all: true
      }]
    });
  }

  static associate() {
    this.belongsTo(Writer, {
      foreignKey: 'writerId',
      as: 'writer'
    });
  }

  @JsonGetter()
  getWriter(): Writer {
    return (this.get() as Book).writer;
  }
}
