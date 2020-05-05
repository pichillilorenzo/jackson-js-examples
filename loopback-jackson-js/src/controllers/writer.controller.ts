import {intercept} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Writer} from '../models';
import {WriterRepository} from '../repositories';

export class WriterController {
  constructor(
    @repository(WriterRepository)
    public writerRepository: WriterRepository,
  ) {}

  @intercept('object-mapper')
  @post('/writers', {
    responses: {
      '200': {
        description: 'Writer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Writer)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Writer, {
            title: 'NewWriter',
            exclude: ['id'],
          }),
        },
      },
    })
    writer: Omit<Writer, 'id'>,
  ): Promise<Writer> {
    const books = writer.books;
    delete writer.books;
    const writerSaved: Writer = await this.writerRepository.create(writer);
    writerSaved.books = [];
    for (const book of books) {
      writerSaved.books.push(await this.writerRepository.books(writerSaved.id).create(book));
    }
    return writerSaved;
  }

  @get('/writers/count', {
    responses: {
      '200': {
        description: 'Writer model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Writer) where?: Where<Writer>,
  ): Promise<Count> {
    return this.writerRepository.count(where);
  }

  @intercept('object-mapper')
  @get('/writers', {
    responses: {
      '200': {
        description: 'Array of Writer model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Writer, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Writer) filter?: Filter<Writer>,
  ): Promise<Writer[]> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'books'
          }
        ]
      };
    }
    return this.writerRepository.find(filter);
  }

  @intercept('object-mapper')
  @get('/writers/public', {
    responses: {
      '200': {
        description: 'Array of Writer model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Writer, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findAllPublic(
    @param.filter(Writer) filter?: Filter<Writer>,
  ): Promise<Writer[]> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'books'
          }
        ]
      };
    }
    return this.writerRepository.find(filter);
  }

  @intercept('object-mapper')
  @patch('/writers', {
    responses: {
      '200': {
        description: 'Writer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Writer, {partial: true}),
        },
      },
    })
    writer: Writer,
    @param.where(Writer) where?: Where<Writer>,
  ): Promise<Count> {
    return this.writerRepository.updateAll(writer, where);
  }

  @intercept('object-mapper')
  @get('/writers/{id}', {
    responses: {
      '200': {
        description: 'Writer model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Writer, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Writer, {exclude: 'where'}) filter?: FilterExcludingWhere<Writer>
  ): Promise<Writer> {
    if (filter == null) {
      filter = {
        include: [
          {
            relation: 'books'
          }
        ]
      };
    }
    return this.writerRepository.findById(id, filter);
  }

  @intercept('object-mapper')
  @patch('/writers/{id}', {
    responses: {
      '204': {
        description: 'Writer PATCH success',
      },
    },
  })
  async updateById(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Writer, {partial: true}),
        },
      },
    })
    writer: Writer,
    @param.path.number('id') id: number
  ): Promise<void> {
    await this.writerRepository.updateById(id, writer);
  }

  @intercept('object-mapper')
  @put('/writers/{id}', {
    responses: {
      '204': {
        description: 'Writer PUT success',
      },
    },
  })
  async replaceById(
    @requestBody() writer: Writer,
    @param.path.number('id') id: number
  ): Promise<void> {
    await this.writerRepository.replaceById(id, writer);
  }

  @del('/writers/{id}', {
    responses: {
      '204': {
        description: 'Writer DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.writerRepository.deleteById(id);
  }
}
