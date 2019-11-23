import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import FormPage from './components/pages/FormPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelLeftPage from './components/pages/PanelLeftPage';
import PanelRightPage from './components/pages/PanelRightPage';
import RegisterPage from './components/pages/RegisterPage';
import ComandsPage from './components/pages/ComandsPage';
import VotePage from './components/pages/VotePage';
import SetPage from './components/pages/SetPage';
export default [
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/set',
    component: SetPage,
  },
  {
    path: '/vote',
    component: VotePage,
  },
  {
    path: '/com',
    component: ComandsPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/reg',
    component: RegisterPage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
