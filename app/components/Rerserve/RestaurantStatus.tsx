'use client'

import React, { useEffect, useState } from 'react'

type Status = 'open' | 'closing-soon' | 'opening-soon' | 'closed'

export default function RestaurantStatus() {
  const [status, setStatus] = useState<Status>('closed')
  const [nextOpeningTime, setNextOpeningTime] = useState<string>('')

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date()
      const day = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTime = hours * 60 + minutes

      let currentStatus: Status = 'closed'
      let nextTime = ''

      // Mi–Fr (3-5): 11:30–13:30, 18:00–21:00
      // Di & Sa (2,6): 18:00–22:00
      // So & Mo (0,1): Ruhetag
      if (day >= 3 && day <= 5) {
        // Wednesday, Thursday, Friday: midday + evening
        if (currentTime >= 11 * 60 && currentTime < 11 * 60 + 30) {
          currentStatus = 'opening-soon'
          nextTime = '11:30'
        } else if (currentTime >= 11 * 60 + 30 && currentTime < 13 * 60) {
          currentStatus = 'open'
        } else if (currentTime >= 13 * 60 && currentTime < 13 * 60 + 30) {
          currentStatus = 'closing-soon'
          nextTime = '18:00'
        } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
          currentStatus = 'opening-soon'
          nextTime = '18:00'
        } else if (currentTime >= 18 * 60 && currentTime < 20 * 60 + 30) {
          currentStatus = 'open'
        } else if (currentTime >= 20 * 60 + 30 && currentTime < 21 * 60) {
          currentStatus = 'closing-soon'
        } else {
          nextTime = currentTime < 11 * 60 + 30 ? '11:30' : currentTime < 18 * 60 ? '18:00' : 'Mittwoch 11:30'
        }
      } else if (day === 2 || day === 6) {
        // Tuesday & Saturday: evening only
        if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
          currentStatus = 'opening-soon'
          nextTime = '18:00'
        } else if (currentTime >= 18 * 60 && currentTime < 21 * 60 + 30) {
          currentStatus = 'open'
        } else if (currentTime >= 21 * 60 + 30 && currentTime < 22 * 60) {
          currentStatus = 'closing-soon'
        } else {
          nextTime = currentTime < 18 * 60 ? '18:00' : day === 2 ? 'Mittwoch 11:30' : 'Dienstag 18:00'
        }
      } else {
        // Sunday & Monday: closed
        nextTime = 'Dienstag 18:00'
      }

      setStatus(currentStatus)
      setNextOpeningTime(nextTime)
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const getStatusInfo = () => {
    switch (status) {
      case 'open':
        return { text: 'Geöffnet', bgColor: 'bg-green-500', textColor: 'text-green-300' }
      case 'closing-soon':
        return { text: 'Schließt bald', bgColor: 'bg-yellow-500', textColor: 'text-yellow-50' }
      case 'opening-soon':
        return { text: 'Öffnet bald', bgColor: 'bg-blue-500', textColor: 'text-blue-50' }
      case 'closed':
      default:
        return { text: 'Geschlossen', bgColor: 'bg-red-500', textColor: 'text-red-50' }
    }
  }

  const { text, bgColor, textColor } = getStatusInfo()

  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
        {text}
      </span>
      {status === 'closed' && nextOpeningTime && (
        <span className="text-xs text-gray-500">
          Öffnet: {nextOpeningTime}
        </span>
      )}
    </div>
  )
}
