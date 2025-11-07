import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthControllers";
import { limiter } from "../config/limiter";
import { checkAuth} from "../middleware/auth";

const router = Router()

router.use(limiter)

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
    body('token')
        .notEmpty().isLength({ min: 6, max:6 }).withMessage('El token no es válido'),
    handleInputErrors,
    AuthController.confirmAccount)   
    
router.post('/login',
    body('email')
        .isEmail().withMessage('El email no es válido'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vacío'),
    handleInputErrors,
    AuthController.login)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    AuthController.forgotPassword)

router.post('/validate-token',
    body('token')
        .notEmpty().isLength({ min: 6, max:6 }).withMessage('El token no es válido'),
    handleInputErrors,
    AuthController.validateToken)

router.post('/reset-password/:token',
    param('token')
        .notEmpty().isLength({ min: 6, max:6 }).withMessage('El token no es válido'),
    body('password')
        .isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres'),
    handleInputErrors,
    AuthController.resetPasswordWithToken)
    
    router.get('/', checkAuth, AuthController.userProfile)
    
    router.post('/change-password', checkAuth,
        body('current_password')
            .notEmpty().withMessage('El password actual es obligatorio'),
        body('new_password')
            .notEmpty().isLength({ min: 6 }).withMessage('El nuevo password debe ser de al menos 6 caracteres'),
        handleInputErrors,
        AuthController.changePassword)

    export default router