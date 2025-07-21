import express from "express"
import { getMessage, sendMessage } from "../controllers/messageController.js"
import { isAuthencatied } from "../middleware/isAuthencatied.js"
const router=express.Router()

// router.route('/send/:id').post(isAuthencatied,sendMessage)
// router.route('/get/:id').get(isAuthencatied,getMessage)
// router.route('/:id').post(isAuthencatied, sendMessage); // send a message
// router.route('/:id').get(isAuthencatied, getMessage);   // get messages
router.route('/send/:id').post(isAuthencatied, sendMessage);
router.route('/get/:id').get(isAuthencatied, getMessage);

export default router
