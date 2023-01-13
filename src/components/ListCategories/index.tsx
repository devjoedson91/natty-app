import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCategory,
  ButtonCategory,
  Name,
  IconCategory,
  Title
} from "./styles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { api } from "../../services/api";

import { StackParamsList } from '../../routes/app.routes';
import { FlatList } from "react-native";

interface CategoryProps {
  id: string;
  name: string;
  icon: string;
}

export default function ListCategories() {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  
  const [categories, setCategories] = useState<CategoryProps[] | []>([]);

  useEffect(() => {
    async function getCategories() {
      const response = await api.get("/category");

      setCategories(response.data);
    }

    getCategories();
  }, []);

  function handleCategoryServices(category_id: string) {

      navigation.navigate('Services', {category_id});

  }

  return (
    <Container>
      <Title>categorias</Title>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ContainerCategory>
            <ButtonCategory onPress={() => handleCategoryServices(item.id)}>
                <IconCategory source={{uri: `${item.icon}`}}/>
            </ButtonCategory>
            <Name>
              {item.name[0].toUpperCase()+item.name.substring(1).toLowerCase()}
            </Name>
        </ContainerCategory>}
        numColumns={3}
      />
    </Container>
  );
}
