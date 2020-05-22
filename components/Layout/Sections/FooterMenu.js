// @flow

import { Link } from 'i18n'
import styled from 'styled-components/macro'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;

  li {
    font-size: 24px;
    padding-bottom: 5px;
  }

  a {
    text-decoration: none;
    color: #2d3264;
    font-weight: bold;
  }
`

const FooterMenu = ({ items }: { items: Array<Object> }) => {
  const menuItems = items.map(({ ID: id, title, url, type }) => {
    if (type !== 'custom' || url.startsWith('http')) {
      return (
        <li key={id}>
          <a href={url}>{title}</a>
        </li>
      )
    }
    return (
      <li key={id}>
        <Link href={url} as={url}>
          <a>{title}</a>
        </Link>
      </li>
    )
  })

  return <List>{menuItems}</List>
}
export default FooterMenu
