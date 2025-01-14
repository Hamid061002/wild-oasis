import React from 'react'
import { useForm } from 'react-hook-form';
import styled from "styled-components";

export const FormRowStyled = styled.div`
  // display: grid;
  // align-items: center;
  // grid-template-columns: 24rem 1fr;
  // gap: 2rem;

  padding: 0.8rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormRow({ label, error, children }) {
  return <FormRowStyled>
    <div className="grid grid-cols-[2fr_3fr_300px] items-center gap-2">
      <label htmlFor={children.props?.id}>{label}</label>
      {children}
      {error && <p className="self-start flex-none w-fit px-3 py-1 rounded-md text-sm -text--color-red-700 -bg--color-red-100 border">{error.message}</p>}
    </div>
  </FormRowStyled>
}
