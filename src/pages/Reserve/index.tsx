import React, { useEffect, useState } from "react";
import {
  Container,
  TextHeader,
  ButtonReserve,
  ButtonText,
  Schedule,
  ScheduleText,
  ButtonHour,
  ScheduleList,
  HourText,
  ListText
} from "./styles";
import { StyleSheet } from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";


type RouteDetailsParams = {
  Reserve: {
      service_id: string;
  }   
}

type ReserveRouteProps = RouteProp<RouteDetailsParams, 'Reserve'>;

interface DateProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface ScheduleProps {
   id: string;
   date: string;
   hour: string;
   service_id: string;
}

export default function Reserve() {

  LocaleConfig.locales["br"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul.",
      "Ago",
      "Set.",
      "Out.",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    today: "Hoje",
  };
  LocaleConfig.defaultLocale = "br";

  const route = useRoute<ReserveRouteProps>();
  const [dataSchedule, setDataSchedule] = useState<ScheduleProps[] | []>([]);
  const [filterSchedule, setFilterSchedule] = useState<ScheduleProps[] | []>([]);
  const [dateSelected, setDateSelected] = useState<DateProps>();
  const [serviceSelected, setServiceSelected] = useState(route.params.service_id);
  const [selectedHour, setSelectedHour] = useState('');

  useEffect(() => {

      async function loadSchedule() {

          const response = await api.get('/schedule/service', {
            params: {service_id: serviceSelected}
          });

          setDataSchedule(response.data);

      }

      loadSchedule();

  }, []);

  useEffect(() => {

    const filters = dataSchedule.filter(hours => {

        return hours.date === dateSelected?.dateString;

    });

    setFilterSchedule(filters);

  }, [dateSelected]);

  function handleSelectHour(item_id: string) {

      const itemExists = filterSchedule.filter(item => item.id === item_id);

      setSelectedHour(itemExists[0].id);

  }

  return (
    <Container>
      <TextHeader>Escolha uma data e horário para sua reserva</TextHeader>
      <Calendar
        style={styles.calendar}
        initialDate={dateSelected?.dateString}
        onDayPress={(date) => {
          setDateSelected(date);
        }}
        horizontal={true}
        pagingEnabled={true}
      />

      <Schedule>
        <ScheduleText>Horários</ScheduleText>
        {
          filterSchedule.length > 0 ? (<ScheduleList
            data={filterSchedule}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ButtonHour onPress={() => handleSelectHour(item.id)} selected={item.id === selectedHour}>
                <HourText>
                  {item.hour}
                </HourText>
              </ButtonHour>
            )}
            horizontal={true}
          />) : (<ListText>Sem horários disponíveis para esta data</ListText>)
        }
      </Schedule>

      <ButtonReserve>
        <ButtonText>confirmar reserva</ButtonText>
      </ButtonReserve>
    </Container>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderColor: '#A5A4B4'
  },
});
