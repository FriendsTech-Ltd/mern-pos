import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
const Footer = () => {
    return (
        <Box p={3}>
               <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}{' '}
      <Link color="inherit" href="">
      Develop by Abdulla naser & Md Shohedul
      </Link>
      {'.'}
    </Typography>
      {/* <footer>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        <CopyrightIcon/> 
        </Typography>
        
      </footer> */}
      </Box>
     
       
    )
}
export default Footer;