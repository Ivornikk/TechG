import Link from "next/link"
import CategoriesButton from "./categoriesButton"
import styles from '../styles/navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href={'/'}>
                <img src="/navbar-logo.png" className={styles.logo} alt="Logo"></img>
            </Link>
            <div className={styles.searchBar}>
                <form>
                    <input className={styles.searchInput} placeholder="Search for products" type="text" />
                    <button className={styles.searchButton}>
                        <img src="/search-button.png"></img>
                    </button>
                </form>
            </div>
            <CategoriesButton />
            <div className="wishlist-cart-cont">
                <button className="wishlist-button">
                    <img className="wishlist-icon"></img>
                    <p>Wishlist</p>
                </button>
                <button className="cart-button">
                    <img className="cart-icon"></img>
                    <p>Cart</p>
                </button>
            </div>
            <div className="sign-buttons-cont">
                <button className="sign-up-btn">Sign up</button>
                <button className="log-in-btn">Log in</button>
            </div>
        </nav>
    )
}

export default Navbar