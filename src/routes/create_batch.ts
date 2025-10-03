import express from "express";
import { Medicine } from "../entities/Medicine";
import { Batch } from "../entities/Batch";
import { Category } from "../entities/Category";
import { Supplier } from "../entities/Supplier";

const router = express.Router();

router.post('/api/batch', async (req, res) => {
    const {
        medicine_id,
        batch_number,
        expiry_date,
        stock_quantity
    } = req.body;

    try {
       
        const medicine = await Medicine.findOneBy({ id: medicine_id });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const batch = Batch.create({
            batch_number,
            expiry_date,
            stock_quantity,
            medicine: medicine 
        });

        await batch.save();

        return res.status(201).json(batch);

    } catch (error) {
        console.error('Error creating batch:', error);
        return res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

router.get('/api/batch', async (req, res) => {
    const batches = await Batch.find({
        relations: ['medicine']
    });
    return res.json(batches);
});


router.put('/api/batch/update', async (req, res)=>{
    const {
        batch_number,
        medicine_id,
       stock_quantity,
       expiry_date

    } = req.query;
const id = Number(batch_number);
    const existing_batch = await Batch.findOne({

       where:{id : id } 
    })
if (!existing_batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

const medicine = Number(medicine_id)
    const existing_medicine= await Medicine.findOne({
        where: {id: medicine}
    })

    if (!existing_medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

console.log(existing_batch, "Batch found");

    existing_batch.medicine= existing_medicine
const medQuantity = Number(stock_quantity)
    existing_batch.stock_quantity = medQuantity
   
      existing_batch.expiry_date = String(expiry_date)

  

    await existing_batch.save();
    return res.json(existing_batch);

})


router.delete("/api/batch/:batchId", async (req, res)=>{
    const {batchId} = req.params;

   const response= await Batch.delete(parseInt(batchId))

    return res.json(response)

    
})
export {
    router as createBatchRouter
};