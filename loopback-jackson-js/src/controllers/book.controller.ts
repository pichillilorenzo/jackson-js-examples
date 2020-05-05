import {intercept} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Book} from '../models';
import {BookRepository} from '../repositories';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) {}

  @intercept('object-mapper')
  @post('/books', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBook',
            exclude: ['id'],
          }),
        },
      },
    })
    book: Omit<Book, 'id'>,
  ): Promise<Book> {
    return this.bookRepository.create(book);
  }

  @get('/books/count', {
    responses: {
      '200': {
        description: 'Book model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.count(where);
  }

  @intercept('object-mapper')
  @get('/books', {
    responses: {
      '200': {
        description: 'Array of Book model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Book, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Book) filter?: Filter<Book>,
  ): Promise<Book[]> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'writer'
          }
        ]
      };
    }
    return this.bookRepository.find(filter);
  }

  @intercept('object-mapper')
  @get('/books/public', {
    responses: {
      '200': {
        description: 'Array of Book model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Book, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findAllPublic(
    @param.filter(Book) filter?: Filter<Book>,
  ): Promise<Book[]> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'writer'
          }
        ]
      };
    }
    return this.bookRepository.find(filter);
  }

  @intercept('object-mapper')
  @patch('/books', {
    responses: {
      '200': {
        description: 'Book PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    return this.bookRepository.updateAll(book, where);
  }

  @intercept('object-mapper')
  @get('/books/{id}', {
    responses: {
      '200': {
        description: 'Book model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Book, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Book, {exclude: 'where'}) filter?: FilterExcludingWhere<Book>
  ): Promise<Book> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'writer'
          }
        ]
      };
    }
    return this.bookRepository.findById(id, filter);
  }

  @intercept('object-mapper')
  @patch('/books/{id}', {
    responses: {
      '204': {
        description: 'Book PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
  ): Promise<void> {
    await this.bookRepository.updateById(id, book);
  }

  @intercept('object-mapper')
  @put('/books/{id}', {
    responses: {
      '204': {
        description: 'Book PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() book: Book,
  ): Promise<void> {
    await this.bookRepository.replaceById(id, book);
  }

  @del('/books/{id}', {
    responses: {
      '204': {
        description: 'Book DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookRepository.deleteById(id);
  }
}
