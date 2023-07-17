import React from "react";
import style from "../styles/Dashboard.module.scss";

const List: React.FC<{
  title: string;
  children?: JSX.Element | JSX.Element[] | any;
}> = ({ title, children }) => {
  return (
    <div className={style.listContainer}>
      <h3 className={style.title}>{title}</h3>
      <ul className={style.content}>
        {children}
      </ul>
    </div>
  );
}

export default List;
