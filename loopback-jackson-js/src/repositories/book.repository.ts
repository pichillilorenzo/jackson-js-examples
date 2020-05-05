import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Book, BookRelations, Writer} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WriterRepository} from './writer.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
> {

  public readonly writer: BelongsToAccessor<Writer, typeof Book.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WriterRepository') protected writerRepositoryGetter: Getter<WriterRepository>,
  ) {
    super(Book, dataSource);
    this.writer = this.createBelongsToAccessorFor('writer', writerRepositoryGetter,);
    this.registerInclusionResolver('writer', this.writer.inclusionResolver);
  }
}
