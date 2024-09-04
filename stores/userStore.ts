import { showToast } from '@/components/common/Toast';
import { fetchData } from '@/utils/http';
import { create } from 'zustand'

interface User {
  _id?:string;
  email: string;
  password?: string;
}

interface UserState {
  loginUser: any,
  login: (user: User) => any,
}

const useUserStore = create<UserState>((set) => ({
  loginUser: {},
  login: async ({email,password}) => {
    const {token,err} = await fetchData({url:'/api/login',method:'POST',body:{email,password}});
    if (token) {
      localStorage.setItem("auth-token", token);
      set({ loginUser: {email} });
      showToast("Login Successful");
    } else {
      showToast(err);
    }
    return {err};
  },
  removeAllBears: () => set({ loginUser: {} }),
}))

export default useUserStore;