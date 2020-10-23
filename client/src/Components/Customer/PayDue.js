import React, { useContext, useState } from 'react';
import { Button,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerContext from '../../context/CustomerContext/CustomerContext';
const useStyles = makeStyles((theme) => ({
    payButton:{
        paddingTop:5,
    }
}));

const PayDue = ({customerId}) => {
    const classes = useStyles()
    const { payDue } = useContext(CustomerContext);


    const [payAmount,setPayAmount]=useState(null)

    const onPay=()=>{

        payDue({payAmount,_id:customerId})
        setPayAmount(null)
    }   

    return (
        <div>
            <TextField
            size="small"
            variant="outlined"
            type="number"
            required
            label="Pay amount"
            name="pay"
            onChange={(e)=>setPayAmount(e.target.value)}
            />
            <div className={classes.payButton}>
            <Button  variant="outlined" onClick={()=>onPay()}color="primary" >Pay due</Button>
            </div>
         

        </div>
    )
}

export default PayDue
