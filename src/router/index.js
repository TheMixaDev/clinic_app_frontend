import { createRouter, createWebHashHistory } from 'vue-router'
import LogInForm from '../views/LogInForm.vue'
import NewAppointment from "@/views/NewAppointment.vue";
import PatientsDirectory from "@/views/PatientsDirectory.vue";
import NewPatient from "@/views/NewPatient.vue";
import DoctorsDirectory from "@/views/DoctorsDirectory.vue";
import NewDoctor from "@/views/NewDoctor.vue";
import AddAnalyzesFirst from "@/views/tables/AddAnalyzesFirst.vue";
import AddAnalyzesSecond from "@/views/tables/AddAnalyzesSecond.vue";
import AddAnalyzesThird from "@/views/tables/AddAnalyzesThird.vue";
import AddMedcrops from "@/views/tables/AddMedcrops.vue";
import AddChildbirth from "@/views/tables/AddChildbirth.vue";

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
    path: '/appointment/table/analyzes/1',
    name: 'table-analyzes-1',
    component: AddAnalyzesFirst
  },
  {
    path: '/appointment/table/analyzes/2',
    name: 'table-analyzes-2',
    component: AddAnalyzesSecond
  },
  {
    path: '/appointment/table/analyzes/3',
    name: 'table-analyzes-3',
    component: AddAnalyzesThird
  },
  {
    path: '/appointment/table/crops',
    name: 'table-crops',
    component: AddMedcrops
  },
  {
    path: '/appointment/table/birth',
    name: 'table-birth',
    component: AddChildbirth
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
    path: '/admin',
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
