import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {
  Col, Row, Typography,
} from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../api/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';

import { ICryptoDetails } from '../types';

const { Title, Text } = Typography;

type IStats = {
  title?: string;
  value?: number | string | JSX.Element;
  icon?: JSX.Element;
}

const CryptoDetails = (): JSX.Element => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails: ICryptoDetails | undefined = data?.data?.coin;

  if (!cryptoDetails && isFetching) return <Loader />;

  const stats: Array<IStats> = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.volume ? millify(cryptoDetails.volume) : 0}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails?.marketCap ? millify(cryptoDetails.marketCap) : 0}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${cryptoDetails?.allTimeHigh?.price ? millify(cryptoDetails.allTimeHigh.price) : 0}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats: Array<IStats> = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets ? cryptoDetails.numberOfMarkets : 0,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges ? cryptoDetails.numberOfExchanges : 0,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: cryptoDetails?.supply?.total ? `$ ${millify(cryptoDetails.supply.total)}` : 'Unavailble',
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: cryptoDetails?.supply?.circulating ? `$ ${millify(cryptoDetails.supply.circulating)}` : 'Unavailble',
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name}
          {' '}
          (
          {cryptoDetails?.symbol}
          ) Price
        </Title>
        <p>
          {cryptoDetails?.name}
          {' '}
          live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={cryptoDetails?.price ? millify(cryptoDetails.price) : '0'}
        coinName={cryptoDetails?.name ? cryptoDetails.name : 'Undefined name'}
        setTimeperiod={setTimeperiod}
      />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails?.name}
              {' '}
              Value Statistics
            </Title>
            <p>
              An overview showing the statistics of
              {' '}
              {cryptoDetails?.name}
              , such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats' key={`${title}`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of
              {' '}
              {cryptoDetails?.name}
              , such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats' key={`${title}`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is
            {' '}
            {cryptoDetails?.name}
            ?
          </Title>
          {
            cryptoDetails?.description ? (
              <>
                {HTMLReactParser(cryptoDetails.description)}
              </>
            ) : <div>No data</div>
          }
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name}
            {' '}
            Links
          </Title>
          {cryptoDetails?.links && cryptoDetails?.links?.map((link: any) => (
            <Row className='coin-link' key={`${link.name}-${link.url}`}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
