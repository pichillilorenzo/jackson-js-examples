import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Writer, WriterRelations, Book} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BookRepository} from './book.repository';

export class WriterRepository extends DefaultCrudRepository<
  Writer,
  typeof Writer.prototype.id,
  WriterRelations
> {

  public readonly books: HasManyRepositoryFactory<Book, typeof Writer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Writer, dataSource);
    this.books = this.createHasManyRepositoryFactoryFor('books', bookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
