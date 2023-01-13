import { useEffect, useState } from 'react';
import {
    Container,
    TextHeader,
    ButtonReserve,
    ButtonText,
    Schedule,
    ScheduleText,
    ButtonHour,
    HourText,
    ListText,
} from './styles';
import { StyleSheet, ActivityIndicator, ToastAndroid, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { UserInfo } from '../Dashboard/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { ReservationsProps } from '../../@types/reservations';
import { localeConfig } from '../../util/calendarConfig';
import { currentDate } from '../../util/format';

type RouteDetailsParams = {
    Reserve: {
        service_id: string;
    };
};

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
};

interface MarkedDateProps {
    selected: boolean;
    selectedColor: string;
    // dotColor: string;
    // marked: boolean;
    // disabled: boolean;
    // disableTouchEvent: boolean;
    // activeOpacity: number;
}

interface MarkedDateKeysProp {
    [key: string]: MarkedDateProps;
}

export default function Reserve() {
    const route = useRoute<ReserveRouteProps>();
    const serviceSelected = route.params.service_id;
    const initialDate = currentDate(new Date());
    const [dataSchedule, setDataSchedule] = useState<ScheduleProps[]>([]);
    const [dateSelected, setDateSelected] = useState<DateProps>(() => {
        return {
            dateString: initialDate,
            day: Number(initialDate.slice(8, 10)),
            month: Number(initialDate.slice(5, 7)),
            timestamp: Date.parse(initialDate),
            year: new Date(initialDate).getFullYear(),
        };
    });

    // const [scheduleDate, setScheduleDate] = useState<ScheduleProps[]>([]);

    const [hourSelected, setHourSelected] = useState('');
    const [userInfo, setUserInfor] = useState<UserInfo>();
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
        loadSchedules();
    }, [dateSelected]);

    async function loadSchedules() {
        setLoading(true);
        try {
            const response = await api.get('/schedule/service/date', {
                params: {
                    service_id: serviceSelected,
                    date: dateSelected.dateString,
                },
            });

            setLoading(false);
            setDataSchedule(response.data);
        } catch (err) {
            console.log('erro ao carregar horários:', err);
            // toastMessages('Erro ao carregar horários');
        }
    }

    // useEffect(() => {
    //     async function loadSchedule() {
    //         const response = await api.get('/schedule/service', {
    //             params: { service_id: serviceSelected },
    //         });

    //         const filterSchedules = response.data.filter((schedule) => {
    //             if (dateSelected?.dateString === undefined) {
    //                 return schedule.date === initialDate;
    //             } else {
    //                 return schedule.date === dateSelected?.dateString;
    //             }
    //         });

    //         if (dateSelected !== undefined) {
    //             const nowDateParse = Date.parse(initialDate);
    //             const selectedDateParse = Date.parse(dateSelected.dateString);

    //             if (selectedDateParse >= nowDateParse) {
    //                 setDataSchedule(filterSchedules);
    //             } else if (selectedDateParse < nowDateParse) {
    //                 setDataSchedule([]);
    //             }
    //         } else {
    //             setDataSchedule(filterSchedules);
    //         }
    //     }

    //     loadSchedule();

    //     const mapHours = reservations
    //         .filter((reserve) => {
    //             if (dateSelected?.dateString === undefined) {
    //                 return reserve.date.slice(0, 10) === initialDate;
    //             } else {
    //                 return reserve.date.slice(0, 10) === dateSelected?.dateString;
    //             }
    //         })
    //         .map((item) => item);

    //     setHoursReserved(mapHours);
    // }, [dateSelected, reservations]);

    function handleSelectHour(item_hour: string) {
        setHourSelected(item_hour);
    }

    async function handleSaveReserve() {
        if (hourSelected === '') {
            ToastAndroid.showWithGravity(
                'Informe um horário para a reserva',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );

            return;
        } else {
            const currentDateSelected =
                dateSelected?.dateString === undefined ? initialDate : dateSelected.dateString;

            const year = Number(currentDateSelected.slice(0, 4));
            const month = Number(currentDateSelected.slice(5, 7)) - 1;
            const day = Number(currentDateSelected.slice(8, 10));
            const hours = Number(hourSelected.slice(0, 2));
            const minutes = Number(hourSelected.slice(3, 5));

            const timeReservationSelected = new Date(year, month, day, hours, minutes).toString();
            const timeCurrent = new Date().toString();

            if (Date.parse(timeReservationSelected) < Date.parse(timeCurrent)) {
                ToastAndroid.showWithGravity(
                    'Horário Expirado',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );

                return;
            } else {
                setLoading(true);

                try {
                    const response = await api.post('/reserve', {
                        date:
                            dateSelected?.dateString === undefined
                                ? initialDate
                                : dateSelected.dateString,
                        hour: hourSelected,
                        user_id: userInfo?.id,
                        service_id: serviceSelected,
                    });

                    setLoading(false);

                    ToastAndroid.showWithGravity(
                        'Reserva cadastrada com sucesso!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );

                    navigation.navigate('Dashboard');
                } catch (err) {
                    console.log('erro ao cadastrar reserva: ' + err);
                    setLoading(false);
                }
            }
        }
    }

    let currentDateMarked = dateSelected.dateString;

    let markedDates: MarkedDateKeysProp = {};

    markedDates[currentDateMarked ?? initialDate] = { selected: true, selectedColor: '#5841AD' };

    localeConfig.defaultLocale = 'br';

    return (
        <Container>
            <TextHeader>Escolha uma data e horário para sua reserva</TextHeader>
            <Calendar
                style={styles.calendar}
                current={
                    dateSelected?.dateString === undefined ? initialDate : dateSelected?.dateString
                }
                markedDates={markedDates}
                minDate={initialDate}
                onDayPress={(date) => {
                    setDateSelected(date);
                }}
            />

            <Schedule>
                <ScheduleText>Horários disponíveis</ScheduleText>
                {dataSchedule.length > 0 ? (
                    <FlatList
                        style={{ marginTop: 30 }}
                        data={dataSchedule}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ButtonHour
                                onPress={() => handleSelectHour(item.hour)}
                                selected={item.hour === hourSelected}
                                disabled={hoursReserved.some((hours) => hours.hour === item.hour)}
                            >
                                <HourText>{item.hour}</HourText>
                            </ButtonHour>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                ) : (
                    <ListText>Sem horários disponíveis para esta data 🙁</ListText>
                )}
            </Schedule>

            <ButtonReserve onPress={handleSaveReserve} isClicked={loading}>
                {loading ? (
                    <ActivityIndicator size={20} color="#fff" />
                ) : (
                    <ButtonText>confirmar reserva</ButtonText>
                )}
            </ButtonReserve>
        </Container>
    );
}

const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderColor: '#A5A4B4',
    },
});
