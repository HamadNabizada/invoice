import styles from '../styles/NewInvoiceModal.module.css'

export default function NewInvoice(props){
    let bgColor = {
        backgroundColor: props.theme.subBG.backgroundColor,
        border: props.theme.lightTheme ? '1px solid black':'1px solid white'
        // boxShadow: props.theme.subBG.boxShadow
    }
    let themeColor = {
       color: props.theme.lightTheme ?  'rgba(0,0,0,.75)':'rgba(255,255,255,.55)'
    }
    let dateTheme = {
        backgroundColor: props.theme.lightTheme ?  'rgba(0,0,0,.5)':'rgba(255,255,255,.55)'
    }
   
    return (
        <div style={props.theme.main} className={styles.newInvoiceModalContainer}>
            <h3>New Invoice</h3>
            <form action="/createNewInvoice" method='POST'>
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
                        <select name="paymentTerms" id="paymentTerms">
                            <option value="30days">30 Days</option>
                            <option value="60days">60 Days</option>
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
                    <div className={styles.singleItemLine}>
                        <input style={bgColor} type="text" />
                        <input style={bgColor} type="number" />
                        <input style={bgColor} type="number" />
                        <p>$130.42</p>
                        <p>TrashIcon</p>
                    </div>
                    <div style={bgColor} className={styles.addNewItemBtn}>+ Add New Item</div>
                </div>
                <div className={styles.cancelSaveBtn}>
                    <p style={bgColor}>Cancel</p>
                    <button type='submit'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}