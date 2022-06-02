import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Input, Typography,
} from 'antd';
import { Loader } from '.';

import { useGetCryptosQuery } from '../api/cryptoApi';

import { ICrypto } from '../types';

const { Title } = Typography;

interface ICryptocurrencies {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<ICryptocurrencies> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<Array<ICrypto>>([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const filteredData = cryptosList
      ?.data
      ?.coins
      .filter((coin: any) => coin.name.toLowerCase().includes(searchItem.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchItem]);

  if (!cryptos && isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <>
          <Title level={2} className='heading'>
            Top 100 Cryptocurrencies
          </Title>
          <div className='search-crypto'>
            <Input
              placeholder='Search cryptocurrencies by name'
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
        </>
      )}
      {cryptos && cryptos.length > 0 ? (
        <Row gutter={[32, 32]} className='crypto-card-container'>
          {cryptos.map((currency: ICrypto) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className='crypto-card'
              key={`${currency.name}-key`}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={(
                    <img
                      alt='crypto'
                      className='crypto'
                      src={currency.iconUrl}
                      width={40}
                      height={40}
                    />
                  )}
                  hoverable
                >
                  <p>
                    Price:
                    {' '}
                    {millify(currency.price)}
                  </p>
                  <p>
                    Market Cap:
                    {' '}
                    {millify(currency.marketCap)}
                  </p>
                  <p>
                    Daily Change:
                    {' '}
                    {millify(currency.change)}
                    %
                  </p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className='crypto-empty-container'>
          <Title level={4} className='heading'>
            No availblbe data
          </Title>
        </Row>
      )}
    </>
  );
};

export default Cryptocurrencies;
