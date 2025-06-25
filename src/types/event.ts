import type { BaseEntity } from './common'

export type EventType =
  | 'task'
  | 'meeting'
  | 'reminder'
  | 'appointment'
  | 'deadline'
  | 'personal'
  | 'work'

export type EventStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'postponed'

export type EventPriority = 'low' | 'medium' | 'high' | 'urgent'

export type EventVisibility = 'private' | 'public' | 'position' | 'custom'

export type EventRecurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Event extends BaseEntity {
  title: string
  description?: string
  type: EventType
  status: EventStatus
  priority: EventPriority
  visibility: EventVisibility

  // Datas e horários
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  isAllDay: boolean
  timezone: string

  // Recorrência
  recurrence: EventRecurrence
  recurrenceEnd?: string
  recurrenceCount?: number

  // Localização
  location?: string
  locationUrl?: string

  // Participantes e visibilidade
  createdBy: string
  assignedTo?: string[]
  sharedWith?: string[] // IDs específicos de usuários
  visibleToPositions?: string[] // IDs de cargos que podem ver

  // Metadados
  color?: string
  tags?: string[]
  attachments?: string[]

  // Notificações
  reminders?: EventReminder[]

  // Contadores
  viewCount: number
  commentCount: number
}

export interface EventReminder {
  id: string
  type: 'email' | 'push' | 'sms'
  minutesBefore: number
  isActive: boolean
}

export interface CreateEventDto {
  title: string
  description?: string
  type: EventType
  priority?: EventPriority
  visibility: EventVisibility
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  isAllDay?: boolean
  timezone?: string
  recurrence?: EventRecurrence
  recurrenceEnd?: string
  recurrenceCount?: number
  location?: string
  locationUrl?: string
  assignedTo?: string[]
  sharedWith?: string[]
  visibleToPositions?: string[]
  color?: string
  tags?: string[]
  reminders?: Omit<EventReminder, 'id'>[]
}

export interface UpdateEventDto {
  title?: string
  description?: string
  type?: EventType
  status?: EventStatus
  priority?: EventPriority
  visibility?: EventVisibility
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  isAllDay?: boolean
  timezone?: string
  recurrence?: EventRecurrence
  recurrenceEnd?: string
  recurrenceCount?: number
  location?: string
  locationUrl?: string
  assignedTo?: string[]
  sharedWith?: string[]
  visibleToPositions?: string[]
  color?: string
  tags?: string[]
  reminders?: Omit<EventReminder, 'id'>[]
}

export interface EventFilters {
  startDate?: string
  endDate?: string
  type?: EventType[]
  status?: EventStatus[]
  priority?: EventPriority[]
  visibility?: EventVisibility[]
  createdBy?: string
  assignedTo?: string
  tags?: string[]
  search?: string
  positions?: string[]
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  resource: Event
}
