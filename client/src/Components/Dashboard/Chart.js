import React,{useContext,useEffect} from 'react';
import moment from 'moment'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'


export default function Chart() {

  const theme = useTheme();
  const {getTodaySale,todaySale} = useContext(InvoiceContext)

  useEffect(()=>{
    getTodaySale();
    // eslint-disable-next-line
  },[])

const data = todaySale.map((t)=>{
 return  {time:moment(t.createdAt).format('h:mm'), amount: t.totalAmountAfterDiscount}
})


  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (৳)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}