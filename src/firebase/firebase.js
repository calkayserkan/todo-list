import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
  deleteDoc,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAqjG7B8QER7-fL1bBTbts65Y5dncWPt54",
  authDomain: "todo-app-dfebb.firebaseapp.com",
  projectId: "todo-app-dfebb",
  storageBucket: "todo-app-dfebb.appspot.com",
  messagingSenderId: "1058634196905",
  appId: "1:1058634196905:web:87d623ed6a7f760de806b8",
  measurementId: "G-HWQPMW17KB",
};
import { store } from "../store";
import {
  login as loginHandle,
  logout as logoutHandle,
} from "../features/auth/authSlice";
import { setTodos } from "../features/todos/todoSlice";
import { toast } from "react-hot-toast";

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();

//----------------------------------Firestore----------------------------------
export const db = getFirestore(app);
//----------------------------------Firestore----------------------------------export const register = async (email, password) => {

const toastStyle = {
  style: {
    border: "1px solid rgba(250, 215, 179,1)",
    padding: "8px",
    color: "rgba(250, 215, 179,1)",
    background: "rgba(10, 50, 50,1)",
  },
  iconTheme: {
    primary: "rgba(250, 215, 179,1)",
    secondary: "rgba(10, 50, 50,1)",
  },
};

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Registration Successful");
    return user;
  } catch (error) {
    if(error.code === "auth/email-already-in-use") {
      toast.error("An Account With This Email Already Exists");
    }else if(error.code === "auth/weak-password") {
      toast.error("Password Should Be At Least 6 Characters");
    }else{
      toast.error(error.message);
    }
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Welcome ${email}`, {
      style: toastStyle.style,
      iconTheme: toastStyle.iconTheme,
      duration: 3000,
    });
    return user;
  } catch (error) {
    if(error.code === "auth/wrong-password") {
      toast.error("Wrong Password");
    }else if(error.code === "auth/user-not-found") {
      toast.error("No Account Found With This Email");
    }else if(error.code === "auth/user-disabled") {
      toast.error("This Account İs Disabled");
    }else{
      toast.error(error.message);
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout Successful");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
    // READ TODO
    onSnapshot(
      query(
        collection(db, "todos"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      ),
      (doc) => {
        store.dispatch(
          setTodos(
            doc.docs.reduce(
              (todos, todo) => [...todos, { ...todo.data(), id: todo.id }],
              []
            )
          )
        );
      }
    );
  } else {
    store.dispatch(logoutHandle());
  }
});
//----------------------------------Firestore----------------------------------
//?---------------------------------Todo---------------------------------
export const addTodo = async (data) => {
  data.createdAt = serverTimestamp();
  try {
    const result = await addDoc(collection(db, "todos"), data);
    toast.success(`Todo added: ${data.todo}`, {
      style: toastStyle.style,
      iconTheme: toastStyle.iconTheme,
      duration: 3000,
    });
    return result.id;
  } catch (error) {
    toast.error(error.message);
  }
};
export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateTodo = async (id, data) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, data);
    if (data.todo === undefined) {
      return true;
    }
    else{
      toast.success(`Todo updated:${data.todo}`, {
        style: toastStyle.style,
        iconTheme: toastStyle.iconTheme,
        duration: 3000,
      });
    }
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
//?---------------------------------Todo---------------------------------

export default app;
