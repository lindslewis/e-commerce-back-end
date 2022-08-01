const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll({
      include:[{model:Product, through: ProductTag}]
    })
    res.status(200).json(tags)
  }catch(err){
    res.status(500).json({
      msg:"internal server error",
      err
    })
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {include: [{model:Product, through: ProductTag}]}).then(tag=>{
    if(!tag){
      return res.status(404).json({
        msg:"no such tag exists in the database"
      })
    }
    res.json(tag)
  }).catch(err=>{
      res.status(500).json({
        msg:"internal server error",
        err
      })
  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(201).json(newTag)
  }catch(err){
    console.log(err)
    res.status(500).json({
      msg:"internal server error",
      err
    })
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name:req.body.tag_name
  },
    {
      where:{
        id:req.params.id
      }
    }).then(tag=>{
      if(!tag[0]){
        return res.status(404).json({
          msg:"no such tag or no change made"
        })
      }
      res.json(tag)
    }).catch(err=>{
      res.status(500).json({
        msg:"internal server error",
        err
      })
    })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(tag=>{
    if(!tag){
      return res.status(404).json({
        msg: "no such tag exists in the database"
      })
    }
    res.json(tag)
  }).catch(err=>{
    res.status(500).json({
      msg:"internal server error",
      err
    })
  })
  // delete on tag by its `id` value
});

module.exports = router;
