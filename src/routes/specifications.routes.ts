import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRouter = Router();

// const specificationsRepository = new SpecificationsRepository();
const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post('/', createSpecificationController.handle);

// specificationsRouter.get('/', (request, response) => {
//     const specifications = specificationsRepository.index();
//     return response.status(200).json(specifications);
// });

export { specificationsRouter };
