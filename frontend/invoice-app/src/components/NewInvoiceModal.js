import styles from '../styles/NewInvoiceModal.module.css'
import trashIcon from '../assets/trash.svg'
import {useState} from 'react'

export default function NewInvoice(props){
    //Light/Dark Theme
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

    /*let newInvoiceJSON = {
        {
            "invoiceID": String,
            "billFrom": {
                'street': String,
                'city':String,
                'zipcode':Number,
                'country':String
            },
            'billTo':{
                'clientName':String,
                'clientEmail':String,
                'clientstreet': String,
                'clientcity':String,
                'clientzipcode':Number,
                'clientcountry':String
            },
            // 'invoiceDate':Date,
            // 'paymentDue':Date,
            'paymentTerms':Number,
            'productDescription':String,
            'itemList':{
                'listItem':{
                    'itemName':String,
                    'itemQTY':Number,
                    'itemPrice':Number,
                    'listItemTotal':Number
                }
            },
            'totalInvoice':Number
        }
    }*/

    //New Line Item Logic
    let [itemLineCounter, setItemLineCounter] = useState(0)
    let singleItemLineElement = (
        <div className={styles.singleItemLine}>
            <input style={bgColor} type="text" />
            <input className={styles.itemTextStyle} style={bgColor} type="number" />
            <input className={styles.itemTextStyle} style={bgColor} type="number" />
            <p className={styles.itemTextPrice}>$130.42</p>
            <div className={styles.trashIcon}><img src={trashIcon} alt="remove item" /></div>
        </div>
    )
    let itemLineArray = []
    for (let i = 0; i < itemLineCounter; i++) {
        let singleItemLineElement = (
            <div key={i} className={styles.singleItemLine}>
                <input style={bgColor} type="text" />
                <input className={styles.itemTextStyle} style={bgColor} type="number" />
                <input className={styles.itemTextStyle} style={bgColor} type="number" />
                <p className={styles.itemTextPrice}>$130.42</p>
                <div className={styles.trashIcon}><img src={trashIcon} alt="remove item" /></div>
            </div>
        )
        itemLineArray.push(singleItemLineElement)
    }
    function createNewItemLine(){
        setItemLineCounter(prevCounter => {
            let newCounter = prevCounter + 1
            return newCounter
        })
    }

    return (
        <div style={props.theme.main} className={props.isActive ? styles.newInvoiceModalContainer:styles.newInvoiceModalInactive}>
            <h3>New Invoice</h3>
            <form className={styles.newInvoiceForm} action="/createNewInvoice" method='POST'>
                <div className={styles.labelInputPair}>
                    <label htmlFor="invoiceID">Invoice ID</label>
                    <input style={bgColor} id='invoiceID' type="text" />
                </div>
                <div className={styles.billFromContainer}>
                    <h4>Bill From</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="street">Street Address</label>
                        <input style={bgColor} id='street' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="city">City</label>
                            <input style={bgColor} id='city' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="zipCode">Zip Code</label>
                            <input style={bgColor} id='zipCode' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>                            
                            <label htmlFor="country">Country</label>
                            <input style={bgColor} id='country' type="text" />
                        </div>
                    </div>
                </div>
                <div className={styles.billToContainer}>
                    <h4>Bill To</h4>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientName">Client Name</label>
                        <input style={bgColor} id='clientName' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientEmail">Client Email</label>
                        <input style={bgColor} id='clientEmail' type="text" />
                    </div>
                    <div className={styles.labelInputPair}>
                        <label htmlFor="clientStreet">Street Address</label>
                        <input style={bgColor} id='clientStreet' type="text" />
                    </div>
                    <div className={styles.cityContainer}>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCity">City</label>
                            <input style={bgColor} id='clientCity' type="text" />
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientZipCode">Zip Code</label>
                            <input style={bgColor} id='clientZipCode' type="text" />                        
                        </div>
                        <div className={styles.labelInputPair}>
                            <label htmlFor="clientCountry">Country</label>
                            <input style={bgColor} id='clientCountry' type="text" />                        
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
                        <select style={bgColor} name="paymentTerms" id="paymentTerms">
                            <option style={bgColor} value="30days">30 Days</option>
                            <option style={bgColor} value="60days">60 Days</option>
                        </select>
                    </div>
                </div>
                <div className={styles.labelInputPair}>
                    <label htmlFor="projectDescription">Project Description</label>
                    <input style={bgColor} type="text" />
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