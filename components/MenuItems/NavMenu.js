// @flow

import { useState } from 'react'
import { Link } from 'i18n'

import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'components/Icon'
import { setOpenChildMenuId } from 'store/actions/menus'
import { useRouter } from 'next/router'

const TopMenu = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-left: 0;

  flex: 1 1 auto;
  margin-right: 30px;

  @media ${props => props.theme.breakpoints.md} {
    text-align: right;
  }

  > li {
    display: inline-block;
    padding: 0 2%;
    width: 100%;
    padding: 15px 0;

    @media ${props => props.theme.breakpoints.md} {
      padding: 0 2%;
      width: auto;
      height: 100%;
    }
  }
  a {
    font-size: 1.5rem;

    @media ${props => props.theme.breakpoints.md} {
      font-size: 16px;
    }
    display: inline-block;
    height: 100%;
    text-decoration: none;

    color: ${props => props.theme.colors.primary};
    font-weight: 900;
    font-size: 16px;
  }

  > li {
    @media ${props => props.theme.breakpoints.sm} {
      border-bottom: 1px dashed ${({ theme }) => theme.colors.primary};
      border-top: 1px dashed ${({ theme }) => theme.colors.primary};

      :first-child {
        border-top: none;
      }
      :last-child {
        border-bottom: none;
      }
    }
    @media ${props => props.theme.breakpoints.sm} {
      border: none;
    }
  }
`

const ChildMenu = styled.div`
  @media ${props => props.theme.breakpoints.md} {
    display: block;
    visibility: ${props => (props.showChildMenu ? 'visible' : 'hidden')};
    max-height: ${props => (props.showChildMenu ? '500px' : '0')};
    list-style: none;
    padding-left: 0;
    margin-left: 0;
    position: absolute;
    left: 0;
    right: 0;
    opacity: ${props => (props.showChildMenu ? 1 : 0)};
    top: ${props =>
      props.showChildMenu
        ? props.menuHeight || 0
        : (props.menuHeight || 0) - 5}px;
    transition: all 0.15s ease-in-out;
  }
  text-align: left;

  padding-top: 15px;

  ul {
    list-style: none;
    padding-left: 0;
    margin-left: 0;
    padding: 0 30px;
    @media ${props => props.theme.breakpoints.md} {
      display: flex;
      justify-content: center;
      padding: 3px 30px;
      background-color: #f8f8f7;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.14),
        inset 0 3px 4px 0 rgba(0, 0, 0, 0.12);
    }
    li {
      margin: 15px 31px;
    }
  }
`

const LinkItem = styled.li`
  > a {
    color: ${props => (props.active ? '#73BE9B' : '#2D3264')};
    svg {
      color: ${props => (props.active ? '#73BE9B' : '#2D3264')};
    }
  }
`

type CommonMenu = $ReadOnly<{|
  ID: number,
  title: string,
  url: string,
  type: string
|}>

type TopLevel = $ReadOnly<{|
  ...CommonMenu
|}>

const createLink = ({
  ID: id,
  type,
  title,
  url,
  child_items: childItems
}: TopLevel | CommonMenu) => {
  const [childMenuHeight, setChildMenuHeight] = useState(0)
  const router = useRouter()
  const dispatch = useDispatch()
  const openChildMenu = useSelector(state => state.menus.openChildMenu)
  const subLinks =
    childItems && childItems.length > 0
      ? childItems.map(item => createLink(item))
      : null
  // Try to find if it's a link to wordpress page
  const { host } = window.location
  if (childMenuHeight === 0 && openChildMenu === id) {
    dispatch(setOpenChildMenuId(null))
  }

  /* eslint-disable jsx-a11y/anchor-is-valid */
  if (
    url.startsWith('http') &&
    (url.search(host) >= 0 ||
      url.search('kokeilunpaikka.pilot9.sofokus.com') >= 0) &&
    type === 'post_type'
  ) {
    const [, , , prefix, ...slug] = url.split('/').filter(split => split !== '')

    if (prefix === 'p') {
      // eslint-disable-next-line
      url = {
        pathname: `/p/[slug]`,
        query: {
          slug
        }
      }

      const as = `/p/${slug}`
      return (
        <LinkItem
          key={id}
          active={router.route.replace('[slug]', router.query.slug) === as}
          onMouseMove={() =>
            setChildMenuHeight(
              document.getElementById('header-container').offsetHeight - 15
            )
          }
        >
          {subLinks ? (
            <a href="#" onClick={() => dispatch(setOpenChildMenuId(id))}>
              {title}{' '}
              <Icon
                icon={['fa', openChildMenu === id ? 'caret-up' : 'caret-down']}
              />
            </a>
          ) : (
            <Link href={url} as={as}>
              <a href="#" onClick={() => dispatch(setOpenChildMenuId(null))}>
                {title}
              </a>
            </Link>
          )}
          {subLinks && (
            <ChildMenu
              menuHeight={childMenuHeight}
              showChildMenu={openChildMenu === id}
            >
              <ul>{subLinks}</ul>
            </ChildMenu>
          )}
        </LinkItem>
      )
    }
    // eslint-disable-next-line
    url = `/${prefix}/${page}`
  }
  // If it starts with http, it probably isn't for our router
  else if (url.startsWith('http')) {
    return (
      <LinkItem
        key={id}
        active={router.route === url}
        onMouseMove={() =>
          setChildMenuHeight(
            document.getElementById('header-container').offsetHeight - 15
          )
        }
      >
        <a href={url} onClick={() => dispatch(setOpenChildMenuId(null))}>
          {title}
        </a>
        {subLinks && (
          <ChildMenu
            menuHeight={childMenuHeight}
            showChildMenu={openChildMenu === id}
            onClick={() => dispatch(setOpenChildMenuId(null))}
          >
            <ul>{subLinks}</ul>
          </ChildMenu>
        )}
      </LinkItem>
    )
  }

  return (
    <LinkItem
      key={id}
      active={
        router.route === url ||
        (childItems &&
          childItems.some(
            c =>
              router.route.replace('[slug]', router.query.slug).length > 1 &&
              c.url.indexOf(router.route.replace('[slug]', router.query.slug)) >
                -1
          ))
      }
      onMouseMove={() =>
        setChildMenuHeight(
          document.getElementById('header-container').offsetHeight - 15
        )
      }
    >
      {subLinks ? (
        <a href="#" onClick={() => dispatch(setOpenChildMenuId(id))}>
          {title}{' '}
          <Icon
            icon={['fa', openChildMenu === id ? 'caret-up' : 'caret-down']}
          />
        </a>
      ) : (
        <Link href={url} as={url}>
          <a href="#" onClick={() => dispatch(setOpenChildMenuId(null))}>
            {title}
          </a>
        </Link>
      )}
      {subLinks && (
        <ChildMenu
          menuHeight={childMenuHeight}
          showChildMenu={openChildMenu === id}
        >
          <ul>{subLinks}</ul>
        </ChildMenu>
      )}
    </LinkItem>
  )
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

const Menu = ({ items }: TopLevel) => {
  const menuItems = items.map(item => createLink(item))
  return <TopMenu>{menuItems}</TopMenu>
}

export default Menu
