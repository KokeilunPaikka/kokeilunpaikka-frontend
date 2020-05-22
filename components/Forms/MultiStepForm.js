// @flow

import React, { useState, Node } from 'react'
import styled from 'styled-components/macro'
import { Button as ButtonBase } from 'components/Button'
import { HeaderText } from 'components/Text'

import { Form, FormRow, FormCol } from 'components/Forms'

import { useTranslation } from 'i18n'

const Button = styled(ButtonBase)`
  font-size: 16px;

  padding: 8px 65px 7px;

  transition: all 250ms ease-out;
  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(128, 128, 128, 0.1) inset;
    border-color: #dedede;
  }

  ${props => (props.alignRight ? 'margin-left: auto;' : '')}
`

const Background = styled.div`
  background-color: #f6f8ff;
  border-radius: 100px 0 100px 0;
  padding: 36px 18px;

  @media ${props => props.theme.breakpoints.md} {
    padding: 36px 64px;
  }

  p {
    padding: 20px 0;
  }

  a {
    margin: 0 30px;
    :first-child {
      // color: #787878;
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`

const Header = styled(HeaderText)`
  font-size: 32px;
  line-height: 42px;
  @media ${props => props.theme.breakpoints.md} {
    font-size: 40px;
    line-height: 52px;
  }
`

const Breadcrumbs = styled.div`
  font-size: 16px;

  font-weight: 800;

  margin: 10px;
  text-align: center;
`

const StepCounter = styled.span`
  font-size: 40px;
  color: #2d3264;
  font-weight: 800;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Breadcrumb = styled.span`
  color: ${props => (props.active ? '#2D3264' : '#787878')};
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  > a {
    margin-right: 0;
    margin-bottom: 25px;
  }
  > button {
    margin-right: 0;
    margin-bottom: 25px;
  }
  a {
    text-align: center;
  }

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MultiStepForm = ({
  steps,
  submitAction
}: {
  steps: Array<{ step: number, title: string, component: Node }>,
  submitAction: Function
}) => {
  const [activeStep, setStep] = useState(0)

  const [t] = useTranslation()

  const maxSteps = steps.length

  const Crumbs = steps.map(({ step, title }, index) => (
    <Breadcrumb key={step} active={activeStep === step - 1}>
      {title}
      {index !== maxSteps - 1 ? ' / ' : ''}
    </Breadcrumb>
  ))

  const {
    step: currentStep,
    title: currentTitle,
    component: currentComponent
  } = steps[activeStep]

  const nextAction =
    currentStep === maxSteps ? submitAction : () => setStep(activeStep + 1)

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === maxSteps

  return (
    <>
      <Breadcrumbs key={currentStep}>{Crumbs}</Breadcrumbs>
      <Background>
        <TitleContainer>
          <Header>{currentTitle}</Header>
          <StepCounter>
            {currentStep}/{steps.length}
          </StepCounter>
        </TitleContainer>

        <Form
          onSubmit={e => {
            e.preventDefault()
            nextAction(e)
          }}
        >
          {currentComponent}

          <FormRow>
            <FormCol>
              <ButtonContainer>
                {!isFirstStep && (
                  <Button size="medium" onClick={() => setStep(activeStep - 1)}>
                    {t('previous')}
                  </Button>
                )}
                <Button
                  size="medium"
                  type="submit"
                  as="button"
                  alignRight={isFirstStep}
                >
                  {isLastStep ? t('save') : t('continue')}
                </Button>
              </ButtonContainer>
            </FormCol>
          </FormRow>
        </Form>
      </Background>
    </>
  )
}

export default MultiStepForm
