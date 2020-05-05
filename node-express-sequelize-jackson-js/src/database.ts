import { Book } from './models/Book';
import { Writer } from './models/Writer';
import faker = require('faker');

const Sequelize = require('sequelize');

export const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory:'
});

export const initDB = async () => {
  Book.init(sequelize);
  Writer.init(sequelize);
  Book.associate();
  Writer.associate();

  await sequelize.sync({ force: true });

  for (let i = 1; i < 30; i++) {
    const books: Book[] = [];
    for (let j = 1; j < 5; j++) {
      const book: Book = await Book.create({
        title: faker.commerce.productName(),
        cover: 'https://picsum.photos/640/480?random=' + faker.random.number(),
        price: faker.random.number(100)
      });
      books.push(book);
    }
    const writer: Writer = await Writer.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      image: 'https://picsum.photos/640/480?random=' + faker.random.number(),
      biography: faker.lorem.sentence()
    });
    // @ts-ignore
    writer.addBooks(books);
    await writer.save();
  }
};
