const locales = [{"locale":"en-CA",tl:'EN'},{"locale":"zh-CN",tl:'中文'}];

const defaultLocale = "en";

const translates:{[key:string]:any} = {
  'en-CA':{
    home:{
      Signup: 'Signup',
      Login:"Login",
      Logout: 'Logout',
      SignupAsALandlord: 'Signup as a landlord',
      LoginAsALandlord: 'Login as a landlord',
      HaveAlreadyRegister: 'Already has an account? Login',
      Email: 'Email',
      Password: 'Password',
      ForgotPassword: 'Forgot Password',
      Dashboard: "Dashboard",
      Properties: 'Properties',
      Rooms: 'Rooms',
      Tenants: 'Tenants'
    },
    dashboard:{
      AddNew: 'Add New',
      Add: 'Add',
      Edit: 'Edit',
      Cancel: 'Cancel',
      Delete: 'Delete',
      Name: 'Name',
      AddRent: 'Add Rent',
      pending: 'Pending',
      paid: 'Paid',
    },
    House: "House",
    Townhouse: "Townhouse",
    Condo: "Condo",
    Apartment: "Apartment",
  },
  'zh-CN':{
    home:{
      Signup: '注册',
      Login:"登陆",
      Logout: '登出',
      SignupAsALandlord: '房东请注册',
      LoginAsALandlord: '房东请登录',
      HaveAlreadyRegister: '注册了吗？那就登陆吧',
      Email: '邮箱',
      Password: '密码',
      ForgotPassword: '忘记密码',
      Dashboard: "控制面板",
      Properties: '房屋',
      Rooms: '房间',
      Tenants: '租客'
    },
    dashboard:{
      AddNew: '添加',
      Add: '添加',
      Edit: '编辑',
      Cancel: '取消',
      Delete: '删除',
      Name: '名字',
      AddRent: '添加房租',
      pending: '等待',
      paid: '已付',
    },
    House: "独立屋",
    Townhouse: "联排别墅",
    Condo: "公寓",
    Apartment: "Apartment",
  }
};

export {defaultLocale, locales, translates};