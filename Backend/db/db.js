import mongoose from "mongoose";

const connectDB = async () =>{

    try {

        await mongoose.connect(`${process.env.MONGO_URI}/shelfmade`);
        console.log("Database Connected Successfully !")
        
    } catch (error) {
        console.log("ERROR IN THE DATABASE CONNECTION " ,error) 
    }

}

export default connectDB