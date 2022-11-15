import Nav from '../components/Nav'
import style from '../styles/Home.module.css'
import {useEffect, useState} from 'react'
import light from '../assets/light.svg'
import dark from '../assets/dark.svg'
import NewInvoiceModal from '../components/NewInvoiceModal'

export default function Home(){
    let [isNewInvoiceModalActive, setNewInvoiceModalActive] = useState(false)

    let modalStyles = { 
        main: isNewInvoiceModalActive ? style.modalActiveMain : ''
    }
    let [allInvoices, setAllInvoices] = useState([{
        "invoiceID": '',
        "billFrom": {
            'street': '',
            'city':'',
            'zipCode':'',
            'country':''
        },
        'billTo':{
            'clientName':'',
            'clientEmail':'',
            'clientStreet': '',
            'clientCity':'',
            'clientZipCode':'',
            'clientCountry':''
        },
        // 'invoiceDate':Date,
        // 'paymentDue':Date,
        'paymentTerms':'30',
        'projectDescription':'',
        'itemList':[{
            'itemName':'',
            'itemQty':'',
            'itemPrice':'',
            'listItemTotal':''
        }],
        'totalInvoice':'',
        'invoiceStatus':'Draft'
    }])
    useEffect(()=>{
      async function fetchData(){
        let apiCall = await fetch('http://localhost:8000/')
        let data = await apiCall.json()
        setAllInvoices(data)
       }
       fetchData()    
    },[])

    function logdata(){
        console.log(allInvoices)
    }
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
    function createNewInvoice(){
        setNewInvoiceModalActive(true)
    }
    function cancelNewInvoice(){
        setNewInvoiceModalActive(false)
    }
    document.body.style.backgroundColor = styleTheme.layout.backgroundColor
    function createInvoicesElements(){
        let invoicesArray = allInvoices.map((invoice,index)=>{
            return(
                <h2 key={index} style={styleTheme.subBG} className={style.invoice}>
                    <p className={style.invoiceID}>{invoice.invoiceID}</p>
                    <p style={styleTheme.minorText} className={style.invoiceDue}>Due 19 August 2021</p>
                    <p style={styleTheme.mainText} className={style.invoiceOwner}>{invoice.billTo.clientName}</p>
                    <p className={style.invoiceCost}>{invoice.totalInvoice}</p>
                    <p className={style.invoiceStatus}>&#x2022; {invoice.invoiceStatus}</p>
                    <p className={style.rightArrow}>&#8250;</p>
                </h2>
            )
        })
        return invoicesArray
    }
    let [invoicesElement,setInvoicesElement] = useState(createInvoicesElements)
    useEffect(()=>{
        setInvoicesElement(createInvoicesElements)
    }, [allInvoices,lightMode])

    
    return(
        <div onClick={logdata} style={styleTheme.layout} className={style.layoutContainer}>
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
                 {invoicesElement}
                </section>
            </main>
            
        </div>
    )
}