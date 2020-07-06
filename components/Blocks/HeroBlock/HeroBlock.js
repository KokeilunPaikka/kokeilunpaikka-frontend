// @flow
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'components/common'
import { Button as ButtonBase } from 'components/Button'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { Link, useTranslation, i18n } from 'i18n'

const Background = styled.div`
  max-width: 100%;
  max-height: 700px;
  // height: 650px;
  background-image: linear-gradient( rgba(0, 0, 0, ${props =>
    props.opacity}), rgba(0, 0, 0, ${props => props.opacity}) ), url("${props =>
  props.headerImage}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 96px 0;
  color: white;

`

const HeroTitle = styled.h2`
  font-size: 30px;
  line-height: 32px;
  text-shadow: 0 0 10px #000000;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
    line-height: 48px;
  }

  @media ${props => props.theme.breakpoints.xl} {
    font-size: 48px;
    line-height: 56px;
  }
`
const HeroParagraph = styled.h3`
  font-size: 18px;
  line-height: 29px;
  margin: 35px 0;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 20px;
  }

  @media ${props => props.theme.breakpoints.xl} {
    font-size: 24px;
  }
`
const Button = styled(ButtonBase)`
  font-size: 30px;
  line-height: 36px;
  padding: 11px 15px 6px;
  width: 100%;
  text-align: center;
  font-weight: bold;

  @media ${props => props.theme.breakpoints.md} {
    width: auto;
    padding: 11px 45px 6px;
    min-width: ${props => props.minWidth};
  }
`

const ContentCol = styled(Col)`
  width: 100% !important;
  flex-basis: 100% !important;
  @media ${props => props.theme.breakpoints.lg} {
    width: 50% !important;
    flex-basis: 50% !important;
  }
`

const ButtonContainer = styled.div`
  a {
    white-space: nowrap;
    margin-right: 15px;
    margin-bottom: 20px;
  }
`

const HeroBlock = ({
  headerImage,
  opacity
}: {
  headerImage: string,
  opacity: float
}) => {
  const [minButtonWidth, setMinButtonWidth] = useState('300px')
  useEffect(() => {
    switch (i18n.language) {
      case 'fi':
        setMinButtonWidth('300px')
        break
      case 'en':
        setMinButtonWidth('400px')
        break
      case 'sv':
        setMinButtonWidth('350px')
        break
      default:
        setMinButtonWidth('300px')
        break
    }
  }, [i18n.language])
  const [t] = useTranslation()
  const texts = useSelector(state => state.texts.texts)
  const headerText = texts.find(txt => txt.text_type === 'front_page_header')
  const header = headerText ? headerText.text_value : ''
  const ingressText = texts.find(txt => txt.text_type === 'front_page_ingress')
  const ingress = ingressText ? ingressText.text_value : ''
  return (
    <Background headerImage={headerImage} opacity={opacity}>
      <Container>
        <Row>
          <ContentCol size={6}>
            <HeroTitle style={{ whiteSpace: 'pre-wrap' }}>{header}</HeroTitle>
            <HeroParagraph style={{ whiteSpace: 'pre-wrap' }}>
              {ingress}
            </HeroParagraph>
            <ButtonContainer>
              <Link href="/uusi-kokeilu" passHref>
                <Button minWidth={minButtonWidth}>
                  {t('start-experiment')}
                </Button>
              </Link>
              <Link href="/kokeilut" passHref>
                <Button minWidth={minButtonWidth}>
                  {t('experiment-search')}
                </Button>
              </Link>
            </ButtonContainer>
          </ContentCol>
        </Row>
      </Container>
    </Background>
  )
}

export default HeroBlock
