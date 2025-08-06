import ProductCard from "@/app/components/productPage/productCard"
import Nav from "@/app/components/productPage/nav"
import DescriptionCard from "@/app/components/productPage/descriptionCard"
import SpecsCard from "@/app/components/productPage/specsCard"
import ReviewsCard from "@/app/components/productPage/reviewsCard"

const ProductPage = () => {

    const specs = [
        {name: 'Product name: samsung Galaxy S25 Ultra', id: 1},
        {name: 'Product size: 150x80x12mm', id: 2},
        {name: 'Display size: 30x30 mm', id: 3},
        {name: 'Color: White', id: 4},
        {name: 'Material: ABS', id: 5},
        {name: 'Functions: Zoom, thermo cam, geolocation track', id: 6},
        {name: 'Display size: 30x30 mm', id: 7},
        {name: 'Functions: Zoom, thermo cam, geolocation track', id: 8},
        {name: 'Color: White', id: 9},
        {name: 'Material: ABS', id: 10},
        {name: 'Display size: 30x30 mm', id: 11},
        {name: 'Color: White', id: 12},
        {name: 'Material: ABS', id: 13},
    ]

    const features = [
        {name: 'Test feature 1', id: 1},
        {name: 'Test feature 2', id: 2},
        {name: 'Test feature 3', id: 3},
        {name: 'Test feature 4', id: 4},
    ]

    const pack = [
        {name: 'Smartphone', id: 1},
        {name: 'Charger', id: 2},
        {name: 'Headphones', id: 3},
        {name: 'Wire for charging', id: 4},
    ]

    const reviews = [
        {review: 'Awesome job! Great Product! Lorem ipsum', stars: 5, id: 1},
        {review: 'Awesome job! Great Product! Lorem ipsum', stars: 5, id: 2},
        {review: 'Awesome job! Great Product! Lorem ipsum', stars: 5, id: 3},
        {review: 'Awesome job! Great Product! Lorem ipsum', stars: 5, id: 4}
    ]

    const images = [
        {id: 1, url: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg'},
        {id: 2, url: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg'},
        {id: 3, url: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg'},
    ]

    return (
            <div className="w-[1350px] m-auto mb-10">
                <ProductCard />
                <Nav />
                <DescriptionCard description={'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvi '}
                images={images}
                />
                <SpecsCard
                specs={specs}
                features={features}
                pack={pack}
                />
                <ReviewsCard reviews={reviews} />
            </div>
    )
}

export default ProductPage