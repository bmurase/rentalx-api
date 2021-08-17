import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post('/', (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(
        specificationsRepository
    );

    createSpecificationService.execute({ name, description });

    return response.status(201).send();
});

specificationsRouter.get('/', (request, response) => {
    const specifications = specificationsRepository.index();
    return response.status(200).json(specifications);
});

export { specificationsRouter };
