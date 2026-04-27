import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type } = body

    const tagMap: Record<string, string> = {
      policyIssue: 'policyIssue',
      actionItem: 'actionItem',
      resource: 'resource',
      partner: 'partner',
      story: 'story',
      post: 'post',
    }

    const tag = tagMap[_type]
    if (tag) {
      revalidateTag(tag)
    }

    return NextResponse.json({ revalidated: true, tag })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
