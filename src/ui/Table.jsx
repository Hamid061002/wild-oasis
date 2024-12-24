import styled from "styled-components";
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