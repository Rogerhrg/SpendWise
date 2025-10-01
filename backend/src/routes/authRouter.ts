import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthControllers";

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('email')
        .isEmail().withMessage('El email no es válido'),
    body('password')
        .isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres'),
    handleInputErrors,
    AuthController.createAccount)
    

export default router