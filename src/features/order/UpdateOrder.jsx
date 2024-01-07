import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder({order}) {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method="PATCH" className="text-right">
    <Button type={'primary'}>Make Priority</Button>
    </fetcher.Form>
  )
}

export async function action({request,params}){
  //we need to update only priority in order object hence we are using PATCH for updating whole object we will use PUT
  const data = {priority: true}
  await updateOrder(params.orderId, data)
  return null 
}

// So re-validation basically means that React Router knows that the data has changed as a result of this action. And so then whenever that happens, it'll automatically re-fetch the data in the background and then re-render the page with that new data.