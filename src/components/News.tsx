import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from "../components";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl =
 "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";


interface INews {
  simplified?: boolean;
}

const News = ({ simplified }: INews) => {
 const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
 const { data: cryptoNews } = useGetCryptoNewsQuery({
  newsCategory,
  count: simplified ? 6 : 12,
 });
 const { data } = useGetCryptosQuery(100);

 if (!cryptoNews?.value) return <Loader/>;

 return (
  <Row gutter={[32, 32]}>
   {!simplified && (
    <Col span={24}>
     <Select
      showSearch
      className="select-news"
      placeholder="Select a Crypto"
      optionFilterProp="children"
      onChange={(val) => setNewsCategory(val)}
      filterOption={(input, option) =>
      // @ts-ignore
       option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
     >
      <Option value="Cryptocurrency">Cryptocurrency</Option>
      {data?.data?.coins.map((coin: any) => (
       <Option value={coin.name}>{coin.name}</Option>
      ))}
     </Select>
    </Col>
   )}
   {cryptoNews.value.map((news: any, idx: number) => (
    <Col xs={24} sm={12} lg={8} key={idx}>
     <Card hoverable className="news-card">
      <a href={news.url} target="_blank" rel="noreferrer">
       <div className="news-image-container">
        <Title className="news-title" level={4}>
         {news.name}
        </Title>
        <img
         style={{ maxWidth: "200px", maxHeight: "100px" }}
         src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
         alt="news"
        />
       </div>
       <p>
        {news.description > 100
         ? `${news.description.substring(0, 100)}...`
         : news.description}
       </p>
       <div className="provider-container">
        <div>
         <Avatar
          src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl}
          alt="news"
         />
         <Text className="provider-name">{news.provider[0]?.name}</Text>
             </div>
        {/* @ts-ignore */}
        <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
       </div>
      </a>
     </Card>
    </Col>
   ))}
  </Row>
 );
};

export default News;