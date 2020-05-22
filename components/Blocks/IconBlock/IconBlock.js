// @flow
import type { Node } from 'react'
import { Container } from 'components/common'
import { Row, Col } from 'components/Layout/Grid'
import styled from 'styled-components/macro'
import { Icon } from 'components/Icon'

import { Link, useTranslation, i18n } from 'i18n'

const Icons = (): Node => {
  const [t] = useTranslation()
  let link = '/p/tyokalu'
  if (i18n.language === 'sv') {
    link = '/p/verktyg'
  } else if (i18n.language === 'en') {
    link = '/p/tools'
  }
  return (
    <div style={{ padding: '100px 0' }}>
      <Container>
        <Row>
          <Col size={4}>
            <div style={{ textAlign: 'center' }}>
              <Link href="/kokeiluhaut" passHref>
                <a>
                  <Icon
                    icon={['fa', 'dollar-sign']}
                    fixedWidth
                    size="5x"
                    width="16"
                    style={{ color: '#73BE9B' }}
                  />
                  <p
                    style={{
                      color: '#2D3264',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {t('funding')}
                  </p>
                </a>
              </Link>
            </div>
          </Col>
          <Col size={4}>
            <div style={{ textAlign: 'center' }}>
              <Link href="/kokeilijat" passHref>
                <a>
                  <Icon
                    icon={['fa', 'laugh-wink']}
                    fixedWidth
                    size="5x"
                    width="16"
                    style={{ color: '#73BE9B' }}
                  />
                  <p
                    style={{
                      color: '#2D3264',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {t('experiment-buddy')}
                  </p>
                </a>
              </Link>
            </div>
          </Col>
          <Col size={4}>
            <div style={{ textAlign: 'center' }}>
              <Link href={link} passHref>
                <a>
                  <Icon
                    icon={['fa', 'tools']}
                    fixedWidth
                    size="5x"
                    width="16"
                    style={{ color: '#73BE9B' }}
                  />
                  <p
                    style={{
                      color: '#2D3264',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {t('info-about-tools')}
                  </p>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Icons
