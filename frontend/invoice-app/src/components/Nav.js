import styles from '../styles/Nav.module.css'
import logo from '../assets/logo.svg'
import userIcon from '../assets/userIcon.svg'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'
import {useState} from 'react'


export default function Nav(){
    
    let [lightMode, setLightMode] = useState(true)
    let theme = lightMode ? light : dark
    let toggleTheme = ()=>{
        setLightMode(prevMode =>!prevMode)
    }

    return(
        <div className={styles.navContainer}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo} alt="logo" />
            </div>
            <div className={styles.middleNav}>
                <div className={styles.themeContainer}>
                    <img onClick={toggleTheme} className={styles.theme} src={theme} alt='color theme toggle' />
                </div>
            </div>
            <div className={styles.userIconContainer}>
                <img className={styles.userIcon} src={userIcon} alt="user Icon" />
            </div>
        </div>
    )   
}

