import styled from 'styled-components/macro'
import { format } from 'date-fns'
import { enGB, fi, sv } from 'date-fns/locale'

import anchorme from 'anchorme'
import xss from 'xss'

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 45px;
  flex-direction: column;
  color: ${props => props.theme.colors.primary};
  margin-top: 25px;

  overflow-wrap: break-word;
  word-wrap: break-word;

  &.dark {
    background-color: #09195b;
    color: white;
  }

  &.normal {
    background-color: #b4e1fa;
  }

  @media ${props => props.theme.breakpoints.md} {
    margin-top: 0;
    word-break: normal;
  }
`

const DateField = styled.div`
  font-size: 15px;
  text-transform: capitalize;
`
const Content = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`

const TimeLine = props => {
  const { className, date, content, language } = props

  let locale = fi
  if (language === 'en') {
    locale = enGB
  } else if (language === 'sv') {
    locale = sv
  }

  return (
    <Background className={className} style={{ display: 'flex' }}>
      <DateField>
        {format(new Date(date), 'EEEE', { locale })}{' '}
        {format(new Date(date), 'dd.MM.yyyy')}
      </DateField>
      <Content
        dangerouslySetInnerHTML={{
          __html: xss(anchorme(content || ''))
        }}
      />
    </Background>
  )
}

export default TimeLine
