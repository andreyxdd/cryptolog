import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, Title as ChartJSTitle, CategoryScale,
} from 'chart.js';
import {
  Col, Row, Typography, Select,
} from 'antd';
import moment from 'moment';

ChartJS.register(LineElement, PointElement, LinearScale, ChartJSTitle, CategoryScale);

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface ILineChart {
  coinHistory: any;
  currentPrice: string;
  coinName: string;
  // eslint-disable-next-line no-unused-vars
  setTimeperiod: (time: string) => void;
}

const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

const LineChart: React.FC<ILineChart> = ({
  coinHistory, currentPrice, coinName, setTimeperiod,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      moment(new Date(coinHistory.data.history[i].timestamp * 1000)).format('YYYY-MM-DD[T]HH:mm'),
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  return (
    <div style={{ paddingBottom: 30, borderBottom: 'solid 1px #d9d9d9' }}>
      <Row className='chart-header'>
        <div>
          <Title level={3} className='chart-title'>
            {coinName}
            {' '}
            Pirce Chart
          </Title>
          <Col className='price-container'>
            <Paragraph
              style={{ paddingTop: 20 }}
            >
              Select period:
            </Paragraph>
            <Select
              defaultValue='7d'
              className='select-timeperiod'
              placeholder='Select Timeperiod'
              onChange={(value) => setTimeperiod(value)}
              style={{ marginBottom: 15 }}
            >
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
          </Col>
        </div>
        <Col
          className='price-container'
          style={{ paddingTop: 70 }}
        >
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}
            %
          </Title>

          <Title level={5} className='current-price'>
            Current
            {' '}
            {coinName}
            {' '}
            Price: $
            {' '}
            {currentPrice}
            %
          </Title>
        </Col>
      </Row>
      <Line data={data} height='70%' />
    </div>
  );
};

export default LineChart;
