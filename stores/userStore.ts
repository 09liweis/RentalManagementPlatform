import { showToast } from '@/components/common/Toast';
import { fetchData } from '@/utils/http';
import { get } from 'http';
import { create } from 'zustand'

interface User {
  _id?:string;
  email: string;
  password?: string;
}

interface UserState {
  loginUser: any,
  login: (user: User) => any,
  fetchUser:() => void;
}

const useUserStore = create<UserState>((set, get) => ({
  loginUser: {},
  login: async ({email,password}) => {
    const {token,err} = await fetchData({url:'/api/login',method:'POST',body:{email,password}});
    if (token) {
      localStorage.setItem("auth-token", token);
      showToast("Login Successful");
      get().fetchUser();
    } else {
      showToast(err);
    }
    return {err};
  },
  fetchUser: async () => {
    if (!localStorage.getItem("auth-token")) return;
    const {user, err} = await fetchData({url:'/api/user'});
    if (err) {
      showToast(err);
    } else {
      set({loginUser:user});
    }
  },
  removeAllBears: () => set({ loginUser: {} }),
}))

export default useUserStore;