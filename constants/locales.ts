const locales = [{"locale":"en-CA",tl:'EN'},{"locale":"zh-CN",tl:'中文'}];

const defaultLocale = "en";

const translates:{[key:string]:any} = {
  'en-CA':{
    home:{
      Login:"Login",
      Logout: 'Logout',
      Dashboard: "Dashboard",
      Properties: 'Properties',
      Rooms: 'Rooms',
      Tenants: 'Tenants'
    },
    dashboard:{
      AddNew: 'Add New',
      Edit: 'Edit',
      Cancel: 'Cancel',
      Delete: 'Delete',
      AddRent: 'Add Rent',
      pending: 'Pending',
      paid: 'Paid',
    }
  },
  'zh-CN':{
    home:{
      Login:"登陆",
      Logout: '登出',
      Dashboard: "控制面板",
      Properties: '房屋',
      Rooms: '房间',
      Tenants: '租客'
    },
    dashboard:{
      AddNew: '添加',
      Edit: '编辑',
      Cancel: '取消',
      Delete: '删除',
      AddRent: '添加房租',
      pending: '等待',
      paid: '已付',
    }
  }
};

export {defaultLocale, locales, translates};