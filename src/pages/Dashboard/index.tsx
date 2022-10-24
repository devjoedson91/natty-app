import React, { useEffect, useState } from 'react';
import {
    Container, 
    Title, 
    ContainerCategories
} from './styles';

import ListCategories from '../../components/ListCategories';


export default function Dashboard() {

    return (
        <Container>
            <Title>Categorias</Title>

            <ListCategories />
        </Container>
    );

}