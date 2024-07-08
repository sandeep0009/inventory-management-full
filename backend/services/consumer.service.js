import CustomError from "../errors/customError.js";
import consumers from "../models/consumer.model.js";
import orders from "../models/order.model.js";

class ConsumerService {
    static async CreateConsumerService(user, body) {
        try {
            const { name, email, dob, mobile, address } = body;

            const checkExist = await consumers.findOne({ email: email, user: user });

            if (checkExist) {
                throw new CustomError(404, "Consumer Already in Record");
            }
            const newConsumer = await consumers.create({
                name,
                email,
                dob,
                mobile,
                address,
                user
            });

            await newConsumer.save();
        } catch (error) {
            console.log("error in creating consumer", error);
            throw new CustomError(501, "error in creating consumer");
        }
    }

    static async DeleteConsumer(user, id) {
        const checkExist = await consumers.findOneAndDelete({ _id: id, user: user });

        if (!checkExist) {
            throw new CustomError(404, "Consumer Not Found in Record");
        }
    }

    static async GetConsumerById(user, id) {
        const checkExist = await consumers.findOne({ _id: id, user: user });

        console.log({ user, id });

        if (!checkExist) {
            throw new ApiError(404, "Consumer Not Found in Record");
        }

        return {
            user: checkExist
        };
    }

    static async UpdateConsumers(user, body, id) {
        const { name, email, mobile, dob, address } = body;

        const checkExist = await consumers.findById({ _id: id });

        if (checkExist.email !== email) {
            const checkExistEmail = await consumers.findOne({ email: email, user: user });

            if (checkExistEmail) {
                throw new ApiError(404, "Consumer Email Already in Another Record ");
            }
        }

        await consumers.findByIdAndUpdate(id, {
            name, email, mobile, dob, address, user
        });
        return {
            msg: "Consumer Update :)"
        };
    }

    static async GetAllSearchConsumer(user){
        
        const data =  await consumers.find({user}).select("name dob");
        console.log(data)
             return {
                 users:data 
             }
 
 
 
    }

    static async GetAllConsumers(user, page = 1, query = '') {
        const limit = 5;
        const skip = (Number(page) - 1) * limit;

        const queries = {
            user,
            $or: [
                { name: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { address: new RegExp(query, 'i') },
                { mobile: new RegExp(query, 'i') }
            ]
        };

        const allConsumerData = await consumers.find(queries).select("name mobile email").skip(skip).limit(limit);
     

        const totalConsumer = await consumers.countDocuments(queries);

        const hasMore = skip + limit < totalConsumer;
        return {
            data: allConsumerData,
            more: hasMore
        };
    }

    static async ConsumerDashboard(user){
        const countConsumers = await consumers.countDocuments({ user });

        const orderDocs = await orders.find({ user }).select("items.price -_id");

        const allPrices = orderDocs.flatMap(order => order.items.map(item => item.price));
        const totalSales = allPrices.reduce((acc, price) => acc + price, 0);


        return {
            consumers: countConsumers,
            orders: orderDocs.length,
            sell: totalSales,
        };

    }
}

export default ConsumerService;
