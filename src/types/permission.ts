export type Resource =
  | 'blog'
  | 'calendar'
  | 'users'
  | 'files'
  | 'analytics'
  | 'settings'
  | 'dashboard'
  | 'positions'
  | 'events'

export type Action =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'list'
  | 'publish'
  | 'unpublish'
  | 'share'
  | 'export'
  | 'import'
  | 'manage'
  | 'assign'
  | 'view_all'
  | 'moderate'

export type Permission = `${Resource}:${Action}` | `${Resource}:*` | '*:*'

// Novas permissões para eventos/calendário
export const EVENT_PERMISSIONS: Permission[] = [
  'events:create',
  'events:read',
  'events:update',
  'events:delete',
  'events:list',
  'events:share',
  'events:view_all',
  'events:assign', // Atribuir eventos a usuários
  'events:export',
  'events:import',
  'events:moderate',
]

// Permissões para cargos
export const POSITION_PERMISSIONS: Permission[] = [
  'positions:create',
  'positions:read',
  'positions:update',
  'positions:delete',
  'positions:list',
  'positions:assign', // Atribuir cargos a usuários
  'positions:manage',
]

export const CALENDAR_PERMISSIONS: Permission[] = [
  'calendar:create',
  'calendar:read',
  'calendar:update',
  'calendar:delete',
  'calendar:list',
  'calendar:share',
  'calendar:export',
  'calendar:view_all', // Ver calendários de todos
]
