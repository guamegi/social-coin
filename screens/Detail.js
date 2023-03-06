import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { history, info } from "../api";

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
  console.log(infoData);
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
