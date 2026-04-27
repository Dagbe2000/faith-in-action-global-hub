import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  organization?: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json()
    const { name, email, organization, subject, message } = body

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
    }

    // === Email sending (uncomment and configure your preferred provider) ===
    //
    // Option A: Resend (recommended)
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@faithinactionglobalhub.org',
    //   to: process.env.CONTACT_EMAIL_TO || 'info@faithinactionglobalhub.org',
    //   subject: `[Contact Form] ${subject} — from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br />')}</p>
    //   `,
    // })
    //
    // Option B: Nodemailer / SMTP
    // Option C: SendGrid, Postmark, etc.
    //
    // For now, log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', { name, email, organization, subject, message })
    }

    return NextResponse.json({ success: true, message: 'Message received. We\'ll be in touch soon.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
