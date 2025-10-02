import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthControllers";
import { limiter } from "../config/limiter";

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
router.post('/confirm-account',
    limiter,
    body('token')
        .notEmpty().isLength({ min: 6, max:6 }).withMessage('El token no es válido'),
    handleInputErrors,
    AuthController.confirmAccount)    

export default router