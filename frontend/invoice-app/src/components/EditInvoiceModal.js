import styles from '../styles/NewInvoiceModal.module.css'
import trashIcon from '../assets/trash.svg'
import {useState, useRef, useEffect} from 'react'



export default function EditInvoice(props){
    let firstRender = useRef(true)
    let bgColor = {
        backgroundColor: props.theme.subBG.backgroundColor,
        border: props.theme.lightTheme ? '1px solid darkgray':'1px solid gray',
        caretColor: props.theme.lightTheme ? 'black':'white',
        color: props.theme.lightTheme ? 'black':'white'
    }
    let themeColor = {
       color: props.theme.lightTheme ?  'rgba(0,0,0,.75)':'rgba(255,255,255,.55)'
    }
    let dateTheme = {
        backgroundColor: props.theme.lightTheme ?  'rgba(0,0,0,.25)':'rgba(255,255,255,.75)'
    }
    let currentDate = new Date
    let paymentDue = new Date()
    paymentDue = new Date (paymentDue.setDate(paymentDue.getDate() + 30))

    let [newJSON,setJSON] = useState({
        "invoiceID": '1',
        "billFrom": {
            'street': '1',
            'city':'1',
            'zipCode':'1',
            'country':'1'
        },
        "billTo":{
            'clientName':'1',
            'clientEmail':'1',
            'clientStreet': '1',
            'clientCity':'1',
            'clientZipCode':'1',
            'clientCountry':'1'
        },
        'invoiceDate': '111',
        'paymentDue':'111',
        'paymentTerms':'30',
        'projectDescription':'1',
        'itemList':[{
            'itemName':'1',
            'itemQty':'1',
            'itemPrice':'1',
            'listItemTotal':'1'
        }],
        'totalInvoice':'',
        'invoiceStatus':'Draft',
    })
   
    let [itemLineCounter, setItemLineCounter] = useState(1)
    let itemListObj = {
        'itemName':'',
        'itemQty':'0',
        'itemPrice':'0',
        'itemLineTotal':'0'
    }
    let itemListArray = [itemListObj]
    let [itemList, setItemList] = useState(itemListArray)
    function updateInvoiceStatus(e){
        setJSON(prevJSON=>{
            return {
                ...prevJSON,
                invoiceStatus:e.target.value
            }
        })
    }
    function updateItemList(e){
        setJSON(prevJSON=>{
            let newItemList = prevJSON.itemList.map((listItem,i) =>{
                if(e.target.getAttribute('data-listIndex')==i){
                    return {
                        ...listItem,
                        [e.target.id]:e.target.value
                    }
                }
                else{
                    return {
                        ...listItem,
                    }
                }
            })
            return{
                ...prevJSON,
                itemList: newItemList
            }
        })
        setJSON(prevJSON=>{
            let newList = prevJSON.itemList.map(listItem=>{
                let totalPriceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listItem.itemQty * listItem.itemPrice)
                return {
                    ...listItem,
                    listItemTotalFormatted: totalPriceFormatted,
                    listItemTotal: listItem.itemQty * listItem.itemPrice
                }
            })
            return {
                ...prevJSON,
                itemList:newList
            }
        })
        setJSON(prevJSON=>{
            let pricesArray = prevJSON.itemList.map(item=>{
                return item.listItemTotal
            })
            let totalSum = pricesArray.reduce((a,b)=>a+b)
            let totalSumFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSum)
            return {
                ...prevJSON,
                'totalInvoice':totalSum,
                'totalInvoiceFormatted':totalSumFormatted
            }
        })
    }
    function updateInvoiceID(e){
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                invoiceID: e.target.value
            }
        })
    }
    function updateBillFromJSON(e){
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                billFrom: {
                    ...prevJSON.billFrom,
                    [e.target.id]:e.target.value
                }
            }
        })
    }
    function updateBillToJSON(e){
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                billTo: {
                    ...prevJSON.billTo,
                    [e.target.id]:e.target.value
                }
            }
        })
    }
    function updateProjectDescription(e){
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                projectDescription:e.target.valuenewJSON
            }
        })
    }
    function updatePaymentTerms(e){
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                paymentTerms:e.target.value
            }
        })
    }  
    let itemLineElementsArray = []
    
    newJSON.itemList.forEach((listItem,i) => {
        let singleItemLineElement = (
            <div key={i} className={styles.singleItemLine}>
                <input required value={newJSON.itemList[i].itemName} data-listindex={i} id='itemName' onChange={updateItemList} style={bgColor} type="text" />
                <input required value={newJSON.itemList[i].itemQty}  data-listindex={i} id='itemQty' onChange={updateItemList} className={styles.itemTextStyle} style={bgColor} type="number" />
                <input required value={newJSON.itemList[i].itemPrice} data-listindex={i} id='itemPrice' onChange={updateItemList} className={styles.itemTextStyle} style={bgColor} type="number" />
                <p data-listindex={i} id='itemTextPrice' className={styles.itemTextPrice}>{newJSON.itemList[i].listItemTotalFormatted}</p>
                {/* <div data-listindex={i} className={styles.trashIcon}><img src={trashIcon} alt="remove item" /></div> */}
            </div>
        )
        itemLineElementsArray.push(singleItemLineElement)
    })
    function createNewItemLine(){
        setJSON(prevJSON=>{
            let updatedJSON = {...prevJSON}
            updatedJSON.itemList.push({
                'itemName':'',
                'itemQty':'',
                'itemPrice':'',
                'listItemTotal':''
            })
            return updatedJSON
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        submitToAPI()
        window.location.reload()
    }
    let submitToAPI = async ()=>{
        let apiCall = await fetch(`http://localhost:8000/${props.invoiceId}`,{
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({...newJSON})
        })
        let data = await apiCall.json()
        console.log(data);
    }
    // function displayDate(date){
    //     return `${date.getMonth()}-${date.getDate()}-${date.getYear()}`
    // }
    let [currentDateDisplay,setCurrentDateDisplay] = useState('MM-DD-YYYY')
    useEffect(()=>{
        firstRender.current = false
        // setCurrentDateDisplay(displayDate(newJSON.invoiceDate))
    })
    async function getInvoice(){
        let apiCall = await fetch(`http://localhost:8000/${props.invoiceId}`)
        let data = await apiCall.json()
        setJSON(data)
    }
    useEffect(()=>{
        getInvoice()
    },[])
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
    console.log(newJSON)

    return (
        <div style={props.theme.main} className={props.isActive ? styles.newInvoiceModalContainer:styles.newInvoiceModalInactive}>
            <h3>Edit Invoice</h3>
            <form onSubmit={handleSubmit} className={styles.newInvoiceForm}>
                <div className={styles.labelInputPair}>
                    <label htmlFor="invoiceID">Invoice ID</label>
                    <input value={newJSON.invoiceID} onChange={updateInvoiceID} style={bgColor} id='invoiceID' type="text" required/>
                    <label  htmlFor="invoiceStatus">Invoice Status</label>
                    <select value={newJSON.invoiceStatus} onChange={updateInvoiceStatus} style={bgColor} name="invoiceStatus" id="invoiceStatus">
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <div className={styles.billFromContainer}>
                    <h4>Bill From</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="street">Street Address</label>
                        <input required value={newJSON.billFrom.street} onChange={updateBillFromJSON} style={bgColor} id='street' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="city">City</label>
                            <input required value={newJSON.billFrom.city} onChange={updateBillFromJSON} style={bgColor} id='city' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="zipCode">Zip Code</label>
                            <input required value={newJSON.billFrom.zipCode} onChange={updateBillFromJSON} style={bgColor} id='zipCode' type="number" />
                        </div>
                        <div className={styles.labelInputPair}>                            
                            <label htmlFor="country">Country</label>
                            <input required value={newJSON.billFrom.country} onChange={updateBillFromJSON} style={bgColor} id='country' type="text" />
                        </div>
                    </div>
                </div>
                <div className={styles.billToContainer}>
                    <h4>Bill To</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientName">Client Name</label>
                        <input required value={newJSON.billTo.clientName} onChange={updateBillToJSON} style={bgColor} id='clientName' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientEmail">Client Email</label>
                        <input required value={newJSON.billTo.clientEmail} onChange={updateBillToJSON} style={bgColor} id='clientEmail' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientStreet">Street Address</label>
                        <input required value={newJSON.billTo.clientStreet} onChange={updateBillToJSON} style={bgColor} id='clientStreet' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCity">City</label>
                            <input required value={newJSON.billTo.clientCity} onChange={updateBillToJSON} style={bgColor} id='clientCity' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientZipCode">Zip Code</label>
                            <input required value={newJSON.billTo.clientZipCode} onChange={updateBillToJSON} style={bgColor} id='clientZipCode' type="number" />                        
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCountry">Country</label>
                            <input required value={newJSON.billTo.clientCountry} onChange={updateBillToJSON} style={bgColor} id='clientCountry' type="text" />                        
                        </div>
                    </div>
                </div>
                <div className={styles.invoiceDateAndTerm}>
                    <div className={styles.labelInputPair}>
                        <label style={themeColor} htmlFor="invoiceDate">Invoice Date</label>
                        <input tabIndex='-1' style={dateTheme} placeholder={formatDueDate(newJSON.invoiceDate)} id='invoiceDate' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="paymentTerms">Payment Terms</label>
                        <select value={newJSON.paymentTerms} onChange={updatePaymentTerms} style={bgColor} name="paymentTerms" id="paymentTerms">
                            <option style={bgColor} value='30'>30 Days</option>
                            <option style={bgColor} value='60'>60 Days</option>
                        </select>
                    </div>
                </div>
                <div className={styles.labelInputPair}>
                    <label htmlFor="projectDescription">Project Description</label>
                    <input required value={newJSON.projectDescription} onChange={updateProjectDescription} style={bgColor} type="text" />
                </div>
                <div className={styles.itemListContainer}>
                    <h5>Item List</h5>
                    <div className={styles.itemListColDesc}>
                        <p>Item Name</p>
                        <p>Qty.</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    {itemLineElementsArray}
                    <div onClick={createNewItemLine} style={bgColor} className={styles.addNewItemBtn}>+ Add New Item</div>
                </div>
                <div className={styles.cancelSaveBtn}>
                    <p onClick={props.handleCancel} style={bgColor}>Cancel</p>
                    <button className={styles.submitNewInvoiceBtn} type='submit'>Submit Invoice</button>
                </div>
            </form>
        </div>
    )
}