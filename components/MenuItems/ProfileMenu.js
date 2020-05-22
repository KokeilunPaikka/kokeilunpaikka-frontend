// @flow

import styled from 'styled-components/macro'
import { darken } from 'polished'
import { useTranslation, Link } from 'i18n'
import { PlainButton as PlainButtonBase } from 'components/Button'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'store/actions/users'
import { useRouter } from 'next/router'

const Profile = styled.div`
  //padding: 0 5px;
  position: relative;
  transition: background 0.3s linear;
  border-radius: 0 28px 0 0;

  > a {
    padding: 8px 15px;
    color: #2d3264;
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  span {
    margin-right: 18px;
    display: none;
    @media ${props => props.theme.breakpoints.md} {
      display: inherit;
    }
  }

  > div {
    height: 0;
    visibility: hidden;
    //opacity: 0;
    transition: all 0.3s linear, height 0.3s linear, opacity 200ms linear,
      visibility 250ms linear;
    position: absolute;
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      transition: all 0.1s linear;
      font-size: 16px;

      :hover,
      :active {
        color: ${({ theme }) => darken(0.1, theme.colors.primary)};
        text-decoration: underline;
      }
    }
  }

  :hover,
  :active {
    box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.34);
    background: white;

    > div {
      height: 100%;
      position: absolute;
      top: 100%;
      visibility: visible;
      left: 0;
      background: white;
      box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.34);
      border-radius: 0 0 0 28px;
    }
  }
`

const ProfileImage = styled.img`
  border-radius: 50%;
  height: 42px;
  width: 42px;
`

const PlainButton = styled(PlainButtonBase)`
  padding: 15px 5px;
  color: ${({ theme }) => theme.colors.primary};

  :hover {
    text-decoration: underline;
  }
`

const ProfileMenu = ({ avatar }: { avatar: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Profile>
      <Link href="/profile" passHref>
        <a>
          <span>{t('profile')}</span>
          <ProfileImage src={avatar} alt="Profile image" />
        </a>
      </Link>
      <div>
        <Link href="/reset-password" passHref>
          <a>{t('password-reset:change-password')}</a>
        </Link>
        <PlainButton
          onClick={e => {
            e.preventDefault()
            dispatch(logoutUser()).then(() => router.push('/'))
          }}
        >
          {t('logout')}
        </PlainButton>
      </div>
    </Profile>
  )
}

export default ProfileMenu
