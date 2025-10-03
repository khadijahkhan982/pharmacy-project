import express from "express";
import { Medicine } from "../entities/Medicine";
import { Batch } from "../entities/Batch";
import { Category } from "../entities/Category";
import { Supplier } from "../entities/Supplier";

const router = express.Router();

router.post('/api/medicine', async (req, res) => {
    const {
        name,
        category_id,
        supplier_id,  //all in actual medicine table
        price,       //except batch number
        description,
        batch_number
    } = req.body;

    try {
        const category = await Category.findOneBy({ id: category_id });
        const supplier = await Supplier.findOneBy({ id: supplier_id });

        if (!category || !supplier) {
            return res.status(404).json({ message: 'Category or Supplier not found' });
        }
        const medicine = Medicine.create({
            name,
            category,
            supplier,
            price,
            description
        });

        await medicine.save();

        const batch = Batch.create({
            batch_number,
            medicine 
        });

        await batch.save();

        return res.status(201).json({ medicine, batch });

    } catch (error) {
        console.error('Error creating medicine:', error);
        return res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

router.get('/api/medicine', async (req, res) => {
    const medicines = await Medicine.find({
        relations: ['category', 'supplier', 'batches']
    });
    return res.json(medicines);
});

router.put('/api/medicine/update', async (req, res)=>{
    const {
        medicineId,
           name,
        category_id,
        supplier_id,
        price,
        description,

    } = req.query;
const id = Number(medicineId);
    const existing_medicine = await Medicine.findOne({

       where:{id : id } 
    })
if (!existing_medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

const categoryid = Number(category_id)
    const existing_category = await Category.findOne({
        where: {id: categoryid}
    })

    if (!existing_category) {
      return res.status(404).json({ message: "Category not found" });
    }
 
    const supplier = Number(supplier_id)
    const existing_supplier = await Supplier.findOne({
        where: {id: supplier}
    })

    if (!existing_supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }



console.log(existing_medicine, "Medicine found");

  
const medPrice = Number(price)
    existing_medicine.price = medPrice

    existing_medicine.name = String(name)
    existing_medicine.category= existing_category
    existing_medicine.supplier = existing_supplier
    existing_medicine.description = String(description)
   
  
  

    await existing_medicine.save();
    return res.json(existing_medicine);

})

router.delete("/api/medicine/:medicineId", async (req, res)=>{
    const {medicineId} = req.params;

   const response= await Medicine.delete(parseInt(medicineId))

    return res.json(response)

    
})

export {
    router as createMedicineRouter
};