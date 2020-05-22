// @flow
import styled from 'styled-components/macro'

import StageCircle from './StageCircle'

const StageContainer = styled.div`
  display: flex;
  padding: 20px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 0 0 15px;
`

const StageTitle = styled.h2`
  color: #2d3264;
  font-size: 24px;
  font-weight: 800;
  margin: 0;
`

const StageDesc = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin: 0;
`

const StageWithText = ({
  stage: { name, description, stage_number: stageNumber }
}: {
  stage: {
    description: string,
    name: string,
    stage_number: number
  }
}) => (
  <StageContainer>
    <StageCircle stage={stageNumber} />
    <TextContainer>
      <StageTitle>{name}</StageTitle>
      <StageDesc>{description}</StageDesc>
    </TextContainer>
  </StageContainer>
)

export default StageWithText
