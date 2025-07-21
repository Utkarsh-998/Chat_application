import express from "express"
import { register } from "../controllers/UserController.js"
import {login} from "../controllers/UserController.js"
import {logout} from "../controllers/UserController.js"
import { getOtherUser } from "../controllers/UserController.js"
import { isAuthencatied } from "../middleware/isAuthencatied.js"

const router=express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/').get(isAuthencatied,getOtherUser)


export default router