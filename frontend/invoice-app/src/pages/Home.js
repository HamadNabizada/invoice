import Nav from '../components/Nav'
import style from '../styles/Home.module.css'
import {useState} from 'react'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'

export default function Home(){

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
        layout:{
            backgroundColor: currentTheme.bgColor
        },
        main:{
            color: currentTheme.textColor,
            backgroundColor: currentTheme.bgColor
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
        <div style={styleTheme.layout} className={style.layoutContainer}>
            <Nav 
             handleClick={toggleTheme}
             theme = {theme}
            />
            <main style={styleTheme.main}  className={style.mainHome}>
                <section className={style.header}>
                    <div className={style.title}>
                        <h1 className={style.invoiceTitle}>Invoices</h1>
                        <h3 style={styleTheme.minorText} className={style.invoiceSubTitle}>There are 4 total invoices</h3>
                    </div>
                    <div className={style.newInvoiceAndFilterContainer}>
                        {/* <div className={style.filterContainer}>
                            <label for='filterSelection' className={style.filterLabel}>Filter by: </label>
                            <select name="filter" id="filterSelection">
                                <option value="status">Status</option>
                                <option value="status">Status</option>
                                <option value="status">Status</option>
                            </select>
                        </div> */}
                        <div className={style.newInvoice}>
                            {/* <p className={style.newInvoicePlusBtn}>+</p> */}
                            <p className={style.newInvoiceText}>New Invoice</p>
                        </div>
                    </div>
                </section>
                <section className={style.invoices}>
                    <h2 style={styleTheme.subBG} className={style.invoice}>
                        <p className={style.invoiceID}>#RT3080</p>
                        <p style={styleTheme.minorText} className={style.invoiceDue}>Due 19 August 2021</p>
                        <p style={styleTheme.minorText} className={style.invoiceOwner}>Jensen Huang</p>
                        <p className={style.invoiceCost}>$1200.99</p>
                        <p className={style.invoiceStatus}>&#x2022; PAID</p>
                        <p className={style.rightArrow}>&#8250;</p>
                    </h2>
                    <h2 style={styleTheme.subBG} className={style.invoice}>
                        <p className={style.invoiceID}>#RT3080</p>
                        <p style={styleTheme.minorText} className={style.invoiceDue}>Due 19 may 2021</p>
                        <p style={styleTheme.minorText} className={style.invoiceOwner}>Jensff234234234234asdfen Huang</p>
                        <p className={style.invoiceCost}>$1200.99</p>
                        <p className={style.invoiceStatus}>&#x2022; PENDING</p>
                        <p className={style.rightArrow}>&#8250;</p>
                    </h2>
                </section>
            </main>
            
        </div>
    )
}