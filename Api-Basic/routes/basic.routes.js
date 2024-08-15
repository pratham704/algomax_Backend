import express from "express";
import * as controller from '../controllers/basic.controller.js'

const router = express.Router()

router.get('/', controller.getData)
router.post('/', controller.postData)


export default router;