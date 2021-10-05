import jsonwebtoken from 'jsonwebtoken'
import {usersList} from '../../index';
import PromiseRouter from 'express-promise-router';

const refreshTokens = {};
const router = PromiseRouter();
// [POST] /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = usersList.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const expiresIn = 15000
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1

  const accessToken = jsonwebtoken.sign(
    {
      ...user,
      scope: ['test', 'user']
    },
    'dummy',
    {
      expiresIn
    }
  );

  refreshTokens[refreshToken] = {
    accessToken,
    user
  };

  res.json({
    token: {
      accessToken,
      refreshToken
    }
  })
})

// [GET] /user
router.get('/user', (req, res) => {
  res.json({ user: req.user })
})

// [POST] /logout
router.post('/logout', (req, res) => {
  res.json({ status: 'OK' })
});

export default router;
