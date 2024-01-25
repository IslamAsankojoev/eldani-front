'use client'

import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'

export const Description = ({ content }: { content: any }) => {
  return (
    <BlocksRenderer
      content={content}
      modifiers={{
        code: ({ children }) => (
          <code className="my-2 rounded-lg bg-slate-500 p-2 text-white dark:bg-zinc-700">
            {children}
          </code>
        ),
      }}
      blocks={{
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-balance text-3xl">{children}</h1>
            case 2:
              return <h2 className="text-balance text-2xl">{children}</h2>
            case 3:
              return <h3 className="text-balance text-xl">{children}</h3>
            case 4:
              return <h4 className="text-balance text-lg">{children}</h4>
            case 5:
              return <h5 className="text-balance text-base">{children}</h5>
            case 6:
              return <h6 className="text-balance text-sm">{children}</h6>
          }
        },
        paragraph: (props) => {
          // @ts-ignore
          if (props.children[0].props.text === '') {
            return <br />
          } else {
            return <p>{props.children}</p>
          }
        },
        link: ({ children, url }) => {
          return (
            <a className="text-rose-600" href={url} target="_blank">
              {children}
            </a>
          )
        },
      }}
    />
  )
}
