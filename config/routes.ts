export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: 'Hello' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      { path: '/admin', redirect: '/admin/team' },
      { icon: 'table', path: '/admin/team', component: './Admin/Team', name: '队伍管理' },
    ],
  },

  { path: '/userList', icon: 'smile', component: './User/UserList', name: '用户列表页' },
  {
    path: '/MatchUserList',
    icon: 'smile',
    component: './User/MatchUserList',
    name: '推荐用户列表页',
  },
  { path: '/teamList', icon: 'smile', component: './User/TeamList', name: '队伍列表页' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
