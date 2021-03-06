import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            license_plate,
            daily_rate,
            brand,
            category_id,
            fine_amount,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);
        const car = await createCarUseCase.execute({
            name,
            description,
            license_plate,
            daily_rate,
            category_id,
            brand,
            fine_amount,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
