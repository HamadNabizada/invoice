import Nav from '../components/Nav'
import style from '../styles/Home.module.css'
import {useState} from 'react'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'
import NewInvoiceModal from '../components/NewInvoiceModal'

export default function Home(){
    let [isNewInvoiceModalActive, setNewInvoiceModalActive] = useState(false)

    let modalStyles = { 
        main: isNewInvoiceModalActive ? style.modalActiveMain : ''
    }
    async function fetchData(){
        let db = await fetch('http://localhost:8000/')
        let data = await db.json()
        console.log(data);
    }
    fetchData()
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
        minorText:{
            color: currentTheme.minorTextColor,
        },
        subBG:{
            backgroundColor: currentTheme.minorBGColor,
            boxShadow: currentTheme.shadow
        }
    }
    function createNewInvoice(){
        setNewInvoiceModalActive(true)
    }
    function cancelNewInvoice(){
        setNewInvoiceModalActive(false)
    }
    document.body.style.backgroundColor = styleTheme.layout.backgroundColor

    return(
        <div style={styleTheme.layout} className={style.layoutContainer}>
            <Nav 
             handleClick={toggleTheme}
             theme = {theme}
            />
            <NewInvoiceModal 
                isActive = {isNewInvoiceModalActive}
                theme = {styleTheme}
                handleCancel = {cancelNewInvoice}
            />
            <main style={styleTheme.main} className={`${style.mainHome} ${modalStyles.main}`}>
                <section className={style.header}>
                    <div className={style.title}>
                        <h1 className={style.invoiceTitle}>Invoices</h1>
                        <h3 style={styleTheme.minorText} className={style.invoiceSubTitle}>There are 4 total invoices</h3>
                    </div>
                    <div className={style.newInvoiceAndFilterContainer}>
                        <div className={style.filterContainer}>
                            <label htmlFor='filterSelection' className={style.filterLabel}>Filter by: </label>
                            <select className={style.filterSelect} name="filterSelection" id="filterSelection">
                                <option value="all">All</option>
                                <option value="draft">Draft</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                        <div onClick={createNewInvoice} className={style.newInvoice}>
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