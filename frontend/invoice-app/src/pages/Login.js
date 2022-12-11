import styles from '../styles/Login.module.css'
import Nav from '../components/Nav'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import e from 'cors'

export default function Login(props){
    let styleTheme = {
        layout:{
            backgroundColor: props.lightMode ?  '#f8f7fc' : '#141625'
        },
        main:{
            color: props.lightMode ? '#000000' : '#ffffff',
            backgroundColor: props.lightMode ?  '#f8f7fc' : '#141625'
        },
        mainText:{
            color: props.lightMode ? '#000000' : '#ffffff',
        },
        minorText:{
            color: props.lightMode ? 'gray' : 'lightgray',
        },
        subBG:{
            backgroundColor: props.lightMode ?  '#ffffff' : '#1f203c',
            boxShadow: props.lightMode ?  '1px 1px 5px gray' : '',
            border: props.lightMode ? '' : '1px solid white'
        }
    }
    let bgColor = {
        backgroundColor: props.lightMode ?  '#ffffff' : '#1f203c',
        border: props.lightMode ? '1px solid darkgray':'1px solid gray',
        caretColor: props.lightMode ? 'black':'white',
        color: props.lightMode ? 'black':'white'
    }
    let navigate = useNavigate()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    function submitLogin(e){
        e.preventDefault()
        console.log('submit');
    }
    function homeButton(){
        navigate('/')
    }
    function registerBtn(){
        navigate('/user/register')
    }
    
    function updateEmail(e){
        setEmail(e.target.value)
    }
    function updatePassword(e){
        setPassword(e.target.value)
    }

    return(
        <div style={styleTheme.layout} className={styles.layout}>
            <Nav 
                updateLightMode = {props.updateLightMode}
                lightMode = {props.lightMode}
            />
            <section style={styleTheme.main} className={styles.loginContainer}>
                <div style={styleTheme.subBG} className={styles.formWrapper}>
                    <h1 className={styles.formTitle}>Login</h1>
                    <form className={styles.formStyles} onSubmit={submitLogin}>
                        <div className={styles.labelInputWrapper}>
                            <label htmlFor="email">Email</label>
                            <input onChange={updateEmail} value={email} style={bgColor} id='email' type="text" placeholder='Email'/>
                        </div>
                        <div className={styles.labelInputWrapper}>
                            <label htmlFor="password">Password</label>
                            <input onChange={updatePassword} value={password} style={bgColor} id='password' placeholder='Password' type="text" />
                        </div>
                        <button className={styles.loginBtn} type='submit'>Login</button>
                    </form>
                    <div className={styles.btnContainer}>
                        <button onClick={registerBtn} className={styles.homeBtn} type='button'>Register</button>
                        {/* <button onClick={homeButton} className={styles.homeBtn} type='button'>Go Back</button> */}
                    </div>
                </div>
            </section>
        </div>
    )
}