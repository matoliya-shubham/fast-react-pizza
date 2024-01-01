import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router";
import Loader from "./Loader";

export default function Applayout() {
  const navigation = useNavigation(); // this function will invoke if any route is loading or on form submit. When any of the route will be loading then state of navigation will become loading. We dont need to specify loading state for each page separately. navigation state is universal for entire application
  const isLoading = navigation.state === "loading";
  console.log(isLoading);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <h1>Content</h1>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
