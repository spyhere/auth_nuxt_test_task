import { usersList } from '../../index';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.get('/', (req, res) => {
  const users = usersList.map(u => {const {password, ...rest} = u; return rest});
  res.json({users});
});

export default router;
