import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IListAvailableCarsDTO from '../../dtos/IListAvailableCarsDTO';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } =
            request.query as IListAvailableCarsDTO;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        const availableCars = await listAvailableCarsUseCase.execute({
            brand,
            name,
            category_id,
        });

        return response.status(200).json(availableCars);
    }
}

export { ListAvailableCarsController };
