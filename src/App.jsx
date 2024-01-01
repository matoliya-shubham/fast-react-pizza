import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Applayout from "./ui/Applayout";
import Error from "./ui/Error";

// we fetch data using loaders and we write data using actions provided by react router dom

const router = createBrowserRouter([
  {
    element: <Applayout />, //only layout contain header and footer
    errorElement: <Error />,
    //outlet will be used to render children indside layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, //when we visit this route the loader(convention) function is used to populate the FE with data fetched in it
        errorElement: <Error />, //we can provide customise error element for every route. Each of this error will bubble up to the parent element unless it is handeled in the route itself
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        //actions are used to write or to mutate data, state that is stored on some server. Action allow us to manage these remote server state using action function and forms that we didn't wire up to routes similar we done with loaders
        //here orders are created by sending post req to api hence here we can use actions
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

// about tailwind css

/*
  go to official website --> installation --> select framework (here vite)
  install tailwind in existing project 
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

  go to config file and paste template path from docs in content 
  got to index.css and paste 
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  restart project (we can see that tailwind will auto apply some basic classes to elements)
  these base styles can be found in tailwindsite --> base styles --> preflight

  install tailwind css intelliscence extension and tailwind prettier extension
  google search prettier extension --> github link --> readm.me
  prettier will sort the order of the classes that tailwind recommends it 
  now create prettier config file prettier.config.cjs (not .js) and paste config from read.me

  check docs of colors, text styling, [box model: spacing, borders and display], responsive design, flexbox, grid, elements state and transitions, focus hover etc properties, styling placeholder placeholder:text-stone-400, accent for checkbox, absolute positioning, z-index
  reusable classes with @apply (make those classed in index.css) this should be used whenever there are so many classes used again and again.
  check loader css

  For responsive design tailwind apply css in mobile first criteria means any default classes will be applied for mobile first(min width 640px) when any breakpoint is crossed then new styles will override default classes. (for eg sm:px-6 will start getting apply when width > 640px)

  tailwind config 
  we can change default config of tailwind. We can see default config on tailwind website.
*/
