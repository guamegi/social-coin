import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { history, info } from "../api";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: symbol,
    });
    // console.log(symbol);
  }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    info
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    history
  );

  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((data) => ({
          x: new Date(data.timestamp).getTime(),
          y: data.price,
        }))
      );
    }
  }, [historyData]);
  // console.log(victoryData);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={390}>
          <VictoryLine
            animate
            data={victoryData}
            interpolation="cardinal"
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      ) : (
        <Loader>
          <ActivityIndicator color="white" />
        </Loader>
      )}
    </Container>
  );
};

export default Detail;
