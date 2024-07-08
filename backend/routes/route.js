import { Router } from 'express';
import { vaildateMiddleWare } from '../middleware/auth.middleware.js';
import ConsumerController from '../controller/consumer.controller.js';
import OrderController from '../controller/order.controller.js';
import UserController from '../controller/user.controller.js';

const router = Router();

router.post('/register',UserController.RegisterUser)
router.post('/login',UserController.LoginUser)
router.get('/profile',vaildateMiddleWare,UserController.ProfileUser)


router.post('/consumer',vaildateMiddleWare,ConsumerController.ConsumerRegister);
router.get('/get-all-consumers',vaildateMiddleWare,ConsumerController.GetAllConsumer)
router.get('/get-consumer-byId/:id',vaildateMiddleWare,ConsumerController.GetConsumerById)
router.delete('/delete-consumer/:id',vaildateMiddleWare,ConsumerController.DeleteConsumer);
router.put('/update-consumer/:id',vaildateMiddleWare,ConsumerController.UpdateConsumer);
router.get('/get-search-user',vaildateMiddleWare,ConsumerController.GetAllSearchConsumer);
router.get('/',vaildateMiddleWare,ConsumerController.DashboardData)

router.post('/create-order',vaildateMiddleWare,OrderController.OrderAdd);
router.get('/get-all-order',vaildateMiddleWare,OrderController.GetAllOrdersController);
router.delete('/delete-order/:id',vaildateMiddleWare,OrderController.DeleteOrderController);
router.get('/get-order-invoice/:id',vaildateMiddleWare,OrderController.GetInvoiceOrderController);

export default router;
