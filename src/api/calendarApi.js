import api from './axios'

export const calendarApi = {
  getCalendar: () => api.get('/calendar'),
}
