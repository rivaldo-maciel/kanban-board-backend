import { NextFunction, Request, Response } from 'express';
import IServices from '../services/interfaces/IServices';
import { RequestWithUserId } from '../types/express';
import IControllers from './interfaces/IControllers';

class Controllers<T> implements IControllers {

  protected services: IServices<T>;

  constructor(services: IServices<T>) {
    this.services = services;
  }

  async create(req: RequestWithUserId, res: Response, next: NextFunction): Promise<Response> {
    try {
      const entity = req.body;
      const userId = req.userId;
      const createdEntity = await this.services.create(entity, userId);
      return res.status(201).json(createdEntity);
    } catch (e: unknown) {
      next(e);
    }
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const allEntities = await this.services.getAll();
      return res.status(200).json(allEntities);
    } catch (e: unknown) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const entity = await this.services.getOne(Number(id));
      return res.status(200).json(entity);
    } catch (e: unknown) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const alteration = req.body;
      const updateResult = await this.services.update(Number(id), alteration,);
      return res.status(200).json(updateResult);
    } catch (e: unknown) {
      next(e);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteResult = await this.services.remove(Number(id));
      return res.status(200).json(deleteResult);
    } catch (e: unknown) {
      next(e);
    }
  }

}

export default Controllers;