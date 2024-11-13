import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Books from "../views/Books.vue";
import Users from "../views/Users.vue";
import BookForm from "../views/BookForm.vue";
import Profile from "../views/Profile.vue";
import AdminDasboard from "../views/AdminDasboard.vue";
import Login from "../views/Login.vue";
import { useAuthStore } from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/books/add",
    name: "AddBook",
    component: BookForm,
  },
  {
    path: "/books/edit/:id",
    name: "EditBook",
    component: BookForm,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDasboard,
    meta: { requireAuth: true, role: "admin" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.role && !authStore.isAdmin) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
