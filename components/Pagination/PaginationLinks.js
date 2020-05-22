// @flow
import type Node from 'react'
import { useTranslation } from 'i18n'
import styled from 'styled-components/macro'

const PaginationLink = styled.div`
  margin-top: 50px;
  font-weight: bold;
  margin-right: 15px;
  color: ${props => props.theme.colors.primary};
  padding: 10px;

  background: ${props => (props.current ? '#96d2eb' : 'inherit')};
  border-radius: ${props => (props.current ? '15px 2px 15px 2px' : '0')};

  &:hover {
    cursor: pointer;
    background: #96d2eb;
    border-radius: 15px 2px 15px 2px;
  }
`

const Pagination = ({
  page,
  count,
  pageSize,
  action
}: {
  page: string | number,
  count: string | number,
  pageSize: string | number,
  action: Function
}): Node => {
  const [t] = useTranslation()
  const paginationLinks = []

  const maxPage = Math.ceil(count / pageSize)

  const makePaginationLink = (pageNumber, label) => {
    return (
      <PaginationLink key={label} onClick={() => action(pageNumber)}>
        {label}
      </PaginationLink>
    )
  }

  if (page > 1) {
    paginationLinks.push(
      makePaginationLink(parseInt(page, 10) - 1, t('previous'))
    )
  }

  if (page - 2 > 0) {
    paginationLinks.push(makePaginationLink(page - 2, page - 2))
  }

  if (page - 1 > 0) {
    paginationLinks.push(makePaginationLink(page - 1, page - 1))
  }

  paginationLinks.push(
    <PaginationLink current key="current">
      {page}
    </PaginationLink>
  )

  if (page + 1 <= maxPage) {
    paginationLinks.push(makePaginationLink(page + 1, page + 1))
  }

  if (page + 2 <= maxPage) {
    paginationLinks.push(makePaginationLink(page + 2, page + 2))
  }

  if (parseInt(page, 10) < parseInt(count, 10) / pageSize) {
    paginationLinks.push(makePaginationLink(parseInt(page, 10) + 1, t('next')))
  }

  return paginationLinks
}

export default Pagination
