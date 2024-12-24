import styled from "styled-components";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

import React from 'react'

export default function ErrorFallback({ error, resetFn }) {
  return (
    <StyledErrorFallback>
      <Box>
        <h1 className="text-4xl -text--color-grey-700">Something went wrong!!</h1>
        <p>{error.message}</p>
        <button onClick={resetFn} className='rounded-lg text-center px-5 py-3 -text--color-brand-50 -bg--color-brand-600 hover:-bg--color-brand-700'>Try again</button>
      </Box>
    </StyledErrorFallback>
  )
}
