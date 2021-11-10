import express from 'express'
import { loginUser, registeredUser } from '../controllers/auth.js'
import { addNft, deleteAnNft, getAllNft } from '../controllers/nfts.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/all')
  .get(getAllNft)
  .post(secureRoute, addNft)

router.route('/register')
  .post(registeredUser)

router.route('/login')
  .post(loginUser)











  
  

router.route('/all/:id')  
  .delete(secureRoute,deleteAnNft)

export default router