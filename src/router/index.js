import { createRouter, createWebHashHistory } from 'vue-router'
import LogInForm from '../views/LogInForm.vue'
import NewAppointment from "@/views/NewAppointment.vue";
import PatientsDirectory from "@/views/PatientsDirectory.vue";
import NewPatient from "@/views/NewPatient.vue";
import DoctorsDirectory from "@/views/DoctorsDirectory.vue";
import NewDoctor from "@/views/NewDoctor.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogInForm
  },
  {
    path: '/appointments',
    name: 'appointments',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AppointmentsList.vue')
  },
  {
    path: '/appointment',
    name: 'new-appointment',
    component: NewAppointment
  },
  {
    path: '/patients',
    name: 'patients-directory',
    component: PatientsDirectory
  },
  {
    path: '/patient',
    name: 'new-patient',
    component: NewPatient
  },
  {
    path: '/doctors',
    name: 'doctors-directory',
    component: DoctorsDirectory
  },
  {
    path: '/doctor',
    name: 'new-doctor',
    component: NewDoctor
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
