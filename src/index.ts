import dotenv from 'dotenv';
dotenv.config(); // ← This line loads your .env file!


import { DataSource, Transaction } from "typeorm"
import express from 'express';
import { Medicine } from './entities/Medicine';
import { Supplier } from './entities/Supplier';
import { Category } from './entities/Category';
import { Batch } from './entities/Batch';
import { createCategoryRouter } from './routes/create_category';
import { createSupplierRouter } from './routes/create_supplier';
import { createMedicineRouter } from './routes/create_medicine';
import { createBatchRouter } from './routes/create_batch';


const app = express();
 const AppDataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number (process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [Medicine, Supplier, Category, Batch],
        synchronize: true
        })
const main = async () => {
    try {
     await AppDataSource?.initialize();  
      console.log("Connected to postgres");  
      app.use(express.json()) 
      app.use(createCategoryRouter)
      app.use(createSupplierRouter)
      app.use(createMedicineRouter)
      app.use(createBatchRouter)
   
      
      app.listen(8080, ()=>{
        console.log("now running on 8080");
        
      })
    } catch (error) {
        console.error(error,"not able to connect"); 
    }
}
main();