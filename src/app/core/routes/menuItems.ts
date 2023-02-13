import { RouteInfo } from '@core/interfaces';

const ROUTER_COMMON: RouteInfo[] = [
  {
    path: '/common//user-profile',
    title: 'Perfil',
    id: 'sibar-user-profile',
    icon: 'fa-solid fa-gear',
    class: 'azure',
  },
];

const ROUTER_DASHBOARD: RouteInfo[] = [
  {
    path: '/common/dashboard',
    title: 'Dashboard',
    id: 'btn-dashboard',
    icon: 'fa-solid fa-chart-simple',
    class: 'azure',
  },
];

export const ROUTES_ADMIN: RouteInfo[] = [
  ...ROUTER_DASHBOARD,
  {
    path: '/admin/manage-users',
    title: 'Usuarios',
    id: 'btn-manage-users',
    icon: 'fa-solid fa-bars',
    class: 'yellow',
  },
  {
    path: '/admin/documents',
    title: 'Documentos',
    id: 'btn-documents',
    icon: 'fa-solid fa-file',
    class: 'azure',
  },
  {
    path: '/admin/manage-students',
    title: 'Estudiantes',
    id: 'btn-students',
    icon: 'fa-solid fa-graduation-cap',
    class: 'yellow',
  },
  {
    path: '/status-document',
    title: 'Tramites',
    id: 'btn-status-document',
    icon: 'fa-solid fa-file',
    class: 'yellow',
  },
  {
    path: 'student/student-document',
    title: 'Mis Tramites',
    id: 'btn-student-document',
    icon: 'fa-solid fa-file',
    class: 'azure',
  },
  ...ROUTER_COMMON,
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
  ...ROUTER_DASHBOARD,
  {
    path: 'status-document',
    title: 'Tramites',
    id: 'btn-status-document',
    icon: 'fa-solid fa-file',
    class: 'yellow',
  },
  ...ROUTER_COMMON,
];

export const ROUTES_STUDENT: RouteInfo[] = [
  {
    path: 'student/student-document',
    title: 'Mis Tramites',
    id: 'btn-student-document',
    icon: 'fa-solid fa-file',
    class: 'azure',
  },
  ...ROUTER_COMMON,
];
