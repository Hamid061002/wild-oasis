import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.1rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
`;

import React from 'react'

export default function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect defaultValue={value} onChange={onChange} {...props}>
      {
        options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
      }
    </StyledSelect>
  )
}
