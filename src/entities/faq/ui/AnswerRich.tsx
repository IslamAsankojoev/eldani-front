'use client'

import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'

import { Button } from '@/shadcn/ui/button'

export const AnswerRich = ({ content }: { content: any }) => {
  return content ? (
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
        'list-item': ({ children }) => {
          return <li className="list-outside list-disc ">{children}</li>
        },
        list: ({ children }) => {
          return <ul className="list-outside list-disc pl-5">{children}</ul>
        },
        code: ({ children }) => {
          return (
            <pre className="my-2 rounded-lg bg-slate-500 p-2 text-white dark:bg-zinc-700">
              {children}
            </pre>
          )
        },
        image: ({ src, alt }: any) => {
          return (
            <img src={src} alt={alt} className="h-auto w-full rounded-lg" />
          )
        },
        quote: ({ children }) => {
          return (
            <blockquote className="my-4 border-l-4 border-slate-500 pl-4">
              {children}
            </blockquote>
          )
        },
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
            return <hr className="mt-4 border-none" />
          } else {
            return <p>{props.children}</p>
          }
        },
        link: ({ children, url }) => {
          return (
            <>
              <Button
                variant="link"
                asChild
                className="line-clamp-none inline-block h-fit p-0 text-base"
              >
                <a href={url} target="_blank">
                  {children}
                </a>
              </Button>
              &nbsp;
            </>
          )
        },
      }}
    />
  ) : null
}
