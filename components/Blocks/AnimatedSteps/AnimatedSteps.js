// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { LeafCircle } from 'components/Svg'
import { StageCircle } from 'components/Stage'

import VisibilitySensor from 'react-visibility-sensor'
import { Link, withTranslation, i18n } from 'i18n'

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.backgroundLight};
`

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 34px;
  font-weight: 900;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 60px;
  }
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 70%;
`
const ListItem = styled.li`
  display: flex;
  margin: 30px 0;

  > div {
    margin-left: 16px;
    padding-top: 10px;

    a {
      text-decoration: none;
    }

    h6 {
      color: ${({
        theme: {
          colors: { primary }
        },
        active
      }) => (active ? primary : '#AEAEAE')};
      font-size: 30px;
      font-weight: 900;
      margin: 0;
    }
    p {
      color: ${({
        theme: {
          colors: { text }
        },
        active
      }) => (active ? text : '#AEAEAE')};
      font-size: 14px;
    }
  }
`

const CircleCol = styled(Col)`
  display: none;
  position: relative;

  @media ${props => props.theme.breakpoints.lg} {
    display: flex;
    align-items: center;
  }
`

const AnimateContentCol = styled(Col)`
  width: 100% !important;
  flex-basis: 100% !important;
  @media ${props => props.theme.breakpoints.lg} {
    flex-basis: ${props => (props.size / 12) * 100}%!important;
    width: ${props => (props.size / 12) * 100}%!important;
  }
`

type I18nProps = $ReadOnly<{|
  i18n: Object<{ language: string }>,
  t: Function
|}>

type ComponentProps = $ReadOnly<{|
  ...I18nProps
|}>

class AnimatedSteps extends Component<ComponentProps> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  state = {
    currentCount: 0,
    seen: false
  }

  intervalId = false

  componentWillUnmount() {
    clearTimeout(this.intervalId)
    this.setState({ seen: false, currentCount: 0 })
  }

  onChange = isVisible => {
    const { seen } = this.state
    if (isVisible && !seen && !this.intervalId) {
      this.intervalId = setTimeout(this.timer)
    }
  }

  timer = () => {
    const { currentCount } = this.state
    const nextCount = currentCount + 1
    this.setState({
      currentCount: nextCount
    })

    if (nextCount >= 4) {
      this.setState({ seen: true })
    } else {
      this.intervalId = setTimeout(this.timer, 1000)
    }
  }

  render() {
    const { texts } = this.props
    const { currentCount } = this.state
    let link = '/p/meista/#ohjeet'
    if (i18n.language === 'sv') {
      link = '/p/om-oss#anvisningar'
    } else if (i18n.language === 'en') {
      link = '/p/about-us#instructions'
    }

    const listItems = [
      {
        stage: 1,
        title: (texts.find(txt => txt.text_type === 'stage-1-header') || {})
          .text_value,
        content: (texts.find(txt => txt.text_type === 'stage-1-text') || {})
          .text_value
      },
      {
        stage: 2,
        title: (texts.find(txt => txt.text_type === 'stage-2-header') || {})
          .text_value,
        content: (texts.find(txt => txt.text_type === 'stage-2-text') || {})
          .text_value
      },
      {
        stage: 3,
        title: (texts.find(txt => txt.text_type === 'stage-3-header') || {})
          .text_value,
        content: (texts.find(txt => txt.text_type === 'stage-3-text') || {})
          .text_value
      }
    ]

    const items = listItems.map(({ stage, title, content }) => {
      const active = currentCount === stage || currentCount === 4
      return (
        <ListItem active={active} key={stage}>
          <StageCircle stage={stage} active={active} />
          <div>
            <Link href={link} passHref>
              <a>
                <h6>{title}</h6>
              </a>
            </Link>
            <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
          </div>
        </ListItem>
      )
    })
    return (
      <Wrapper>
        <Container>
          <Row>
            <CircleCol size={5}>
              <VisibilitySensor onChange={this.onChange}>
                <LeafCircle step={currentCount} />
              </VisibilitySensor>
              <div
                style={{
                  borderRight: '1px solid #C1C1C1',
                  height: '85%',
                  position: 'absolute',
                  right: 30
                }}
              />
            </CircleCol>
            <AnimateContentCol size={7}>
              <Title>
                {
                  (texts.find(txt => txt.text_type === 'stages-header') || {})
                    .text_value
                }
              </Title>
              <List>{items}</List>
            </AnimateContentCol>
          </Row>
        </Container>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ texts }) => ({
  texts: texts.texts
})

export default connect(mapStateToProps)(
  withTranslation<I18nProps>(['common'])(AnimatedSteps)
)
