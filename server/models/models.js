const sequelize = require('../db.mjs')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false, unique: true},
    gender: {type: DataTypes.STRING, allowNull: false},
    phoneNumber: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false, defaultValue: 'ENG'},
    currency: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USD'},
    language: {type: DataTypes.STRING, allowNull: false, defaultValue: 'en'},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
    avatar: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATE}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    createdAt: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "in progress"}
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER},
    priceAtPurchase: {type: DataTypes.INTEGER}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Promotion = sequelize.define('promotion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    percentage: {type: DataTypes.INTEGER, allowNull: false},
    startDate: {type: DataTypes.DATE, allowNull: false},
    endDate: {type: DataTypes.DATE, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 5},
    review: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE, allowNull: false}
})

const Wishlist = sequelize.define('wishlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WishlistProduct = sequelize.define('wishlist_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Attribute = sequelize.define('attribute', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    dataDype: {type: DataTypes.STRING, allowNull: false}
})

const AttributeValue = sequelize.define('attribute_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false}
})

const GroupAttributes = sequelize.define('group_attributes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const History = sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    viewedAt: {type: DataTypes.DATE, allowNull: false}
})

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

OrderProduct.hasOne(Product)
Product.belongsTo(OrderProduct)

User.hasOne(History)
History.belongsTo(User)

History.hasMany(Product)
Product.belongsTo(History)

User.hasMany(Rating)
Rating.belongsTo(User)

Rating.hasOne(Product)
Product.belongsTo(Rating)

Product.hasMany(Rating)
Rating.belongsTo(Product)

User.hasOne(Wishlist)
Wishlist.belongsTo(User)

Wishlist.hasMany(WishlistProduct)
WishlistProduct.belongsTo(Wishlist)

WishlistProduct.hasOne(Product)
Product.belongsTo(WishlistProduct)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.hasOne(Product)
Product.belongsTo(BasketProduct)

Promotion.hasOne(Product)
Product.belongsTo(Promotion)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Group.hasMany(Product)
Product.belongsTo(Group)

Group.hasOne(GroupAttributes)
GroupAttributes.belongsTo(Group)

GroupAttributes.hasMany(Attribute)
Attribute.belongsTo(GroupAttributes)

Type.hasMany(Group)
Group.belongsTo(Type)

Category.hasMany(Type)
Type.belongsTo(Category)

Product.hasMany(AttributeValue)
AttributeValue.belongsTo(Product)

AttributeValue.hasMany(Attribute)
Attribute.belongsTo(AttributeValue)

export default {
    User,
    Order,
    OrderProduct,
    Product,
    Promotion,
    ProductInfo,
    Group,
    Type,
    Category,
    Rating,
    Wishlist,
    WishlistProduct,
    Basket,
    BasketProduct,
    Attribute,
    AttributeValue,
    GroupAttributes,
    History
}