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
import { StyleSheet, ActivityIndicator, ToastAndroid } from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import {UserInfo} from '../Dashboard/index';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {StackParamsList} from '../../routes/app.routes';
import {ReservationsProps} from '../../@types/reservations';

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

type HoursList = {
  hour: string;
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
  const [dateSelected, setDateSelected] = useState<DateProps>();
  const [serviceSelected, setServiceSelected] = useState(route.params.service_id);
  const [hourSelected, setHourSelected] = useState('');
  const [userInfo, setUserInfor] = useState<UserInfo>();
  const [initialDate, setInitialDate] = useState(() => {

      const currentDate = new Date();

      const currentDay = currentDate.getDate().toString().length === 1 ? currentDate.getDate().toString().padStart(2, '0') : currentDate.getDate();

      return `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDay}`;

  });
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationsProps[] | []>([]);
  const [hoursReserved, setHoursReserved] = useState<HoursList[] | []>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  useEffect(() => {

      async function loadUser() {

          const response = await api.get('/userinfo');

          setUserInfor(response.data);

      }

      loadUser();
      
  }, []);

  useEffect(() => {

    async function loadReservations() {

      const response = await api.get('/reserve');

      setReservations(response.data);

    }
    
    loadReservations();

  }, []);

  useEffect(() => {

      async function loadSchedule() {

          const response = await api.get('/schedule/service', {
            params: {service_id: serviceSelected}
          });

          const filterSchedules = response.data.filter(schedule => {

              if (dateSelected?.dateString === undefined) {

                return schedule.date === initialDate;

              } else {

                return schedule.date === dateSelected?.dateString;
              }
            
          });

          if (dateSelected !== undefined) {

              let nowDateParse = Date.parse(initialDate);
              let selectedDateParse = Date.parse(dateSelected.dateString);
    
              if (selectedDateParse >= nowDateParse) {
                  setDataSchedule(filterSchedules);
              }
      
          } else {

             setDataSchedule(filterSchedules);

          }

      }

      loadSchedule();

      const mapHours = reservations.filter(reserve => {

          return reserve.date.slice(0, 10) === dateSelected?.dateString;

      }).map(item => item);

      setHoursReserved(mapHours);

  }, [dateSelected]);

  function handleSelectHour(item_hour: string) {

      const itemExists = dataSchedule.filter(item => item.hour === item_hour);

      console.log(itemExists[0].hour);

      setHourSelected(itemExists[0].hour);

  }

  async function handleSaveReserve() {

    if (hourSelected === '') {

        ToastAndroid.showWithGravity(
          'Informe um horário para a reserva',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        return;

    }

    setLoading(true);

    try {

        const response = await api.post('/reserve', {
          date: dateSelected?.dateString === undefined ? initialDate : dateSelected.dateString,
          hour: hourSelected,
          user_id: userInfo?.id,
          service_id: serviceSelected
        });

        setLoading(false);
        navigation.navigate('Dashboard');

    } catch(err) {

        console.log('erro ao cadastrar reserva: '+err);
        setLoading(false);

    }
  }

  return (
    <Container>
      <TextHeader>Escolha uma data e horário para sua reserva</TextHeader>
      <Calendar
        style={styles.calendar}
        initialDate={dateSelected?.dateString === undefined ? initialDate : dateSelected?.dateString}
        onDayPress={(date) => {
          setDateSelected(date);
        }}
        horizontal={true}
        pagingEnabled={true}
      />

      <Schedule>
        <ScheduleText>Horários disponíveis</ScheduleText>
        {
          dataSchedule.length > 0 ? (<ScheduleList
            data={dataSchedule}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ButtonHour onPress={() => handleSelectHour(item.hour)} selected={item.hour === hourSelected} isReserved={hoursReserved.some(hours => hours.hour === item.hour)}>
                <HourText>
                  {item.hour}
                </HourText>
              </ButtonHour>
            )}
            horizontal={true}
          />) : (<ListText>Sem horários disponíveis para esta data 🙁</ListText>)
        }
      </Schedule>

      <ButtonReserve onPress={handleSaveReserve} isClicked={loading}>
        {
          loading ? (<ActivityIndicator size={20} color="#fff"/>) : (<ButtonText>confirmar reserva</ButtonText>)
        }
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
