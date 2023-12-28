import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

 

const Dashboard = () => {
  const [stockData1, setStockData1] = useState([]);
  const [stockData2, setStockData2] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch your initial stock data
    fetchData('msft'); // Replace with your default stock symbol
  }, []);

  const fetchData = async (symbol) => {
    try {
      const response1 = await fetch(`https://api.iex.cloud/v1/data/core/historical_prices/${symbol}?range=2m&token=pk_92e729c5b8074e11bdff1bb53bb9d0ff`);
      const data1 = await response1.json();
      setStockData1(data1);
      const response2 = await fetch(`https://api.iex.cloud/v1/data/CORE/QUOTE/${symbol}?token=pk_92e729c5b8074e11bdff1bb53bb9d0ff`);
      const data2 = await response2.json();
      setStockData2(data2);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSearch = () => {
    fetchData(searchQuery);
  };
   const formattedData1 = stockData1.map(item => ({
    date: item.priceDate,
    close: item.close,
  }));
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , color:'black' }}>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <br />
        
        
        <div style={{ marginBottom: '0px' }}>
       
          <input
            type="search"
            className="inp"
            style={{ padding: '10px', marginRight: '5px' }}
            placeholder="Search for a stock"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" className="btn" onClick={handleSearch}>
            Search
          </button>
          <h1 style={{color:'green',fontWeight:'bold'}}>Stock Market Basic Dashboard</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1', minWidth: '400', marginBottom: '20px',  backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{color:'green',fontWeight:'bold'}}> {stockData2.length>0?stockData2[0].companyName:"Data Not Available" }</h3>
            <ResponsiveContainer width={500} height={400}>
              <LineChart data={formattedData1.reverse()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" type="category" allowDuplicatedCategory={false}>
                  <Label value="Date(yy-mm-dd)" offset={0} position="insideBottomRight" />
                </XAxis>
                <YAxis>
                  <Label value="($)" offset={0} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        
          <div style={{ flex: '1', minWidth: '400px', marginBottom: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{color:'green',fontWeight:'bold'}}> {stockData2.length>0?stockData2[0].companyName:"Data Not Available" }</h3>
            <table>
              <tr>
                <td>Attribute</td>
                <td>Value</td>
                </tr>
                <tr>
                  <td>Open</td>
                  <td>{stockData2.length>0?stockData2[0].companyName:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Close</td>
                  <td>{stockData2.length>0?stockData2[0].close:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Change</td>
                  <td >{stockData2.length>0?stockData2[0].change:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td >Percentage Change</td>
                  <td  >{stockData2.length>0?stockData2[0].changePercentage:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>High</td>
                  <td>{stockData2.length>0?stockData2[0].high:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>{stockData2.length>0?stockData2[0].low:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Latest Time</td>
                  <td>{stockData2.length>0?stockData2[0].latestTime:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Latest Price</td>
                  <td>{stockData2.length>0?stockData2[0].latestPrice:"Data Not Available" }</td>
                </tr>
                <tr>
                  <td>Currency</td>
                  <td>{stockData2.length>0?stockData2[0].currency:"Data Not Available" }</td>
                </tr>
            </table>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
