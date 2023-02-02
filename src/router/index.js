import { createRouter, createWebHashHistory } from 'vue-router'
import LogInForm from '../views/LogInForm.vue'
import NewAppointment from "@/views/NewAppointment.vue";
import PatientsDirectory from "@/views/PatientsDirectory.vue";
import NewPatient from "@/views/NewPatient.vue";
import DoctorsDirectory from "@/views/DoctorsDirectory.vue";
import NewDoctor from "@/views/NewDoctor.vue";
import AddAnalizesFirstTable from "@/views/AddAnalizesFirstTable.vue";
import AddAnalizesSecondTable from "@/views/AddAnalizesSecondTable.vue";
import AddAnalizesThirdTable from "@/views/AddAnalizesThirdTable.vue";
import AddMedcrops from "@/views/AddMedcrops.vue";
import AddChildbirth from "@/views/AddChildbirth.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogInForm
  },
  {
    path: '/analizesfirst',
    name: 'analizesfirst',
    component: AddAnalizesFirstTable
  },
  {
    path: '/analizessecond',
    name: 'analizessecond',
    component: AddAnalizesSecondTable
  },
  {
    path: '/analizesthird',
    name: 'analizesthird',
    component: AddAnalizesThirdTable
  },
  {
    path: '/addmedcrops',
    name: 'addmedcrops',
    component: AddMedcrops
  },
  {
    path: '/addchildbirth',
    name: 'addchildbirth',
    component: AddChildbirth
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
    path: '/new-appointment',
    name: 'new-appointment',
    component: NewAppointment
  },
  {
    path: '/patients-directory',
    name: 'patients-directory',
    component: PatientsDirectory
  },
  {
    path: '/new-patient',
    name: 'new-patient',
    component: NewPatient
  },
  {
    path: '/doctors-directory',
    name: 'doctors-directory',
    component: DoctorsDirectory
  },
  {
    path: '/new-doctor',
    name: 'new-doctor',
    component: NewDoctor
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
