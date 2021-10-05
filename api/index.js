import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import router from './router';


const app = express()

export const usersList = [
  {email: 'john@doe.com', password: '123', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe1.com', password: '1233', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe2.com', password: '1234', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe3.com', password: '1235', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe4.com', password: '1236', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe5.com', password: '1237', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe6.com', password: '1238', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe7.com', password: '12301', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe8.com', password: '12312', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe9.com', password: '123123', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe10.com', password: '123323', picture: 'https://github.com/nuxt.png', name: "John"},
  {email: 'john@doe11.com', password: '12334343', picture: 'https://github.com/nuxt.png', name: "John"},
];


// JWT middleware
app.use(
  jwt({
    secret: 'dummy',
    algorithms: ['sha1', 'RS256', 'HS256']
  }).unless({
    path: ['/api/auth/login', '/api/auth/refresh']
  })
)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(router);


// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '');
});


export default {
  path: '/api',
  handler: app
}
