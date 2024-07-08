import ConsumerService from "../services/consumer.service.js"
import { CatchAsync } from "../utils/catchSync.js"

class ConsumerController{

   static ConsumerRegister=CatchAsync(async(req,res)=>{
    const consumerObject=await ConsumerService.CreateConsumerService(req.user,req.body);
    return res.status(201).json({message:"created consumerr", consumerObject});
   })

   static DeleteConsumer= CatchAsync(async(req,res)=>{
    const res_obj  = await ConsumerService.DeleteConsumer(req?.user,req.params.id);
    return    res.status(200).json(res_obj)
     
})
static GetConsumerById=CatchAsync(async(req,res)=>{
    const res_obj=await ConsumerService.GetConsumerById(req?.user,req.params.id);
    return    res.status(200).json(res_obj)

    
})

static UpdateConsumer= CatchAsync(async(req,res)=>{
    const res_obj  = await ConsumerService.UpdateConsumers(req?.user,req.body,req.params.id);
    return    res.status(httpStatus.OK).json(res_obj)
     
})
static GetAllConsumer= CatchAsync(async(req,res)=>{
    const res_obj  = await ConsumerService.GetAllConsumers(req.user,req.query.page,req.query.query);
    return  res.status(200).json(res_obj)
     
})

static GetAllSearchConsumer=CatchAsync(async(req,res)=>{
    const res_obj=await ConsumerService.GetAllSearchConsumer(req.user);
    return res.status(201).json(res_obj)
})

static DashboardData=CatchAsync(async(req,res)=>{
    const dashboard_obj=await ConsumerService.ConsumerDashboard(req?.user);
    return res.status(201).json(dashboard_obj);
})



}

export default ConsumerController