import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
);

export { categoriesRouter };
