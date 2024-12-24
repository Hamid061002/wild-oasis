import styled from "styled-components";
import { getStaysTodayActivity } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";

/* fake data */
const fakeData = [
  {
    status: "unconfirmed",
    guests: {
      fullName: 'Jonatan Johansson',
      countryFlag: 'https://flagcdn.com/gb.svg',
      country: 'United Kingdom'
    },
    numNights: 2
  },
  {
    status: "unconfirmed",
    guests: {
      fullName: 'Maria Gomez',
      countryFlag: 'https://flagcdn.com/mx.svg',
      country: 'Mexico'
    },
    numNights: 4
  },
  {
    status: "checked-in",
    guests: {
      fullName: 'Fatima Ahmed',
      countryFlag: 'https://flagcdn.com/pk.svg',
      country: 'Pakistan'
    },
    numNights: 6
  },
  {
    status: "unconfirmed",
    guests: {
      fullName: 'Maria Rodriguez',
      countryFlag: 'https://flagcdn.com/es.svg',
      country: 'Spain'
    },
    numNights: 2
  },
  {
    status: "checked-in",
    guests: {
      fullName: 'Gabriel Silva',
      countryFlag: 'https://flagcdn.com/br.svg',
      country: 'Brazil'
    },
    numNights: 4
  },
]

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  /* real data */
  const { activities, isLoading } = useTodayActivity()

  return (
    <StyledToday>
      <div type="horizontal">
        <h2 className="text-2xl">Today</h2>
      </div>

      {
        isLoading ?
          <Spinner /> :
          activities?.length > 0 ?
            <TodayList>
              {
                activities?.map(activity => <TodayItem activity={activity} key={activity.id} />)
              }
            </TodayList> :
            <NoActivity>No activity today...</NoActivity>
      }
    </StyledToday>
  );
}

export default TodayActivity;
