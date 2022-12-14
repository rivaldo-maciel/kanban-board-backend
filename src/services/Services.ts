import {
  DataSource,
  EntityTarget,
  Repository,
  FindOneOptions,
  DeleteResult,
  UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { z, ZodRawShape } from 'zod';
import NotFoundError from '../errors/NotFoundError';
import IServices from './interfaces/IServices';

abstract class Services<T, U = void> implements IServices<T> {
  private dataSource: DataSource;
  protected repository: Repository<T>;
  protected _schema: z.ZodObject<ZodRawShape>;
  protected repositorySupport: Repository<U>;

  constructor(
    dataSource: DataSource,
    model: EntityTarget<T>,
    schema: z.ZodObject<ZodRawShape>,
    modelSupport?: EntityTarget<U>
  ) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(model);
    this._schema = schema;
    if (modelSupport) {
      this.repositorySupport = this.dataSource.getRepository(modelSupport);
    }
  }

  public abstract create(entity: T, userId: number | null): Promise<T>;

  public abstract getAll(): Promise<T[]>;

  public abstract update(
    id: number,
    alteration: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult>;

  public abstract remove(id: number): Promise<DeleteResult>;

  public async checkExistence(id: number): Promise<void> {
    const user = await this.repository.findOne({
      where: { id }
    } as FindOneOptions);
    if (!user) throw new NotFoundError();
  }

  get schema() {
    return this._schema;
  }
}

export default Services;
