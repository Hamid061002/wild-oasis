import { Link, useNavigate } from "react-router-dom";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import styled from "styled-components";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 7rem 2rem 6rem 40px 6rem;
  gap: 0.78rem;
  align-items: center;

  font-size: 0.9rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;


export default function TodayItem({ activity }) {
  const navigate = useNavigate()
  const { id, guests, status, numNights } = activity

  return (
    <StyledTodayItem>
      {status == 'unconfirmed' && <Tag style={{fontSize: '14px'}} type='green'>Arriving</Tag>}
      {status == 'checked-in' && <Tag style={{fontSize: '14px'}} type='blue'>Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <span>{guests.fullName}</span>
      <p className="text-center
      ">{numNights} nights</p>
      {status == 'unconfirmed' && <button onClick={() => navigate(`/checkin/${id}`)} className='rounded-lg text-center px-2 py-1 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700'>Check in</button>}
      {status == 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  )
}

