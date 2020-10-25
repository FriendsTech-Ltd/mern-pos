import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const Footer = () => {
    return (
        <Box p={3}>
               <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}{' '}
     
      Developed by Abdulla naser & Md Shohedul Islam
     
      {'.'}
    </Typography>
    
      </Box>
     
       
    )
}
export default Footer;