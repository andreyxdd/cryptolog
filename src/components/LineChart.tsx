import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title as ChartJSTitle, CategoryScale } from 'chart.js';
import { Col, Row, Typography } from "antd";
import moment from "moment";


ChartJS.register(LineElement, PointElement, LinearScale, ChartJSTitle, CategoryScale);

const { Title } = Typography;

interface ILineChart {
  coinHistory: any;
  currentPrice: any;
  coinName: any;
}

const LineChart = ({ coinHistory, currentPrice, coinName }: ILineChart) => {
 const coinPrice = [];
 const coinTimestamp = [];

 for (let i = 0; i < coinHistory?.data.history?.length; i += 1) {
   coinPrice.push(coinHistory.data.history[i].price);
  coinTimestamp.push(
    moment(new Date(coinHistory.data.history[i].timestamp * 1000)).format("YYYY-MM-DD[T]HH:mm")
  );
 }

 const data = {
  labels: coinTimestamp,
  datasets: [
   {
    label: "Price In USD",
    data: coinPrice,
    fill: false,
    backgroundColor: "#0071bd",
    borderColor: "#0071bd",
   },
  ],
 };


 return (
  <>
   <Row className="chart-header">
    <Title level={2} className="chart-title">
     {coinName} Pirce Chart
    </Title>
    <Col className="price-container">
     <Title level={5} className="price-change">
      {coinHistory?.data?.change}%
     </Title>
     <Title level={5} className="current-price">
      Current {coinName} Price: $ {currentPrice}%
     </Title>
    </Col>
  </Row>
  {/* @ts-ignore */}
  <Line data={data}   />
  </>
 );
};

export default LineChart;