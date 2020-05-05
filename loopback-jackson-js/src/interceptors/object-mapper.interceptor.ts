import {ContextTags, globalInterceptor, Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise} from '@loopback/context';
import {RestBindings} from '@loopback/rest';
import {JsonParser, JsonStringifier} from 'jackson-js';
import {ClassList, JsonStringifierContext} from 'jackson-js/dist/@types';
import {BookController, WriterController} from '../controllers';
import {ProfileViews} from '../views';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('object-mapper', {tags: {[ContextTags.GLOBAL_INTERCEPTOR_SOURCE]: 'ObjectMapper'}})
export class ObjectMapperInterceptor implements Provider<Interceptor> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonStringifier: JsonStringifier<any> = new JsonStringifier();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonParser: JsonParser<any> = new JsonParser();

  constructor() {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      // Add pre-invocation logic here
      const httpReq = await invocationCtx.get(RestBindings.Http.REQUEST, {optional: true});
      if (httpReq && (httpReq.method === 'POST' || httpReq.method === 'PUT' || httpReq.method === 'PATCH')) {
        const argModel = invocationCtx.args[0];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let creator: ClassList<any> = [Object];
        if (invocationCtx.target instanceof WriterController) {
          creator = [invocationCtx.target.writerRepository.entityClass];
        } else if (invocationCtx.target instanceof BookController) {
          creator = [invocationCtx.target.bookRepository.entityClass];
        }

        invocationCtx.args[0] = this.jsonParser.transform(argModel, {
          mainCreator: () => creator
        });
      }

      const result = await next();

      // Add post-invocation logic here
      if (httpReq && (httpReq.method === 'GET' || httpReq.method === 'POST')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let creator: ClassList<any> = (result != null) ? [Object] : [result.constructor];
        const mapperContext: JsonStringifierContext = {};

        if (result instanceof Array) {
          if (result.length > 0) {
            creator = [Array, [result[0].constructor]];
          } else {
            creator = [Array, [Object]];
          }
        }

        mapperContext.mainCreator = () => creator;

        if (invocationCtx.target instanceof WriterController) {
          mapperContext.withContextGroups = ['writerContextApi'];
        } else if (invocationCtx.target instanceof BookController) {
          mapperContext.withContextGroups = ['bookContextApi'];
        }

        if (httpReq.url.endsWith('/public')) {
          mapperContext.withViews = () => [ProfileViews.public];
        }

        return this.jsonStringifier.transform(result, mapperContext);
      }

      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
