import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData(); //to get data from loader function
  console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu(); //here we use services to fetch data
  return menu;
}
export default Menu;

//generally we fetch data in useEffect but it is render and fetch approach first ui is rendered and then data is fetched and populate in ui
// but by using loader function of react router dom data is fetched at the same time when ui start loading
// loader function can be placed anywhere but it is by convention generally initialised in the same component
