const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include:[Product]
    })
    res.status(200).json(categories)
  } catch (err) {
      res.status(500).json({
        msg:"internal server error",
        err
      })
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then(category=>{
    if(!category){
      return res.status(404).json({
        msg: "The category does not exist in the database."
      })
    }
    res.json(category)
  }).catch(err=>{
      res.status(500).json({
        msg:"internal server error",
        err
      })
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
    try{
      const newCategory = await Category.create({
          category_name: req.body.category_name
      })
      res.status(201).json(newCategory)
    }catch(err){
      console.log(err)
      res.status(500).json({
        msg:"internal server error",
        err
      })
    }
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },
    {
      where:{
        id:req.params.id
      }
    }).then(category=>{
      if(!category[0]){
        return res.status(404).json({
          msg:"no such category or no change made."
        })
      }
      res.json(category)
    }).catch(err=>{
      res.status(500).json({
        msg:"internal server error",
        err
      })
    })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(category=>{
    if(!category){
      return res.status(404).json({
        msg:"category does not exist in this database."
      })
    }
    res.json(category)
  }).catch(err=>{
    res.status(500).json({
      msg:"internal server error",
      err
    })
  })
  // delete a category by its `id` value
});

module.exports = router;
