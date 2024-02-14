// @flow

import { Component } from 'react'

import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { withRouter } from 'next/router'
import { getArticle } from 'store/actions/blog'
import AuthHoc from 'components/AuthHoc'
import Paragraph from 'components/Blocks/WordPress/Paragraph'
import Heading from 'components/Blocks/WordPress/Heading'
import Image from 'components/Blocks/WordPress/Image'
import List from 'components/Blocks/WordPress/List'
import Youtube from 'components/Blocks/WordPress/Youtube'
import Hero from 'components/Blocks/WordPress/Hero'
import { HeaderTexts } from 'components/Text'
import { PageLayout } from 'components/Layout/Layouts'
import { getParameterByName } from 'utils/url'
import { withTranslation } from 'i18n'

import Helmet from 'react-helmet'

const Container = styled.div`
  p {
    line-height: 25px;
    margin-bottom: 25px;
  }
`

const Columns = styled.div`
  display: flex;
  max-width: ${props => (props.currentArticle.full_image ? '750px' : '1140px')};
  margin-left: auto;
  margin-right: auto;
  > div {
    flex-grow: 1;
    padding-left: 15px;
    padding-right: 15px;
    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
    }
  }
  h2,
  h2 a {
    font-size: 24px;
    color: #2d3264;
    text-decoration: none;
  }
  figure {
    margin: 0;
  }
`
const HeaderContainer = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 75px;
`

class Page extends Component {
  static async getInitialProps(ctx) {
    const { store, query } = ctx
    const { slug } = query

    let preview = getParameterByName('preview', ctx.asPath)
    const thumbnail = getParameterByName('_thumbnail_id', ctx.asPath)
    const isNew = getParameterByName('new', ctx.asPath)
    if (isNew) {
      preview = getParameterByName('page_id', ctx.asPath)
    }

    await store.dispatch(getArticle(slug, preview, thumbnail, isNew, 'page'))

    return {
      namespacesRequired: ['common', 'page-titles']
    }
  }

  render() {
    const { currentArticle, router, t } = this.props
    const article = currentArticle

    let previewNotification = null
    if (router.asPath.includes('preview')) {
      previewNotification = (
        <div
          style={{
            backgroundColor: 'red',
            color: 'white',
            paddingTop: 20,
            paddingBottom: 20,
            textAlign: 'center'
          }}
        >
          {t('this-is-preview')}
        </div>
      )
    }

    const blocks = []
    article.blocks.forEach((block, index) => {
      /* eslint-disable react/no-array-index-key */
      if (block.blockName === 'core/columns') {
        blocks.push(
          <Columns
            currentArticle={currentArticle}
            key={`${block.blockName}-${index}`}
          >
            {block.innerBlocks.map((c, i) => (
              <div key={`column_${i}`}>
                {c.innerBlocks &&
                  c.innerBlocks.map((b, i2) => {
                    if (b.blockName === 'core/paragraph') {
                      return (
                        <Paragraph
                          key={`${b.blockName}-${i2}`}
                          content={b.innerContent}
                        />
                      )
                    }
                    if (b.blockName === 'core/heading') {
                      return (
                        <Heading
                          key={`${b.blockName}-${i2}`}
                          content={b.innerContent}
                        />
                      )
                    }
                    if (b.blockName === 'core/image') {
                      return (
                        <Image
                          key={`${b.blockName}-${i2}`}
                          content={b.innerContent}
                        />
                      )
                    }
                    if (b.blockName === 'core/list') {
                      return (
                        <List
                          key={`${b.blockName}-${i2}`}
                          content={b.innerContent}
                        />
                      )
                    }
                    if (b.blockName === 'acf/cookiebot') {
                      return (
                        <script
                          key={`${b.blockName}-${i2}`}
                          id="CookieDeclaration"
                          src={`https://consent.cookiebot.com/${b.attrs.data.id}/cd.js`}
                          type="text/javascript"
                          data-culture={b.attrs.data.lang}
                          async
                        />
                      )
                    }

                    return null
                  })}
              </div>
            ))}
          </Columns>
        )
      }
      if (block.blockName === 'core/paragraph') {
        blocks.push(
          <Paragraph
            key={`${block.blockName}-${index}`}
            content={block.innerContent}
          />
        )
      } else if (block.blockName === 'core/heading') {
        blocks.push(
          <Heading
            key={`${block.blockName}-${index}`}
            content={block.innerContent}
          />
        )
      } else if (block.blockName === 'core/image') {
        blocks.push(
          <Image
            key={`${block.blockName}-${index}`}
            content={block.innerContent}
          />
        )
      } else if (block.blockName === 'core/list') {
        blocks.push(
          <List
            key={`${block.blockName}-${index}`}
            content={block.innerContent}
          />
        )
      } else if (block.blockName === 'core-embed/youtube') {
        blocks.push(
          <Youtube key={`${block.blockName}-${index}`} url={block.attrs.url} />
        )
      } else if (block.blockName === 'acf/hero') {
        blocks.push()
      } else if (block.blockName === 'acf/cookiebot') {
        blocks.push(
          <script
            key={`${block.blockName}-${index}`}
            id="CookieDeclaration"
            src={`https://consent.cookiebot.com/${block.attrs.data.id}/cd.js`}
            type="text/javascript"
            data-culture={block.attrs.data.lang}
            async
          />
        )
      }
    })

    let hero = null
    if (article.full_image) {
      hero = <Hero image={article.full_image} title={article.post_title} />
    } else {
      hero = (
        <HeaderContainer>
          <HeaderTexts />
        </HeaderContainer>
      )
    }

    return (
      <PageLayout>
        <Helmet>
          <title>{article.post_title}</title>
          <meta property="og:image" content={article.full_image} />
          <meta property="og:title" content={article.post_title} />
        </Helmet>
        <Container>
          {previewNotification}
          {hero}
          {blocks}
        </Container>
      </PageLayout>
    )
  }
}

const mapStateToProps = (
  { blog },
  {
    router: {
      query: { slug } // eslint-disable-line
    }
  }
) => {
  return {
    blog,
    currentArticle: blog.currentArticle
  }
}

export default withTranslation(['common', 'page-titles'])(
  AuthHoc(
    withRouter(
      connect(
        mapStateToProps,
        {
          getArticle
        }
      )(AuthHoc(Page))
    )
  )
)
