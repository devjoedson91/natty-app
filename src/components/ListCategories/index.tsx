import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCategory,
  ButtonCategory,
  Name,
  List,
  IconCategory
} from "./styles";

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
