import Nav from '../components/Nav'
import style from '../styles/Home.module.css'
import {useEffect, useState} from 'react'
import NewInvoiceModal from '../components/NewInvoiceModal'
import {useNavigate} from 'react-router-dom'

export default function Home(props){
    let [isNewInvoiceModalActive, setNewInvoiceModalActive] = useState(false)
    let [render, setRender] = useState(0)
    let navigate = useNavigate()
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
            let apiCall = await fetch('http://localhost:8000/',{
                method: 'GET',
                credentials: 'include'
            })
            let data = await apiCall.json()
            if(data.redirect){
                navigate(data.redirect)
            }
            setAllInvoices(data)
        }
       fetchData()  
    },[render])

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
            boxShadow: props.lightMode ?  '1px 1px 5px gray' : '1px 1px 5px #1f203c'
        }
    }
    function createNewInvoice(){
        setNewInvoiceModalActive(true)
    }
    function cancelNewInvoice(){
        setNewInvoiceModalActive(false)
        setRender(prev=>prev+1)
    }
    document.body.style.backgroundColor = styleTheme.layout.backgroundColor
    function formatDueDate(string){
        let date = string.slice(0,10)
        let dateArray = date.split('-')
        let dateYear = dateArray[0]
        let dateMonth = dateArray[1]
        let dateDay = dateArray[2]
        let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        let dueDateFormatted = `Due ${dateDay} ${months[dateMonth-1]} ${dateYear}`
        return dueDateFormatted
    }
    function goToID(e){
        let index = e.target.id
        let newNavigation = allInvoices[index]._id
        navigate(newNavigation)
    }

    function createInvoicesElements(){
        let invoicesArray = allInvoices.map((invoice,index)=>{
            let dueDate = 'Due'
            if(invoice.paymentDue){
                dueDate = formatDueDate(invoice.paymentDue)
            }
            let classStyle = style.invoiceStatus
            if(invoice.invoiceStatus === 'Draft'){
                classStyle = style.invoiceStatusDraft
            }
            if(invoice.invoiceStatus === 'Pending'){
                classStyle = style.invoiceStatusPending
            }
            if(invoice.invoiceStatus === 'Paid'){
                classStyle = style.invoiceStatusPaid
            }
            return(
                <h2 onClick={goToID} id={index} key={index} style={styleTheme.subBG} className={style.invoice}>
                    <p id={index} className={style.invoiceID}>{invoice.invoiceID}</p>
                    <p id={index} style={styleTheme.minorText} className={style.invoiceDue}>{dueDate}</p>
                    <p id={index} style={styleTheme.mainText} className={style.invoiceOwner}>{invoice.billTo.clientName}</p>
                    <p id={index} className={style.invoiceCost}>{`${invoice.totalInvoiceFormatted}`}</p>
                    <p id={index} className={classStyle}>&#x2022; {invoice.invoiceStatus}</p>
                    <p id={index} className={style.rightArrow}>&#8250;</p>
                </h2>
            )
        })
        return invoicesArray
    }
    let [invoicesElement,setInvoicesElement] = useState(createInvoicesElements)
    useEffect(()=>{
        setInvoicesElement(createInvoicesElements)
    }, [allInvoices,props.lightMode])
    let [filter, setFilter]=useState('All')
    function updateFilter(e){
        setFilter(e.target.value)
    }
    async function filterInvoicesAPICall(){
        let apiPOST = await fetch('https://invoice-production-a876.up.railway.app/',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({filter})
        })
        let data = await apiPOST.json()
        setAllInvoices(data)
    }
    useEffect(()=>{
        filterInvoicesAPICall()
    },[filter])
    return(
        <div style={styleTheme.layout} className={style.layoutContainer}>
            <Nav 
             updateLightMode = {props.updateLightMode}
             lightMode = {props.lightMode}
            />
            <NewInvoiceModal 
                isActive = {isNewInvoiceModalActive}
                lightMode = {props.lightMode}
                handleCancel = {cancelNewInvoice}
            />
            <main style={styleTheme.main} className={`${style.mainHome} ${modalStyles.main}`}>
                <section className={style.header}>
                    <div className={style.title}>
                        <h1 className={style.invoiceTitle}>Invoices</h1>
                        <h3 style={styleTheme.minorText} className={style.invoiceSubTitle}>{`There are ${allInvoices.length} total invoices`}</h3>
                    </div>
                    <div className={style.newInvoiceAndFilterContainer}>
                        <div className={style.filterContainer}>
                            <label htmlFor='filterSelection' className={style.filterLabel}>Filter by: </label>
                            <select onChange={updateFilter} value={filter} className={style.filterSelect} name="filterSelection" id="filterSelection">
                                <option value="All">All</option>
                                <option value="Draft">Draft</option>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
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
