import {useState, useEffect, useRef} from 'react'
import styles from '../styles/InvoiceDetail.module.css'
import Nav from '../components/Nav'
import {useParams,useNavigate} from 'react-router-dom'
import EditInvoiceModal from '../components/EditInvoiceModal.js'

export default function InvoiceDetail(props){
    let initialStatusPaid = useRef(false)
    let isFirstRender = useRef(true)
    let {id} = useParams()
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

    let navigate = useNavigate()

    function goHome(){
        navigate('/')
    }
    function markAsPaid(){
        setInvoice(prevInvoice=>{
            return {
                ...prevInvoice,
                invoiceStatus: 'Paid'
            }
        })
    }
    async function updateInvoice(){
        let apiCall = await fetch(`https://invoice-production-a876.up.railway.app/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({...invoice})
        })
        let data = await apiCall.json()
    }
    let [invoice, setInvoice] = useState({
        "billFrom": {
            "street": "x",
            "city": "x",
            "zipCode": 1,
            "country": "United States"
        },
        "billTo": {
            "clientName": "a",
            "clientEmail": "a",
            "clientStreet": "a",
            "clientCity": "a",
            "clientZipCode": 1,
            "clientCountry": "United States"
        },
        "_id": "63748aa9cde019263b073bcb",
        "invoiceID": "1",
        "invoiceDate": "2022-11-16T07:00:57.918Z",
        "paymentDue": "2022-12-16T07:00:57.918Z",
        "paymentTerms": 30,
        "projectDescription": "1",
        "itemList": [
            {
                "itemName": "ff",
                "itemQty": 11,
                "itemPrice": 11,
                "_id": "63748e22a17d0e4646bc8075"
            }
        ],
        "totalInvoice": 1,
        "invoiceStatus": "1",
        "__v": 0
    })
    async function deleteInvoice(){
        let apiCall = await fetch(`https://invoice-production-a876.up.railway.app/${id}`,{
            method:'DELETE'
        })
        let data = await apiCall.json()
        navigate('/')
    }
    async function getInvoice(){
        let apiCall = await fetch(`https://invoice-production-a876.up.railway.app/${id}`)
        let data = await apiCall.json()
        setInvoice(data)
    }
    useEffect(()=>{
        if(isFirstRender.current){
            isFirstRender.current = false
            if(invoice.invoiceStatus==='Paid'){
                initialStatusPaid.current = true
            }
        }
    },[invoice])
    useEffect(()=>{
        if(!initialStatusPaid.current){
            if(invoice.invoiceStatus === 'Paid'){
                updateInvoice()
            }
        }
    },[invoice])
    useEffect(()=>{
        getInvoice()
    },[])
    let classStyle = styles.invoiceStatus
    if(invoice.invoiceStatus === 'Draft'){
        classStyle = styles.invoiceStatusDraft
    }
    if(invoice.invoiceStatus === 'Pending'){
        classStyle = styles.invoiceStatusPending
    }
    if(invoice.invoiceStatus === 'Paid'){
        classStyle = styles.invoiceStatusPaid
    }
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
    let lineItemElementArray= invoice.itemList.map((item,index)=>{
        let lineItemElem = (
            <div key={item._id} className={`${styles.listDescription} ${styles.lineItem}`}>
                <p>{item.itemName}</p>
                <p>{item.itemQty}</p>
                <p>{item.itemPrice}</p>
                <p>{item.listItemTotalFormatted}</p>
            </div>
        )
        return(
            lineItemElem
        )
    })
    let [isEditModalActive, setIsEditModalActive] = useState(false)
    function editInvoice(){
        setIsEditModalActive(true)
    }
    function handleCancel(){
        setIsEditModalActive(false)
    }

    return(
        <div style={styleTheme.layout} className={styles.layout}>
            <Nav 
             updateLightMode = {props.updateLightMode}
             lightMode = {props.lightMode}
            />
            <EditInvoiceModal 
                isActive = {isEditModalActive}
                lightMode = {props.lightMode}
                invoiceId = {id}
                handleCancel = {handleCancel}
            />
            <main style={styleTheme.layout} className={styles.InvoiceDetailContainer}>
                <div style={styleTheme.main} className={styles.invoiceWrapper}>
                    <div onClick={goHome} className={styles.backBtnContainer}>
                        <p>&#8249;</p>
                        <p>Go back</p>
                    </div>
                    <div style={styleTheme.subBG} className={styles.invoiceHeaderContainer}>
                        <div className={styles.statusContainer}>
                            <p>Status:</p>
                            <p className={classStyle}>{invoice.invoiceStatus}</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <div onClick={editInvoice} className={styles.buttonStyle}>Edit</div>
                            <div onClick={deleteInvoice} className={styles.buttonStyle}>Delete</div>
                            <div onClick={markAsPaid} className={styles.buttonStyle}>Mark as Paid</div>
                        </div>
                    </div>
                    <div style={styleTheme.subBG} className={styles.invoicesDetailsSubContainer}>
                        <div className={styles.invoiceTopWrapper}>
                            <div className={styles.invoiceIDAndDescriptionWrapper}>
                                <h1 className={styles.invoiceID}>{`#${invoice.invoiceID}`}</h1>
                                <p>{invoice.projectDescription}</p>
                            </div>
                            <div className={styles.AddressWrapper}>
                                <p>{invoice.billFrom.street}</p>
                                <p>{invoice.billFrom.city}</p>
                                <p>{invoice.billFrom.zipCode}</p>
                                <p>{invoice.billFrom.country}</p>
                            </div>
                        </div>
                        <div className={styles.invoiceMiddleWrapper}>
                            <div className={styles.invoiceDatesWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Invoice Date:</p>
                                    <h2>{formatDueDate(invoice.invoiceDate)}</h2>
                                </div>
                                <div className={styles.titledTextPair}>
                                    <p>Payment Date:</p>
                                    <h2>{formatDueDate(invoice.paymentDue)}</h2>
                                </div>
                            </div>
                            <div className={styles.clientAddressWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Bill To:</p>
                                    <h2>{invoice.billTo.clientName}</h2>
                                </div>
                                <div className={styles.AddressWrapper}>
                                    <p>{invoice.billTo.clientStreet}</p>
                                    <p>{invoice.billTo.clientCity}</p>
                                    <p>{invoice.billTo.clientZipCode}</p>
                                    <p>{invoice.billTo.clientCountry}</p>
                                </div>
                            </div>
                            <div className={styles.clientEmailWrapper}>
                                <div className={styles.titledTextPair}>
                                    <p>Sent to:</p>
                                    <h2>{invoice.billTo.clientEmail}</h2>
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
                                {lineItemElementArray}
                            </div>
                            <div className={styles.totalDueWrapper}>
                                <p>Amount Due:</p>
                                <h3>{invoice.totalInvoiceFormatted}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}