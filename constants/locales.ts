const locales = [{"locale":"en-CA",tl:'EN'},{"locale":"zh-CN",tl:'中文'}];

const defaultLocale = "en";

const translates:{[key:string]:any} = {
  'en-CA':{
    home:{
      Login:"Login",
      Dashboard: "Dashboard"
    }
  },
  'zh-CN':{
    home:{
      Login:"登陆",
      Dashboard: "控制面板"
    }
  }
};

export {defaultLocale, locales, translates};