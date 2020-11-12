// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     height: 250,
//     maxWidth: 300,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// function renderRow({payHistory}) {
//   const { index, style } = payHistory;

//   return (
//     <ListItem button style={style} key={index}>
//       <ListItemText primary={`Item ${index + 1}`} />
//     </ListItem>
//   );
// }

// // renderRow.propTypes = {
// //   index: PropTypes.number.isRequired,
// //   style: PropTypes.object.isRequired,
// // };

// export default function VirtualizedList() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <FixedSizeList height={250} width={300} itemSize={46} itemCount={200}>
//       {renderRow}
//       </FixedSizeList>
//     </div>
//   );
// }
import React from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    
  },
  title:{
    textAlign:'center'
  }
});

export default function PayHistory({payHistory}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>

        <Typography className={classes.title}>Due Pay History</Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell>Sl</TableCell>
            <TableCell>date</TableCell>
            <TableCell align="right">pay Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payHistory.map((row,index) => (
            <TableRow key={index}>
               <TableCell align="right">{index+1}</TableCell>
              <TableCell component="th" scope="row">
            
                { moment(row.date).format("MMMM Do YYYY, hh:mm a")}
              </TableCell>
          
              <TableCell align="right">{row.payAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
