import { Book } from "../model/book.model.js";

export  const getAllBook = async(req, res) =>{

    try {

        const book = await  Book.find();
        return res.status(200).json({
            success : true,
            book,
            message : "Book Fetched Successlly !"
        })
        
    } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Error In Fetching the  Book  ! ",
      error: error.message,
    });
        
    }
}