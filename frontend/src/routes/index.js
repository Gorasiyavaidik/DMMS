import { lazy } from 'react';
import BuyerDetail from '../pages/Individuals/BuyerDetail';
const Calendar = lazy(() => import('../pages/MyCalendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const Inventory = lazy(() => import('../pages/Inventory/inventory'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Adddiamond = lazy(()=> import('../pages/Inventory/Adddiamond'));
const EditDiamond = lazy(() => import('../pages/Inventory/EditInventory'));
const Selldiamond = lazy(()=> import('../pages/Inventory/Selldiamond'));
const Staff = lazy(()=> import('../pages/staff/Staff'));
const Buyer = lazy(()=> import('../pages/Individuals/Buyer'));
const Seller = lazy(()=> import('../pages/Individuals/Seller'));
const Broker = lazy(()=> import('../pages/Individuals/Broker'));
const Workshops = lazy(()=> import('../pages/workshop/Workshops'));
const BrokerDetail = lazy(()=> import('../pages/Individuals/BrokerDetail'));
const addIndividual = lazy(()=> import('../pages/Individuals/AddIndividual'));
const SellerDetail = lazy(()=> import('../pages/Individuals/SellerDetail'));
const Workshopdetail = lazy(()=> import('../pages/workshop/WorkshopDetail'));
const Staffdetail = lazy(()=> import('../pages/staff/StaffDetail'))
const AddStaff = lazy(()=> import('../pages/staff/Addstaff'));
const addworkshop = lazy(()=> import('../pages/workshop/addworkshop'));
const Editinventory= lazy(() =>import('../pages/Inventory/EditInventory'))
const Changestate = lazy(() => import('../pages/Inventory/ChangeState'));
const FinancialReport = lazy(()=> import('../pages/Financial/FinancialReport'))
const AddAttandance = lazy(()=> import('../pages/staff/Addattandance'))

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/financialreport',
    title: 'financialreport',
    component: FinancialReport,
  },
  {
    path: '/inventory/inventory',
    title: 'inventory',
    component: Inventory,
  },
  {
    path: '/inventory/adddiamond',
    title: 'adddiamond',
    component: Adddiamond,
  }, 
  {
    path: '/inventory/editdiamond',
    title: 'editdiamond',
    component: EditDiamond,
  }, 
  {
    path: '/inventory/selldiamond',
    title: 'selldiamond',
    component: Selldiamond,
  }, 
  {
    path: '/inventory/editinventory/:id',
    title: 'editinventory',
    component: Editinventory,
  },
  {
    path: '/inventory/changestate/:id',
    title: 'changestate',
    component: Changestate,
  },
  {
    path: '/staff',
    title: 'staff',
    component: Staff,
  }, 
  {
    path: '/staff/addstaff',
    title: 'addstaff',
    component: AddStaff,
  }, 
  {
    path: '/staff/addattandance',
    title: 'addattandance',
    component: AddAttandance,
  }, 
  {
    path: '/staff/:id',
    title: 'staffdetail',
    component: Staffdetail,
  }, 
  {
    path: '/individuals/addIndividual',
    title: 'addIndividual',
    component: addIndividual,
  }, 
  {
    path: '/individuals/Buyer',
    title: 'selldiamond',
    component: Buyer,
  }, 
  {
    path: '/individuals/Seller',
    title: 'seller',
    component: Seller,
  }, 
  {
    path: '/individuals/Broker',
    title: 'Broker',
    component: Broker,
  }, 
  {
    path: '/individuals/Broker/:id',
    title: 'Broker',
    component: BrokerDetail,
  }, 
  {
    path: '/individuals/Buyer/:id',
    title: 'Buyer',
    component: BuyerDetail,
  }, 
  {
    path: '/individuals/Seller/:id',
    title: 'Seller',
    component: SellerDetail,
  }, 
  {
    path: '/workshop/:id',
    title: 'Workshops',
    component: Workshopdetail,
  }, 
  {
    path: '/workshop',
    title: 'Workshops',
    component: Workshops,
  }, 
  {
    path: '/workshop/addworkshop',
    title: 'Workshops',
    component: addworkshop,
  }, 
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
