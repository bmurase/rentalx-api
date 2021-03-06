import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
    '/import',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('file'),
    importCategoryController.handle
);

export { categoriesRouter };
