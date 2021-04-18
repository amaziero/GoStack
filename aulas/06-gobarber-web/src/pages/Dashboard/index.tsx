import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
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

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

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

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
