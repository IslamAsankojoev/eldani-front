import {ImageLoaderProps} from 'next/image'

export const imageLoader = ({ src, width, quality }:ImageLoaderProps) => {
  return `${process.env.API_URL}${src}?w=${width}&q=${quality || 75}`
}