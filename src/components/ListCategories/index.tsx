import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCategory,
  ButtonCategory,
  Name,
  List,
  IconCategory
} from "./styles";
import Corte from "../../assets/corte.svg";

import { api } from "../../services/api";

interface CategoryProps {
  id: string;
  name: string;
  icon: string;
}

export default function ListCategories() {
  const [categories, setCategories] = useState<CategoryProps[] | []>([]);

  useEffect(() => {
    async function getCategories() {
      const response = await api.get("/category");

      setCategories(response.data);
    }

    getCategories();
  }, []);

  return (
    <Container>
      <List
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ContainerCategory>
            <ButtonCategory>
                <IconCategory source={{uri: 'http://192.168.2.118:3333/files/corte.png'}}/>
            </ButtonCategory>
            <Name>{item.name}</Name>
        </ContainerCategory>}
        numColumns={3}
      />
    </Container>
  );
}
