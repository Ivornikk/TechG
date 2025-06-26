import sequelize from '../db.mjs'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    gender: {type: DataTypes.STRING},
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
    createdAt: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "in progress"},
    paymentMethod: {type: DataTypes.STRING, allowNull: false}
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER},
    priceAtPurchase: {type: DataTypes.INTEGER}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.DECIMAL},
    description: {type: DataTypes.STRING},
    preview_image: {type: DataTypes.STRING, allowNull: false},
    description_images: {type: DataTypes.STRING}
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

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const ProductFeature = sequelize.define('product_feature', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const PackageElement = sequelize.define('package_element', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
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

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})

Product.hasMany(Rating)
Rating.belongsTo(Product)

Wishlist.belongsToMany(Product, {through: WishlistProduct})
Product.belongsToMany(Wishlist, {through: WishlistProduct})

Basket.belongsToMany(Product, {through: WishlistProduct})
Product.belongsToMany(Basket, {through: WishlistProduct})

Product.hasOne(Promotion)
Promotion.belongsTo(Product)

PromotionType.hasMany(Promotion)
Promotion.belongsTo(PromotionType)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasMany(ProductFeature)
ProductFeature.belongsTo(Product)

Product.hasMany(PackageElement)
PackageElement.belongsTo(Product)

Category.hasMany(Type)
Type.belongsTo(Category)

Type.hasMany(Group)
Group.belongsTo(Type)

Group.hasMany(Product)
Product.belongsTo(Group)

AttributeValue.hasMany(Product)
Product.belongsTo(AttributeValue)

Attribute.hasMany(AttributeValue)
AttributeValue.belongsTo(Attribute)

Group.hasMany(Attribute)
Attribute.belongsTo(Group)

export default {
    User,
    Address,
    Order,
    OrderProduct,
    Product,
    Promotion,
    PromotionType,
    ProductInfo,
    ProductFeature,
    PackageElement,
    Group,
    Type,
    Category,
    Rating,
    Wishlist,
    WishlistProduct,
    Basket,
    BasketProduct,
    Attribute,
    AttributeValue
}