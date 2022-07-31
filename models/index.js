// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// const Products = sequelize.define('Products', )
// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'CategoryProductId'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsTo(Tag, { through: 'ProductTag'});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: 'ProductTag'});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
