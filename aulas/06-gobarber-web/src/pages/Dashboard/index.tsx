import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppintment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import useAuth from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvaliabilityItem {
  day: number;
  avaliable: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currenteMonth, setCurrentMonth] = useState(new Date());

  const [monthAvaliability, setMonthAvaliability] = useState<
    MonthAvaliabilityItem[]
  >([]);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disableDays = useMemo(() => {
    const dates = monthAvaliability
      .filter(monthDay => monthDay.avaliable === false)
      .map(monthDay => {
        const year = currenteMonth.getFullYear();
        const month = currenteMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currenteMonth, monthAvaliability]);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currenteMonth.getFullYear(),
          month: currenteMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvaliability(response.data);
      });
  }, [currenteMonth, user.id]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>

          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-Feira</span>
          </p>

          <NextAppintment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/56273452?v=4"
                alt="Alison Maziero"
              />

              <strong>Alison Maziero</strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppintment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56273452?v=4"
                  alt="Alison Maziero"
                />

                <strong>Alison Maziero</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56273452?v=4"
                  alt="Alison Maziero"
                />

                <strong>Alison Maziero</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56273452?v=4"
                  alt="Alison Maziero"
                />

                <strong>Alison Maziero</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56273452?v=4"
                  alt="Alison Maziero"
                />

                <strong>Alison Maziero</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDayChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
