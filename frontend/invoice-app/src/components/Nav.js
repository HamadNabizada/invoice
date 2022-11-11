import styles from '../styles/Nav.module.css'
import logo from '../assets/logo.svg'
import userIcon from '../assets/userIcon.svg'

export default function Nav(){
    return(
        <div className={styles.navContainer}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo} alt="logo image" />
            </div>
            <div className={styles.middleNav}>
                <div className={styles.theme}>
                    Theme
                </div>
            </div>
            <div className={styles.userIconContainer}>
                <img className={styles.userIcon} src={userIcon} alt="user Icon" />
            </div>
        </div>
    )   
}

