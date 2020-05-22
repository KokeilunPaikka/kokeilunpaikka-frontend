import { useSelector } from 'react-redux'
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { Button as ButtonBase } from 'components/Button'

import { Link, useTranslation } from 'i18n'

const Wrapper = styled.div`
  text-align: center;
`
const Borders = styled(Row)`
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
  padding: 70px 15px;

  @media ${props => props.theme.breakpoints.lg} {
    padding: 70px;
  }
`
const CtaTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 34px;
  margin: 0;

  @media ${props => props.theme.breakpoints.lg} {
    font-size: 56px;
  }
`
const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  padding: 11px 15px 11px;
  font-weight: bold;

  @media ${props => props.theme.breakpoints.lg} {
    padding: 11px 55px 6px;
  }
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
const Cta = () => {
  const [t] = useTranslation()
  const texts = useSelector(state => state.texts.texts)
  const waitingForText = (
    texts.find(txt => txt.text_type === 'what-are-you-waiting') || {}
  ).text_value
  return (
    <Wrapper>
      <Container>
        <Borders>
          <TextCol size={8}>
            <CtaTitle style={{ whiteSpace: 'pre-wrap' }}>
              {waitingForText}
            </CtaTitle>
          </TextCol>
          <ButtonCol size={4}>
            <div style={{ paddingBottom: '10px' }}>
              <Link href="/uusi-kokeilu" passHref>
                <Button>{t('start-experiment')}</Button>
              </Link>
            </div>
          </ButtonCol>
        </Borders>
      </Container>
    </Wrapper>
  )
}

export default Cta
