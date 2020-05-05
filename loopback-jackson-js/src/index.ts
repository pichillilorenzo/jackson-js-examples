import {ApplicationConfig} from '@loopback/core';
import {LoopbackJacksonJsTestApplication} from './application';
import {ObjectMapperInterceptor} from './interceptors';
import {Book, Writer} from './models';
import {WriterRepository} from './repositories';
import faker = require('faker');

export {LoopbackJacksonJsTestApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LoopbackJacksonJsTestApplication(options);
  app.bind('object-mapper').toProvider(ObjectMapperInterceptor);
  await app.boot();
  await app.start();

  await initDB(app);

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

export const initDB = async (app: LoopbackJacksonJsTestApplication) => {
  const writerRepository = await app.getRepository(WriterRepository);

  for (let i = 1; i < 30; i++) {
    let writer = new Writer();
    writer.firstname = faker.name.firstName();
    writer.lastname = faker.name.lastName();
    writer.image = 'https://picsum.photos/640/480?random=' + faker.random.number();
    writer.biography = faker.lorem.sentence();
    writer = await writerRepository.create(writer);
    console.log(writer);
    for (let j = 1; j < 5; j++) {
      let book = new Book();
      book.title = faker.commerce.productName();
      book.cover = 'https://picsum.photos/640/480?random=' + faker.random.number();
      book.price = faker.random.number(100);
      book.writerId = writer.id;
      book = await writerRepository.books(writer.id).create(book);
      console.log(book);
    }
  }
};
