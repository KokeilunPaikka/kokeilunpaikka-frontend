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

class Article extends Component {
  static async getInitialProps(ctx) {
    const { store, query } = ctx
    const { slug } = query

    let preview = getParameterByName('preview', ctx.asPath)
    const thumbnail = getParameterByName('_thumbnail_id', ctx.asPath)
    const isNew = getParameterByName('new', ctx.asPath)
    if (isNew) {
      preview = getParameterByName('p', ctx.asPath)
    }

    await store.dispatch(getArticle(slug, preview, thumbnail, isNew, 'post'))

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
      }
    })

    let hero = null
    if (article.full_image) {
      hero = <Hero image={article.full_image} title={article.post_title} />
    }

    return (
      <PageLayout>
        <Helmet>
          <title>{article.post_title}</title>
          <meta property="og:title" content={article.post_title} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={article.full_image} />
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
      query: { slug }
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
      )(AuthHoc(Article))
    )
  )
)
