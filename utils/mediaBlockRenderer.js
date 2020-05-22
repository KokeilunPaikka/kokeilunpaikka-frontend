import React from 'react'
import styled from 'styled-components/macro'

const ImageComponent = styled.img`
  max-width: 560px;
`

const Image = ({ src }) => {
  return <ImageComponent src={src} alt="" />
}

const Video = ({ videoURL }) => {
  const vid =
    videoURL.indexOf('//youtu.be') > -1
      ? videoURL.split('/')[videoURL.split('/').length - 1]
      : videoURL.split('&')[0].split('v=')[1]
  return (
    <iframe
      title="Video"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${vid}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullscreen
    />
  )
}

const Media = props => {
  try {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))
    const type = entity.getType()

    let media
    if (type === 'image') {
      const { src } = entity.getData()
      media = <Image src={src} />
    }
    if (type === 'video') {
      const { videoURL } = entity.getData()
      media = <Video videoURL={videoURL} />
    }

    return media
  } catch (err) {
    return null
  }
}

export const mediaBlockRenderer = block => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    }
  }
  return null
}

export const customEntityTransform = block => {
  if (block.type === 'image') {
    return `<img src="${block.data.src}">`
  }
  if (block.type === 'video') {
    const vid =
      block.data.videoURL.indexOf('//youtu.be') > -1
        ? block.data.videoURL.split('/')[
            block.data.videoURL.split('/').length - 1
          ]
        : block.data.videoURL.split('&')[0].split('v=')[1]
    let str = '<iframe title="Video" width="560" height="315" '
    str = `${str}src=https://www.youtube.com/embed/${vid} frameborder="0" `
    str = `${str}allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" `
    str = `${str}allowfullscreen></iframe>`
    return str
  }

  return null
}
