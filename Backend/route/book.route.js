import express from 'express';
import { getAllBook } from '../controller/book.controller.js';

const bookRoute = express.Router();


bookRoute.get("/all" , getAllBook)

export default bookRoute;