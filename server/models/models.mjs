import sequelize from '../db.mjs'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    phoneNumber: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false, defaultValue: 'ENG'},
    currency: {type: DataTypes.STRING, allowNull: false, defaultValue: 'EUR'},
    language: {type: DataTypes.STRING, allowNull: false, defaultValue: 'en'},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
    avatar: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATE}
})

const Address = sequelize.define('address', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    telephone: {type: DataTypes.STRING, allowNull: false},
    addressLine: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    region: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    ZipCode: {type: DataTypes.STRING, allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    saleRecord: {type: DataTypes.STRING, allowNull: false, unique: true},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Pending"},
    trackingNumber: {type: DataTypes.STRING, allowNull: true},
    deliveryName: {type: DataTypes.STRING, allowNull: false},
    deliveryCountry: {type: DataTypes.STRING, allowNull: false},
    deliveryState: {type: DataTypes.STRING, allowNull: false},
    deliveryCity: {type: DataTypes.STRING, allowNull: false},
    deliveryStreetAddress: {type: DataTypes.STRING, allowNull: false},
    deliveryZIP: {type: DataTypes.STRING, allowNull: false},
    deliveryTelephone: {type: DataTypes.STRING, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false},
    totalProducts: {type: DataTypes.INTEGER, allowNull: false}
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER,}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL},
    description: {type: DataTypes.STRING},
    preview_image: {type: DataTypes.STRING, allowNull: false}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullDescription: {type: DataTypes.STRING},
    weight: {type: DataTypes.DECIMAL, allowNull: false},
    productName: {type: DataTypes.STRING, allowNull: false}
})

const AttributeName = sequelize.define('attribute_name', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const AttributeValue = sequelize.define('attribute_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    smallImage: {type: DataTypes.STRING},
    viewImage: {type: DataTypes.STRING},
    largeImage: {type: DataTypes.STRING},
    listGridImage: {type: DataTypes.STRING},
})

const ProductInfoAttributeName = sequelize.define('product_info_attribute_name', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Warehouse = sequelize.define('warehouse', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false}
})

const WarehouseProductInfo = sequelize.define('warehouse_product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ProductImage = sequelize.define('product_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    home: {type: DataTypes.STRING},
    listGrid: {type: DataTypes.STRING},
    grid: {type: DataTypes.STRING},
    gallery: {type: DataTypes.STRING},
    view: {type: DataTypes.STRING},
    otherItems: {type: DataTypes.STRING},
    large: {type: DataTypes.STRING}
})

const Promotion = sequelize.define('promotion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    percentage: {type: DataTypes.INTEGER, allowNull: false},
    startDate: {type: DataTypes.DATE, allowNull: false},
    endDate: {type: DataTypes.DATE, allowNull: false},
})

const PromotionType = sequelize.define('promotion_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    parent: {type: DataTypes.INTEGER}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 5},
    review: {type: DataTypes.STRING},
    images: {type: DataTypes.STRING}
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
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})


User.hasMany(Address)
Address.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasOne(Wishlist)
Wishlist.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

Order.belongsToMany(Product, {through: OrderProduct, as: "product"})
Product.belongsToMany(Order, {through: OrderProduct})

OrderProduct.hasMany(Warehouse)
Warehouse.belongsTo(OrderProduct)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Wishlist.belongsToMany(Product, {through: WishlistProduct})
Product.belongsToMany(Wishlist, {through: WishlistProduct})

Basket.belongsToMany(Product, {through: BasketProduct})
Product.belongsToMany(Basket, {through: BasketProduct})

Product.hasOne(Promotion)
Promotion.belongsTo(Product)

Product.hasOne(ProductInfo)
ProductInfo.belongsTo(Product)

ProductInfo.hasMany(ProductImage)
ProductImage.belongsTo(ProductInfo)

Warehouse.belongsToMany(ProductInfo, { through: WarehouseProductInfo})
ProductInfo.belongsToMany(Warehouse, { through: WarehouseProductInfo})

AttributeName.belongsToMany(ProductInfo, {through: ProductInfoAttributeName})
ProductInfo.belongsToMany(AttributeName, {through: ProductInfoAttributeName})

AttributeName.hasMany(AttributeValue)
AttributeValue.belongsTo(AttributeName)

Category.hasMany(Product)
Product.belongsTo(Category)

export default {
    User,
    Address,
    Order,
    OrderProduct,
    Product,
    Warehouse,
    WarehouseProductInfo,
    Promotion,
    PromotionType,
    ProductInfo,
    ProductImage,
    Category,
    Rating,
    Wishlist,
    WishlistProduct,
    Basket,
    BasketProduct,
    AttributeName,
    AttributeValue,
    ProductInfoAttributeName
}