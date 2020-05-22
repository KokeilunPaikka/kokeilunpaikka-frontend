// @flow
import styled from 'styled-components/macro'
import { StageCircle } from 'components/Stage'
import Icon from 'components/Icon/Icon'

import { Link, useTranslation } from 'i18n'

const Wrapper = styled.div`
  margin-top: 63px;

  a {
    text-decoration: none;
  }
`

const TextContainer = styled.div`
  border-radius: 0 0 60px 0;
  background-color: #f6f8ff;
  box-shadow: 0 3px 4px 0 rgba(197, 197, 197, 0.5);
  flex: 1;
  padding: 33px 18px;
  margin: 0 12px;
`

const ExperimentImage = styled.div`
  position: relative;
  img {
    display: block;
    margin: 0;
    padding: 0;
    max-height: 238px;
    width: 100%;
    object-fit: cover;
  }
`

const ExperimentImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  clear: float;
  width: 100%;
  height: 100%;
  background-color: rgba(156, 210, 200, 0.7);
  color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 30px;
    font-weight: 700;
  }
`

const ExperimentTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
  line-height: 29px;
  margin: 0;
  font-weight: 800;
  word-break: break-word;
`

const ExperimentBody = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.md} {
    flex-direction: row;
  }
`
const StageCircleContainer = styled.div`
  margin-top: 20px;

  @media ${props => props.theme.breakpoints.md} {
    margin-left: 20px;
    margin-top: 0;
  }
`

const LinkText = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`
const ThemeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  span {
    background-color: #2d3264;
    color: white;
    margin: 5px 5px 5px 0;
    padding: 5px 10px;
    border-radius: 25px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
`

const ImageTextCard = ({
  image,
  title,
  stage = false,
  description,
  href,
  linkText = null,
  as,
  isPublished = true,
  themes
}: {
  image: string,
  title: string,
  stage: number | boolean,
  description: string,
  href: string,
  linkText?: string, // eslint-disable-line
  as: string,
  isPublished: boolean,
  themes: Array
}) => {
  const body = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(
    description
  ) ? (
    <ExperimentBody dangerouslySetInnerHTML={{ __html: description }} />
  ) : (
    <ExperimentBody>
      <p>{description}</p>
    </ExperimentBody>
  )

  let url = image
  if (!image) {
    url = '/static/kokeilu-placeholder.png'
  }

  const [t] = useTranslation()

  return (
    <Wrapper style={{ display: 'flex', width: '100%' }}>
      <Link href={href} as={as}>
        <a
          style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
        >
          <ExperimentImage>
            <img src={url} alt={title} />
            {!isPublished && (
              <ExperimentImageOverlay>
                <p>{t('common:draft')}</p>
              </ExperimentImageOverlay>
            )}
          </ExperimentImage>

          <TextContainer>
            <Content>
              <ExperimentTitle>{title}</ExperimentTitle>
              {stage && (
                <StageCircleContainer>
                  <StageCircle stage={stage} />
                </StageCircleContainer>
              )}
            </Content>
            {body}
            {themes && themes.length ? (
              <ThemeContainer>
                {themes &&
                  themes.length &&
                  themes
                    .slice(0, 5)
                    .map(tr => <span key={tr.id}>{tr.name}</span>)}
              </ThemeContainer>
            ) : null}
            {linkText ? (
              <LinkText>
                {linkText}
                <Icon
                  icon={['fa', 'chevron-right']}
                  fixedWidth
                  size="1x"
                  width="16"
                />
              </LinkText>
            ) : null}
          </TextContainer>
        </a>
      </Link>
    </Wrapper>
  )
}
export default ImageTextCard
