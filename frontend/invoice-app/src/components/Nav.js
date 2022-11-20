import styles from '../styles/Nav.module.css'
import logo from '../assets/logo.svg'
import userIcon from '../assets/userIcon.svg'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'


export default function Nav(props){

    return(
        <div className={styles.navContainer}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo} alt="logo" />
            </div>
            <div className={styles.middleNav}>
                <div className={styles.themeContainer}>
                    <img onClick={props.updateLightMode} className={styles.theme} src={props.lightMode ? light : dark} alt='color theme toggle' />
                </div>
            </div>
            <div className={styles.userIconContainer}>
                <img className={styles.userIcon} src={userIcon} alt="user Icon" />
            </div>
        </div>
    )   
}

