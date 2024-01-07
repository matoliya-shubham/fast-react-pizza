// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher()
  //we want to fetch menu page data when page loads

  useEffect(function(){
    //fetcher has idle, loading, reject state
    if(!fetcher.data && fetcher.state === 'idle')
    fetcher.load('/menu')
  },[fetcher])

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state === 'loading'} ingredients={fetcher?.data?.find(el=>el.id===item.pizzaId)?.ingredients ?? []}/>
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {
        !priority && <UpdateOrder order={order}/>
      }
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;

// sometimes we need to fetch some data from another route, so basically data that is not associated with this current page right here, but we want to do that without causing a navigation sometimes. 
//So, for example, let's say that here in the order page, we wanted to load the menu data again, and we already wrote all the logic for fetching exactly that data, but it is associated to another route. 
//So, to the menu route and not to this one, but still we want to use it here, because there is no point in writing that logic again. So, in other words, what we want to do is to use the data from the menu route, but without the user actually going there. And, so, for that, we can use the useFetcher hook.