import styled from "styled-components";

// const StyledTable = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: 2.4rem;
//   align-items: center;
//   transition: none;
// `;

// const StyledHeader = styled(CommonRow)`
//   padding: 1.6rem 2.4rem;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;

// const StyledRow = styled(CommonRow)`
//   padding: 1.2rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;

import React, { createContext, useContext } from 'react'

const TableContext = createContext()

export default function Table({ children, columns }) {
  // const columnsEdit = columns.replaceAll(' ', '_')

  return <TableContext.Provider value={{ columns }}>
    <div className="border text-xl -bg--color-grey-0 rounded-lg -border--color-grey-200">
      {children}
    </div>
  </TableContext.Provider>
}

function Header({ children }) {
  const { columns } = useContext(TableContext)

  return (
    <header style={{ gridTemplateColumns: columns }} className={`grid gap-y-11 justify-items-center py-6 px-10 rounded-lg -bg--color-grey-50 border-b -border--color-grey-100 uppercase tracking-[0.4px] font-semibold -text--color-grey-600 text-xl`}>
      {children}
    </header>
  )
}

function Row({ children }) {
  const { columns } = useContext(TableContext)

  return (
    <div style={{ gridTemplateColumns: columns }} className={`grid gap-y-9 items-center justify-items-center text-center py-6 px-10 border-b -border--color-grey-200 last:border-none`}>
      {children}
    </div>
  )
}

function Body({ data, render }) {
  if (!data?.length) return <p className="text-2xl font-medium text-center m-9 -text--color-red-700">No data to show at the moment!</p>

  return <section>{data?.map(render)}</section>
}

function Footer({ children }) {
  return <footer className="-bg--color-grey-50 flex justify-center w-full p-4 rounded-b-lg">{children}</footer>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer