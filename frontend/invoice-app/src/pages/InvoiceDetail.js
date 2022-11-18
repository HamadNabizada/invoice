import {useState, useEffect} from 'react'
import styles from '../styles/InvoiceDetail.module.css'
import Nav from '../components/Nav'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'

export default function InvoiceDetail(){
    let [lightMode, setLightMode] = useState(true)
    let theme = lightMode ? light : dark
    let toggleTheme = ()=>{
        setLightMode(prevMode =>!prevMode)
    }
    let lightTheme = {
        textColor: '#000000',
        minorTextColor: 'gray',
        bgColor:'#f8f7fc',
        minorBGColor:'#ffffff',
        shadow: '1px 1px 5px gray'
    }
    let darkTheme = {
        textColor: '#ffffff',
        minorTextColor: 'lightgray',
        bgColor:'#141625',
        minorBGColor:'#1f203c',
        shadow: '1px 1px 5px #1f203c'
    }
    let currentTheme = lightMode ? lightTheme : darkTheme
    let styleTheme = {
        lightTheme: lightMode,
        layout:{
            backgroundColor: currentTheme.bgColor
        },
        main:{
            color: currentTheme.textColor,
            backgroundColor: currentTheme.bgColor
        },
        mainText:{
            color: currentTheme.textColor,
        },
        minorText:{
            color: currentTheme.minorTextColor,
        },
        subBG:{
            backgroundColor: currentTheme.minorBGColor,
            boxShadow: currentTheme.shadow
        }
    }
    return(
        <div style={styleTheme.layout} className={styles.layout}>
            <Nav 
                handleClick={toggleTheme}
                theme = {theme}
            />
            <main style={styleTheme.layout} className={styles.InvoiceDetailContainer}>
                <div style={styleTheme.main} className={styles.invoiceWrapper}>
                    <div className={styles.backBtnContainer}>
                        <p>&#8249;</p>
                        <p>Go back</p>
                    </div>
                    <div style={styleTheme.subBG} className={styles.invoiceHeaderContainer}>
                        <div className={styles.statusContainer}>
                            <p>Status:</p>
                            <p>PENDING</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <div className={styles.buttonStyle}>Edit</div>
                            <div className={styles.buttonStyle}>Delete</div>
                            <div className={styles.buttonStyle}>Mark as Paid</div>
                        </div>
                    </div>
                    <div style={styleTheme.subBG} className={styles.invoicesDetailsSubContainer}>
                        <div className={styles.invoiceTopWrapper}>
                            <div className={styles.invoiceIDAndDescriptionWrapper}>
                                <h1>Invoice ID</h1>
                                <p>Project Description</p>
                            </div>
                            <div className={styles.AddressWrapper}>
                                <p>Street</p>
                                <p>City</p>
                                <p>Zip</p>
                                <p>Country</p>
                            </div>
                        </div>
                        <div className={styles.invoiceMiddleWrapper}>
                            <div className={styles.invoiceDatesWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Invoice Date</p>
                                    <h2>INVOICE DATE CREATE</h2>
                                </div>
                                <div className={styles.titledTextPair}>
                                    <p>Payment Date</p>
                                    <h2>PAYMENT DUE DATE</h2>
                                </div>
                            </div>
                            <div className={styles.clientAddressWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Bill To</p>
                                    <h2>CLIENT NAME</h2>
                                </div>
                                <div className={styles.AddressWrapper}>
                                    <p>ClientStreet</p>
                                    <p>ClientCity</p>
                                    <p>ClientZip</p>
                                    <p>ClientCountry</p>
                                </div>
                            </div>
                            <div className={styles.clientEmailWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Sent to</p>
                                    <h2>CLIENTEMAIL</h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles.invoiceBottomWrapper}>
                            <div className={styles.listContainer}>
                                <div className={styles.listDescription}>
                                    <p>Item Name</p>
                                    <p>QTY.</p>
                                    <p>Price</p>
                                    <p>Total</p>
                                </div>
                                <div className={`${styles.listDescription} ${styles.lineItem}`}>
                                    <p>Car</p>
                                    <p>1</p>
                                    <p>$500.00</p>
                                    <p>$500.00</p>
                                </div>
                                <div className={`${styles.listDescription} ${styles.lineItem}`}>
                                    <p>Book</p>
                                    <p>3</p>
                                    <p>$50.00</p>
                                    <p>$150.00</p>
                                </div>
                                <div className={`${styles.listDescription} ${styles.lineItem}`}>
                                    <p>Desk</p>
                                    <p>1</p>
                                    <p>$500.00</p>
                                    <p>$500.00</p>
                                </div>
                                
                                
                            </div>
                            <div className={styles.totalDueWrapper}>
                                <p>Amount Due</p>
                                <h3>
                                    $500.00
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}