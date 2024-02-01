import express from 'express';
import { Port ,mongoDBUrl} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
//Option 1:Allow all origins with default of cord(*)
app.use(cors());

//Option 2:Allow custom origins
/* app.use(cors({
    orign:'http://localhost:3001',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
})); */

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Hello World!");
});

app.use('/books',booksRoute)


mongoose
.connect(mongoDBUrl)
.then(()=>{
    console.log("App connected to database");
    app.listen(Port, () => {
        console.log(`Server listening on port ${Port}`);
    });

})
.catch((err)=>{
    console.log(err);
})
