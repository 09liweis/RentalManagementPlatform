import { showToast } from '@/components/common/Toast';
import { USER_DETAIL, USER_LOGIN } from '@/constants/apis';
import { fetchData } from '@/utils/http';
import { create } from 'zustand'

interface User {
  _id?:string;
  email: string;
  password?: string;
}

interface LoginUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  locale?: string;
  address?: string;
  isAdmin?: boolean;
  plan?: string;
  isVerified: boolean;
}

interface UserState {
  loadingUser: boolean,
  loginUser: LoginUser,
  login: (user: User) => any,
  fetchUser:() => void;
  logout:()=>void;
}

const useUserStore = create<UserState>((set, get) => ({
  loadingUser: true,
  loginUser: {} as LoginUser,
  login: async ({email,password}) => {
    const {token,err,locale} = await fetchData({url:USER_LOGIN,method:'POST',body:{email,password}});
    if (token) {
      localStorage.setItem("auth-token", token);
      localStorage.setItem('locale',locale);
      showToast("Login Successful");
      get().fetchUser();
    } else {
      showToast(err);
    }
    return {err,locale};
  },
  fetchUser: async () => {
    if (!localStorage.getItem("auth-token")) {
      set({loadingUser:false});
      return;
    }
    const {user, refreshToken, err} = await fetchData({method:'POST',url:USER_DETAIL,body:{locale:localStorage.getItem('locale')}});
    if (err) {
      showToast(err);
    } else {
      if (refreshToken) {
        localStorage.setItem("auth-token", refreshToken);
      }
      set({loginUser:user});
    }
    set({loadingUser:false});
  },
  logout: () => {
    localStorage.setItem('auth-token','');
    set({ loginUser: {
      name: '',
      email: '',
      isAdmin: false,
      isVerified: false
    } })
  },
}))

export default useUserStore;