'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, Clock, Users, ArrowRight, Flame } from 'lucide-react'
import type { ActionItem } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import Button from './Button'

const urgencyConfig = {
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  high: { label: 'High Priority', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-brand-orange' },
  medium: { label: 'Active', color: 'bg-blue-100 text-brand-blue border-blue-200', dot: 'bg-brand-blue' },
  ongoing: { label: 'Ongoing', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
}

const typeLabels = {
  petition: 'Petition',
  event: 'Event',
  letter: 'Letter Campaign',
  donation: 'Donate',
  volunteer: 'Volunteer',
  prayer: 'Prayer',
  awareness: 'Awareness',
}

interface ActionModuleProps {
  action: ActionItem
  compact?: boolean
}

export default function ActionModule({ action, compact = false }: ActionModuleProps) {
  const urgency = urgencyConfig[action.urgency || 'medium']
  const progressPercent = action.goal && action.progress
    ? Math.min(Math.round((action.progress / action.goal) * 100), 100)
    : null

  if (compact) {
    return (
      <article className="bg-white rounded-xl border border-gray-100 p-4 shadow-card hover:shadow-card-hover transition-all group">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-orange-50 flex items-center justify-center flex-shrink-0">
            <Flame size={20} className="text-brand-orange" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${urgency.color}`}>
                {urgency.label}
              </span>
              <span className="text-xs text-gray-500">{typeLabels[action.type]}</span>
            </div>
            <h3 className="font-semibold text-brand-navy text-sm leading-snug group-hover:text-brand-blue transition-colors">
              {action.title}
            </h3>
            {action.ctaUrl && (
              <a
                href={action.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-brand-blue text-xs font-medium hover:gap-2 transition-all"
              >
                {action.ctaLabel || 'Take Action'} <ArrowRight size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col">
      {action.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={urlFor(action.coverImage).width(500).height(192).url()}
            alt={action.coverImage.alt || action.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${urgency.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} aria-hidden="true" />
              {urgency.label}
            </span>
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          {!action.coverImage && (
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${urgency.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} aria-hidden="true" />
              {urgency.label}
            </span>
          )}
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {typeLabels[action.type]}
          </span>
        </div>

        <h3 className="font-heading font-bold text-brand-navy text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors">
          {action.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {action.summary}
        </p>

        {progressPercent !== null && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span className="flex items-center gap-1">
                <Users size={12} aria-hidden="true" />
                {action.progress?.toLocaleString()} signed
              </span>
              <span>Goal: {action.goal?.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-dark rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-brand-orange font-semibold mt-1">{progressPercent}% of goal</p>
          </div>
        )}

        {action.deadline && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={12} aria-hidden="true" />
            Deadline: {new Date(action.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100">
          {action.ctaUrl ? (
            <Button
              href={action.ctaUrl}
              variant="orange"
              size="md"
              fullWidth
              external
              icon={ArrowRight}
              iconPosition="right"
            >
              {action.ctaLabel || 'Take Action Now'}
            </Button>
          ) : (
            <Button
              href={`/take-action`}
              variant="outline"
              size="md"
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
            >
              Learn More
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
