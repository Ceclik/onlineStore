const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER', allowNull: false}
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: DataTypes.INTEGER, unique: false, allowNull: false}
});

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const CartItem = sequelize.define('cart_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT, unique: false, allowNull: false},
    //rating: {type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0},
    image: {type: DataTypes.STRING, unique: false, allowNull: false},
});

const Description = sequelize.define('descriptions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: false, allowNull: false},
    description: {type: DataTypes.TEXT, unique: false, allowNull: false}
});

const Producer = sequelize.define('producer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasMany(Rating, {onDelete: 'CASCADE'});
Rating.belongsTo(User);

User.hasOne(Cart, {onDelete: 'CASCADE'});
Cart.belongsTo(User);

Cart.hasMany(CartItem, {onDelete: 'CASCADE'});
CartItem.belongsTo(Cart);

Product.hasMany(Rating, {onDelete: 'CASCADE'});
Rating.belongsTo(Product);

Product.hasMany(Description, {as: 'info', onDelete: 'CASCADE'});
Description.belongsTo(Product);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Producer.hasMany(Product, {onDelete: 'CASCADE'});
Product.belongsTo(Producer);

Type.hasMany(Product);
Product.belongsTo(Type);

Country.hasMany(Product);
Product.belongsTo(Country);

Country.hasMany(Producer);
Producer.belongsTo(Country);

Type.belongsToMany(Producer, {through: TypeBrand});
Producer.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Rating,
    Cart,
    CartItem,
    Producer,
    Product,
    Description,
    Type,
    Country,
    TypeBrand
}