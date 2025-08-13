import Link from "next/link"
import Pages from "./pages"

const ProductsGrid = () => {
    const productSample = [
        {
        id: 5124,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 1234,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 618343,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 16333,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 16723,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 723,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        },
        {
        id: 1215634,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
        }
    ]

    return (
        <div>
            <ul className="md:w-[1500px] w-500px grid grid-cols-5 gap-13 mx-auto">
                {
                    productSample.map(product => {
                        return (
                            <Link href={`/product/${product.id}`} key={product.id}>
                                <li className="text-black w-[300px] bg-white hover:shadow-xl transition">
                                    <div className="w-[300px] h-[315px] flex items-center justify-center text-3xl bg-gray-300">
                                        Product pic
                                    </div>
                                    <div>{product.name}</div>
                                    <div className="mt-5">${product.price}</div>
                                    <div className="flex">
                                        <div className="mr-5">{product.soldNum} sold</div>
                                        <div className="flex">
                                            <img src="/star.svg"></img>{product.rating}
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
            <Pages pagesNum={10} />
        </div>
    )
}

export default ProductsGrid