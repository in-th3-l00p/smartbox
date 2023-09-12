import React, {useEffect, useState} from "react";
import List from "./List";
import {Transaction} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getAllTransactions} from "../api/transaction";
import style from "../styles/Dashboard.module.scss";

export const TransactionDisplay: React.FC<{transaction: Transaction}> = ({ transaction }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className={style.element}>
      <div
        className={style.principalInfo}
        onClick={() => setOpened(!opened)}
      >
        <h4>Card ID: {transaction.card.id} - Slot: {transaction.slot.name}</h4>
        <p className={"ms-auto"}>
          {transaction.createdDate.toLocaleTimeString() + " " +
            transaction.createdDate.toLocaleDateString()}
        </p>
      </div>
      {opened && (
        <div className={style.details}>
          <div>
            <p>ID slot: {transaction.slot.id}</p>
            <p>Nume slot: {transaction.slot.name}</p>
            <p>Volum tranzactie: {transaction.volume}</p>
            <p>ID user: {transaction.card.userId}</p>
            <p>Nume dispozitiv: {transaction.card.device.name}</p>
            <p>Locație dispozitiv: {transaction.card.device.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const AdminTransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, _] = useQuery(async () => {
    setTransactions(await getAllTransactions());
  });

  useEffect(() => {
    setInterval(() => {
      getAllTransactions()
        .then(setTransactions);
    }, 1000)
  }, [])

  return (
    <List title={"Tranzacții"}>
      {(transactions.length === 0 && !loading) && (
        <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
          <h1 className={"my-auto mx-auto text-center"}>Nu a fost făcută nicio tranzacție</h1>
        </div>
      )}
      {transactions.map(transaction => (
        <TransactionDisplay
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </List>
  );
}

export default AdminTransactionList;
