import express from "express";
import { Category } from "../entities/Category";
const router = express.Router();

router.post('/api/category',async (req, res)=>{
    const {
        name
    } = req.body;

    const category = Category.create({
        name
    });

    await category.save();
    
    return res.json(category)
});

router.put('/api/category/update', async (req, res)=>{
    const {
        categoryId,
        name
    } = req.query;
const id = Number(categoryId);
    const existing_category = await Category.findOne({

       where:{id : id } 
    })

console.log(existing_category, "Category found");

  if (!existing_category) {
      return res.status(404).json({ message: "Category not found" });
    }

    existing_category.name = String(name)
 
  

    await existing_category.save();
    return res.json(existing_category);

})



router.get('/api/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findOne({
        select: ['name'],
        where: { id: parseInt(categoryId) }
    });


    if (!category) {
        return res.status(404).json({
            msg: "Category not found"
        });
    }

    return res.json(category);
});



router.delete("/api/category/:categoryId", async (req, res)=>{
    const {categoryId} = req.params;

   const response= await Category.delete(parseInt(categoryId))

    return res.json(response)

    
})



export{
    router as createCategoryRouter
}