import { check } from 'express-validator'
import PromiseRouter from 'express-promise-router'

import { handle as healthHandle } from './api/health'
import { handle as publicHandle } from './api/public'
import { handle as privateHandle } from './api/private'
import { handle as adminHandle } from './api/admin'
import { verifyAuthToken } from './middleware/verify-auth-token'
import { hasAdminRole } from './middleware/has-admin-role'

const router = PromiseRouter()

router.post('/health', [check('message').exists()], healthHandle)

router.get('/public', publicHandle)
router.get('/private', [verifyAuthToken], privateHandle)
router.get('/admin', [verifyAuthToken, hasAdminRole], adminHandle)

export default router
