import React from "react";
import Header from "../header";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css"

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet /> {/* Этот элемент будет заменяться содержимым маршрутов */}
      </div>
    </div>
  );
};
