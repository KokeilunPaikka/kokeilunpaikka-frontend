import styled from 'styled-components/macro'
import { HeaderText } from 'components/Text'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Link } from 'i18n'

const LinkContainer = styled.div`
  margin-top: 39px;
  margin-bottom: 34px;
  a {
    margin-right: 32px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 22px;
    text-decoration: none;
  }
`

const LinkItem = styled.a`
  color: ${props => (props.active ? '#73BE9B' : '#2d3264')};
  cursor: pointer;
`

const HeaderTexts = () => {
  const router = useRouter()
  const menus = useSelector(state => state.menus.menus)
  const headerKey = Object.keys(menus).find(m => m.startsWith('header-menu'))
  const headerMenus = menus[headerKey]
  let currentHeader = ''
  let childItems = []
  let { route } = router
  if (route === '/p/[slug]') {
    route = route.replace('[slug]', router.query.slug)
  }
  if (headerMenus) {
    headerMenus.forEach(m => {
      if (m.child_items) {
        m.child_items.forEach(m2 => {
          if (m2.url.indexOf(route) !== -1) {
            currentHeader = m.post_title || m.title
            childItems = m.child_items
          }
        })
      }
      if (m.url.indexOf(route) !== -1) {
        currentHeader = m.post_title || m.title
        childItems = m.child_items
      }
    })
  }

  return (
    <>
      <HeaderText>{currentHeader}</HeaderText>
      {childItems && (
        <LinkContainer>
          {childItems.map(c =>
            c.url.startsWith('http') ? (
              <LinkItem
                key={c.ID}
                href={c.url}
                active={c.url.endsWith(route) || c.url.endsWith(`${route}/`)}
              >
                {c.title}
              </LinkItem>
            ) : (
              <Link key={c.ID} href={c.url} as={c.url}>
                <LinkItem
                  active={c.url.endsWith(route) || c.url.endsWith(`${route}/`)}
                >
                  {c.title}
                </LinkItem>
              </Link>
            )
          )}
        </LinkContainer>
      )}
    </>
  )
}

export default HeaderTexts
