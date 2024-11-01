import { check } from 'express-validator'
import PromiseRouter from 'express-promise-router'

import { handle as healthHandle } from './api/health'

const router = PromiseRouter()

router.post('/health', [check('message').exists()], healthHandle)

export default router
