import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRouter = Router();
const specificationsRepository = SpecificationsRepository.getInstance();

specificationsRouter.post('/', createSpecificationController.handle);

specificationsRouter.get('/', (request, response) => {
    const specifications = specificationsRepository.index();
    return response.status(200).json(specifications);
});

export { specificationsRouter };
