'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Faith in Action Global Hub',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Policy Issues')
              .id('policyIssue')
              .child(S.documentTypeList('policyIssue').title('Policy Issues')),
            S.listItem()
              .title('Action Items')
              .id('actionItem')
              .child(S.documentTypeList('actionItem').title('Action Items')),
            S.listItem()
              .title('Resources')
              .id('resource')
              .child(S.documentTypeList('resource').title('Resources')),
            S.listItem()
              .title('Partners')
              .id('partner')
              .child(S.documentTypeList('partner').title('Partners')),
            S.listItem()
              .title('Stories')
              .id('story')
              .child(S.documentTypeList('story').title('Stories')),
            S.listItem()
              .title('Blog Posts')
              .id('post')
              .child(S.documentTypeList('post').title('Blog Posts')),
          ]),
    }),
    visionTool(),
  ],
})
