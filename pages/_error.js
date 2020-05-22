import React from 'react'
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import { withTranslation, useTranslation } from 'i18n'
import { PageLayout } from 'components/Layout/Layouts'
import AuthHoc from 'components/AuthHoc'

const ErrorPage = () => {
  const [t] = useTranslation()
  return (
    <PageLayout>
      <Container>
        <Row>
          <Col style={{ width: '100%', marginTop: 50 }}>
            <h1>{t('error-happened')}</h1>
            <p>{t('could-not-find-page')}</p>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  )
}

ErrorPage.getInitialProps = ctx => {
  const { req } = ctx
  const i18n = req.i18n

  return {
    i18n,
    namespacesRequired: ['common', 'page-titles']
  }
}

export default withTranslation(['common', 'page-titles'])(AuthHoc(ErrorPage))
