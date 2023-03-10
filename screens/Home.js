import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { BLACK_COLOR } from "../colors";
import {
  ActivityIndicator,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import auth from "@react-native-firebase/auth";
import { coins } from "../api";
import Coin from "../components/Coin";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;
const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;
const Home = ({ navigation }) => {
  const { isLoading, data } = useQuery("coins", coins);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Ionicons name="log-out-outline" color="white" size={26} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
      );
    }
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        data={cleanData}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} symbol={item.symbol} id={item.id} />
        )}
      />
    </Container>
  );
};

export default Home;
