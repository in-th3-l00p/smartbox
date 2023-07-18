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
        <h4>Card ID: {transaction.card.id} - Slot ID: {transaction.slot.id}</h4>
        <p className={"ms-auto"}>{
          transaction
            .createdDate
            .replace("Z", " ")
            .replace("T", " ")}
        </p>
      </div>
      {opened && (
        <div className={style.details}>
          <div>
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
