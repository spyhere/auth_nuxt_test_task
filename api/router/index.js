import PromiseRouter from 'express-promise-router';
import authRoutes from './auth/index';
import usersRoutes from './users/index';

const router = PromiseRouter();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);


export default router;
