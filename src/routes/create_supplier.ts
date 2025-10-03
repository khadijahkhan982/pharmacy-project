import express from "express";
import { Supplier } from "../entities/Supplier";
const router = express.Router();

router.post('/api/supplier',async (req, res)=>{
    const {
        name,
        phone,
        address
    } = req.body;

    const supplier = Supplier.create({
        name,
        phone,
        address
    });

    await supplier.save();
    
    return res.json(supplier)
});


router.put('/api/supplier/update', async (req, res)=>{
    const {
        supplierId,
        name,
        phone,
        address
    } = req.query;
const id = Number(supplierId);
    const existing_supplier = await Supplier.findOne({

       where:{id : id } 
    })

console.log(existing_supplier, "Supplier found");

  if (!existing_supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    existing_supplier.name = String(name)
    existing_supplier.phone = String(phone)
    existing_supplier.address = String(address)
 
  

    await existing_supplier.save();
    return res.json(existing_supplier);

})




router.get('/api/supplier/:supplierId', async (req, res) => {
    const { supplierId } = req.params;

    const supplier = await Supplier.findOne({
        select: ['name', 'phone', 'address'],
        where: { id: parseInt(supplierId) }
    });


    if (!supplier) {
        return res.status(404).json({
            msg: "Supplier not found"
        });
    }

    return res.json(supplier);
});



router.delete("/api/supplier/:supplierId", async (req, res)=>{
    const {supplierId} = req.params;

   const response= await Supplier.delete(parseInt(supplierId))

    return res.json(response)

    
})
export{
    router as createSupplierRouter
}