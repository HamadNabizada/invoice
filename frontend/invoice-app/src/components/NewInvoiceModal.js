import styles from '../styles/NewInvoiceModal.module.css'
import trashIcon from '../assets/trash.svg'
import {useState, useEffect} from 'react'

export default function NewInvoice(props){
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

    let [newJSON,setJSON] = useState({
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
        'invoiceStatus':''
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

    function updateItemList(e){
        setItemList(prevItemList =>{
            let newItemList = prevItemList.map((listItem,i) =>{
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
            return newItemList
        })
        setItemList(prevList=>{
            let newList = prevList.map(listItem=>{
                let totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listItem.itemQty * listItem.itemPrice)
                return {
                    ...listItem,
                    itemLineTotal: totalPrice
                }
            })
            return newList
        })
        setJSON(prevJSON=>{
            let newJSON = {
                ...prevJSON,
                itemList: itemList
            }
            return newJSON
        })
    }
    let [invoiceID, setInvoiceID] = useState('')
    let [billFromJSON, setBillFromJSON]=useState({
        'street': '',
        'city':'',
        'zipCode':'',
        'country':''
    })
    let [billToJSON, setBillToJSON]=useState({
        'clientName':'',
        'clientEmail':'',
        'clientStreet': '',
        'clientCity':'',
        'clientZipCode':'',
        'clientCountry':''
    })
    let [paymentTerms,setPaymentTerms]=useState('30')
    function updateInvoiceID(e){
        setInvoiceID(prevID =>{
            return e.target.value
        })
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                invoiceID: invoiceID
            }
        })

    }
    let [projectDescription, setProjectDescription] = useState('')
    function updateBillFromJSON(e){
        setBillFromJSON(prevJSON =>{
            return{
                ...prevJSON,
                [e.target.id]:e.target.value
            }
        })
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                billFrom: billFromJSON
            }
        })
    }
    function updateBillToJSON(e){
        setBillToJSON(prevJSON =>{
            return{
                ...prevJSON,
                [e.target.id]:e.target.value
            }
        })
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                billTo: billToJSON
            }
        })
    }
    function updateProjectDescription(e){
        setProjectDescription(e.target.value)
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                projectDescription:projectDescription
            }
        })

    }
    function updatePaymentTerms(e){
        setPaymentTerms(e.target.value)
        setJSON(prevJSON=>{
            return{
                ...prevJSON,
                paymentTerms:paymentTerms
            }
        })
    }  
    let itemLineArray = []
    for (let i = 0; i < itemLineCounter; i++) {
        let singleItemLineElement = (
            <div key={i} className={styles.singleItemLine}>
                <input data-listindex={i} id='itemName' onChange={updateItemList} style={bgColor} type="text" />
                <input data-listindex={i} id='itemQty' onChange={updateItemList} className={styles.itemTextStyle} style={bgColor} type="number" />
                <input placeholder='0' data-listindex={i} id='itemPrice' onChange={updateItemList} className={styles.itemTextStyle} style={bgColor} type="number" />
                <p data-listindex={i} id='itemTextPrice' className={styles.itemTextPrice}>{itemList[i].itemLineTotal}</p>
                <div data-listindex={i} className={styles.trashIcon}><img src={trashIcon} alt="remove item" /></div>
            </div>
        )
        itemLineArray.push(singleItemLineElement)
    }
    function createNewItemLine(){
        setItemList(prevList=>{
            let newList = prevList.map(ListItem=>{
                return {
                    ...ListItem
                }
            })
            newList.push(itemListObj)
            return newList
        })
        setItemLineCounter(prevCounter => {
            let newCounter = prevCounter + 1
            return newCounter
        })
        
    }

    useEffect(()=>{
        console.log(newJSON)
    })
    return (
        <div style={props.theme.main} className={props.isActive ? styles.newInvoiceModalContainer:styles.newInvoiceModalInactive}>
            <h3>New Invoice</h3>
            <form className={styles.newInvoiceForm} action="/createNewInvoice" method='POST'>
                <div className={styles.labelInputPair}>
                    <label htmlFor="invoiceID">Invoice ID</label>
                    <input value={invoiceID} onChange={updateInvoiceID} style={bgColor} id='invoiceID' type="text" required/>
                </div>
                <div className={styles.billFromContainer}>
                    <h4>Bill From</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="street">Street Address</label>
                        <input value={billFromJSON.street} onChange={updateBillFromJSON} style={bgColor} id='street' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="city">City</label>
                            <input value={billFromJSON.city} onChange={updateBillFromJSON} style={bgColor} id='city' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="zipCode">Zip Code</label>
                            <input value={billFromJSON.zipCode} onChange={updateBillFromJSON} style={bgColor} id='zipCode' type="number" />
                        </div>
                        <div className={styles.labelInputPair}>                            
                            <label htmlFor="country">Country</label>
                            <input value={billFromJSON.country} onChange={updateBillFromJSON} style={bgColor} id='country' type="text" />
                        </div>
                    </div>
                </div>
                <div className={styles.billToContainer}>
                    <h4>Bill To</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientName">Client Name</label>
                        <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientName' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientEmail">Client Email</label>
                        <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientEmail' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientStreet">Street Address</label>
                        <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientStreet' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCity">City</label>
                            <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientCity' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientZipCode">Zip Code</label>
                            <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientZipCode' type="number" />                        
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCountry">Country</label>
                            <input value={billToJSON.street} onChange={updateBillToJSON} style={bgColor} id='clientCountry' type="text" />                        
                        </div>
                    </div>
                </div>
                <div className={styles.invoiceDateAndTerm}>
                    <div className={styles.labelInputPair}>
                        <label style={themeColor} htmlFor="invoiceDate">Invoice Date</label>
                        <input style={dateTheme} id='invoiceDate' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="paymentTerms">Payment Terms</label>
                        <select onClick={updatePaymentTerms} style={bgColor} name="paymentTerms" id="paymentTerms">
                            <option style={bgColor} value='30'>30 Days</option>
                            <option style={bgColor} value='60'>60 Days</option>
                        </select>
                    </div>
                </div>
                <div className={styles.labelInputPair}>
                    <label htmlFor="projectDescription">Project Description</label>
                    <input value={projectDescription} onChange={updateProjectDescription} style={bgColor} type="text" />
                </div>
                <div className={styles.itemListContainer}>
                    <h5>Item List</h5>
                    <div className={styles.itemListColDesc}>
                        <p>Item Name</p>
                        <p>Qty.</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    {itemLineArray}
                    <div onClick={createNewItemLine} style={bgColor} className={styles.addNewItemBtn}>+ Add New Item</div>
                </div>
                <div className={styles.cancelSaveBtn}>
                    <p onClick={props.handleCancel} style={bgColor}>Cancel</p>
                    <button className={styles.submitNewInvoiceBtn} type='submit'>Save Draft</button>
                    <button className={styles.submitNewInvoiceBtn} type='submit'>Submit Invoice</button>
                </div>
            </form>
        </div>
    )
}