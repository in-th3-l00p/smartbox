import React from "react";
import style from "../styles/Dashboard.module.scss";

const List: React.FC<{
  className?: string;
  title: string;
  children?: JSX.Element | JSX.Element[] | any;
}> = ({ className, title, children }) => {
  return (
    <div className={style.listContainer + " " + className}>
      <h3 className={style.title}>{title}</h3>
      <ul className={style.content}>
        {children}
      </ul>
    </div>
  );
}

export default List;
