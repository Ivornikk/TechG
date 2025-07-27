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
                <CategoriesButton />
            </div>
            <div className={styles.wishlistCartCont}>
                <button className={styles.wishlistButton}>
                    <img src={'/wishlistIcon.svg'} className={styles.wishlistIcon}></img>
                    <p>Wishlist</p>
                </button>
                <button className={styles.cartButton}>
                    <img src={'/cartIcon.svg'} className={styles.cartIcon}></img>
                    <p>Cart</p>
                </button>
            </div>
            <div className={styles.signButtonsCont}>
                <button className={styles.signUpBtn}>Sign up</button>
                <button className={styles.logInBtn}>Log in</button>
            </div>
        </nav>
    )
}

export default Navbar