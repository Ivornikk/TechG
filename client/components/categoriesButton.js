import Link from "next/link"
import styles from '../styles/categoriesButton.module.css'


const CategoriesButton = () => {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.text}>
                    <div>
                        <img src={'/list.svg'} className={styles.categoriesIcon}></img>
                        <p>Categories</p>
                    </div>
                    <img src={'/dropdownArrow.svg'} className={styles.dropdownArrow}></img>
                </div>
            </div>
        </div>
    )
}

export default CategoriesButton