// @flow
import { Container } from 'components/common'
import { Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { Link, useTranslation } from 'i18n'
import { Button as ButtonBase } from 'components/Button'

const Wrapper = styled.div`
  text-align: center;
`
const CtaTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 32px;
  margin: 0;
  text-align: center;

  @media ${props => props.theme.breakpoints.lg} {
    font-size: 56px;
    text-align: left;
  }
`

const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  flex: 1 1 100%;
  background-color: ${props => props.theme.colors.primary};
`

const TextCol = styled(Col)`
  width: 100%;
  flex-basis: 100%;
  max-width: 100%;

  @media ${props => props.theme.breakpoints.lg} {
    justify-content: flex-end;
    align-items: flex-end;
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
    margin-left: ${props => (props.offset / 12) * 100}%;
  }
`

const ButtonCol = styled(Col)`
  width: 100%;
  flex-basis: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 25px;

  @media ${props => props.theme.breakpoints.lg} {
    justify-content: flex-end;
    display: flex;
    align-items: flex-end;
    flex-basis: ${props => (props.size / 12) * 100}%;
    max-width: ${props => (props.size / 12) * 100}%;
    margin-left: ${props => (props.offset / 12) * 100}%;
  }
`

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 32px;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.md} {
    padding: 64px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
  }
`

const LeafCta = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const [t] = useTranslation()
  return (
    <Wrapper style={{ width: '100%', marginTop: 25 }}>
      <Container>
        <Background style={{ display: 'flex' }}>
          <TextCol size={8}>
            <CtaTitle>
              {title}
              <br />
              {subtitle}
            </CtaTitle>
          </TextCol>
          <ButtonCol size={4}>
            <div style={{ paddingBottom: '10px' }}>
              <Link href="/uusi-kokeilu" passHref>
                <Button>{t('start-experiment')}</Button>
              </Link>
            </div>
          </ButtonCol>
        </Background>
      </Container>
    </Wrapper>
  )
}

export default LeafCta
