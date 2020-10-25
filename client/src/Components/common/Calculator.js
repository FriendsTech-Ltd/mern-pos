import React from 'react'
import Calculator from '@pie-framework/material-ui-calculator';
import {Link} from 'react-router-dom'

import { Button,Paper,makeStyles,Container} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tittle: {
      height: 60,
      padding:0,
      margin:0,
      display:'flex'
    },
  backButton:{
      padding:5,
    },

    content:{
       margin:"auto",
       flexGrow: 1,
       alignItems: 'center',
       height: '77vh',
    },
    middleContent:{
        paddingLeft:'35%',
        margin:"auto", 
        alignItems: 'center',
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
    spinner: {
      textAlign: 'center',
      marginTop:'15%'
    
    },
   
  }))
 const CalculatorComponent = () => {


    const classes = useStyles()

 

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

      <div>
           <Paper variant="outlined" elevation={5} className={classes.content}>
               <Container  className={classes.middleContent}>
               <Calculator mode="basic" onEvaluateExpression={(expression, result) => {}} />
               </Container>
        
        
          </Paper> 
        
        </div>

      
        </div>
    )
}
export default CalculatorComponent;
