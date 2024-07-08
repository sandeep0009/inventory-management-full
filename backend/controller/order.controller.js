import { OrderService } from "../services/order.service.js"
import { CatchAsync } from "../utils/catchSync.js"

class OrderController{

    static OrderAdd=CatchAsync(async(req,res)=>{
        const orderData=await OrderService.AddOrderService(req.user,req.body);
        return res.status(201).json(orderData)
    })

    static GetAllOrdersController=CatchAsync(async(req,res)=>{
      
        const orderData=await OrderService.GetAllOrdersService(req?.user,req.query?.page,req.query?.query);
        return res.status(200).json(orderData);
    })

    static DeleteOrderController=CatchAsync(async(req,res)=>{
        const orderData=await OrderService.DeleteOrderService(req?.user,req?.params?.id);
        return res.status(201).json(orderData)
    })

    static GetInvoiceOrderController=CatchAsync(async(req,res)=>{
        console.log(req.params.id)
        const orderData=await OrderService.getInoviceByIdService(req?.user,req?.params?.id);
        return res.status(201).json(orderData);
    })

}

export default OrderController