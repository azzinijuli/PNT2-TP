import { createRouter, createWebHistory } from "vue-router";
import Books from "../views/Books.vue";
import Users from "../views/Users.vue";
import BookForm from "../views/BookForm.vue";
import Profile from "../views/Profile.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
