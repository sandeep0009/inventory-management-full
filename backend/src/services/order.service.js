import CustomError from "../errors/customError.js";
import orders from "../models/order.model.js"
export class OrderService {

    static async AddOrderService(user,body) {
        await orders.create({
            user,
            consumer: body.user,
            items: body.items
        })

        return {
            msg: "Order Created Successfully"
        }
    }

    static async GetAllOrdersService(user,page=1,query) {
      
        
        const limit = 10;
        const skip = (Number(page) - 1) * limit;
        
        const queries = {
            user,
            items: {
                $elemMatch: {
                    name: { $regex: query, $options: 'i' }
                }
            }
        }
        
        const orderdata = await orders.find(queries).populate("consumer", "name email").sort({"createdAt": -1}).skip(skip).limit(limit);
       
        
        const document = await orders.countDocuments(queries);
        
        const more = skip + limit < document;
        
        return {
            orderdata,
            more
        }
    }
    
    static async DeleteOrderService(user, id) {
        const existOrder = await orders.findOne({user, _id: id});
        if (!existOrder) {
            throw new CustomError(404, 'order doesnt exist');
        }
        
        await orders.findByIdAndDelete(existOrder._id);
        return {
            msg: 'Order Delete Successfully'
        }
    }
    static async getInoviceByIdService(user,id){
        console.log(user,id)
        const orderData = await orders.findOne({user, _id: id})
            .select("consumer user items createdAt")
            .populate("consumer", "name email address -_id")
            .populate("user", "name -_id");
        console.log(orderData)

        if(!orderData){
            throw new CustomError(404,"Order Not Found");
            return 
        }

        

    return orderData

    }
}

