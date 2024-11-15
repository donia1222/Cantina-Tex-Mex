'use client'

import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

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

      if (day >= 2 && day <= 6) {
        if (day === 6 && currentTime >= 20 * 60) {
          currentStatus = 'closed'
          nextTime = 'Dienstag 18:00'
        } else if (day === 4 || day === 5) {
          if (currentTime >= 11 * 60 + 30 && currentTime < 13 * 60) {
            currentStatus = 'open'
          } else if (currentTime >= 13 * 60 && currentTime < 13 * 60 + 30) {
            currentStatus = 'closing-soon'
            nextTime = '18:00'
          } else if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            currentStatus = 'open'
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            currentStatus = 'closing-soon'
          } else if (currentTime >= 11 * 60 && currentTime < 11 * 60 + 30) {
            currentStatus = 'opening-soon'
            nextTime = '11:30'
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            currentStatus = 'opening-soon'
            nextTime = '18:00'
          } else {
            nextTime = (currentTime < 11 * 60 + 30) ? '11:30' : '18:00'
          }
        } else {
          if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            currentStatus = 'open'
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            currentStatus = 'closing-soon'
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            currentStatus = 'opening-soon'
            nextTime = '18:00'
          } else {
            nextTime = '18:00'
          }
        }
      } else {
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
    <div className="flex justify-center items-center py-2 mt-10">
      <div className={`${bgColor} ${textColor} rounded-full py-2 px-3 flex items-center space-x-2 shadow-md transition-all duration-300 hover:shadow-lg`}>
        <span className={`w-2 h-2 rounded-full bg-current animate-pulse`} aria-hidden="true"></span>
        <span className="text-sm font-medium">{text}</span>
        <Clock className="w-4 h-4" />
      </div>
      <span className={`ml-2 text-sl ${status === 'closed' ? 'text-green-500 font-medium' : 'text-gray-600'}`}>
          {status === 'closing-soon' ? '(20:00)' : status === 'opening-soon' ? `(${nextOpeningTime})` : `Öffnet am: ${nextOpeningTime}`}
        </span>
    </div>
  )
}