import ProductVariations from "@/app/components/productVariations"
import QuantityCounter from "../quantityCounter"

const ProductCard = () => {
    const productSample = {
        id: 5124,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        brand: 'Bosch',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
    }

    const sampleVariations = [
        {
            id: 0,
            name: 'color',
            types: [
                {
                    id: 1,
                    name: 'white'
                },
                {
                    id: 2,
                    name: 'Black'
                },
                {
                    id: 3,
                    name: 'Yellow'
                },
                {
                    id: 4,
                    name: 'Purple'
                },
                {
                    id: 5,
                    name: 'Red'
                },
            ]
        },
        {
            id: 1,
            name: 'RAM',
            types: [
                {
                    id: 1,
                    name: '32GB'
                },
                {
                    id: 2,
                    name: '64GB'
                },
                {
                    id: 3,
                    name: '128GB'
                },
            ]
        },
    ]
    const favorites = 3
    return (
        <div className="p-5 bg-categories flex flex-row shadow-xl">
            <div>
                <div className="bg-gray-300 flex text-4xl w-[730px] h-[630px] items-center justify-between">
                    <img className="w-[36px]" src="/arrow-left.svg"></img>
                    Product Picture
                    <img className="w-[36px]" src="/arrow-right.svg"></img>
                </div>
            </div>
            <div className="px-5 text-lg">
                <h2>{productSample.name}</h2>
                <h2 className="pt-3">Brand: {productSample.brand}</h2>
                <h1 className="text-brand text-4xl py-4">{productSample.price}$</h1>
                <hr className="border-stroke" />
                <ProductVariations variations={sampleVariations} />
                <div className="flex flex-row justify-between">
                    <div className="float-center h-[174px]">
                        <h1 className="text-3xl my-3">Quantity:</h1>
                        <QuantityCounter defaultValue={5} />
                        <div className="mt-3">
                            Shipping: 3.15$
                        </div>
                    </div>
                    <div className="flex flex-col mx-20 w-full">
                        <button className="bg-stroke my-3 w-full h-[42px]">Add to cart</button>
                        <button className="bg-stroke my-3 w-full h-[43px]">Buy now</button>
                        <button className="bg-stroke my-3 w-full flex h-[43px] items-center justify-center">
                            <img className="mr-3" src="/heart-icon.svg"></img>
                            <div className="">{favorites}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard