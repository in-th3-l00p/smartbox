import React, {useEffect, useState} from "react";
import {Transaction} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getCurrentUserTransactions} from "../api/transaction";
import List from "./List";
import {TransactionDisplay} from "./AdminTransactionList";
import {USER_DASHBOARD_TRANSACTION_LIST_EMPTY, USER_DASHBOARD_TRANSACTION_LIST_TITLE} from "../utils/text";

const UserTransactionList = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, _] = useQuery(async () => {
    setTransactions(await getCurrentUserTransactions());
  });

  useEffect(() => {
    setInterval(() => {
      getCurrentUserTransactions()
        .then(setTransactions);
      }, 1000)
  }, []);

  return (
    <List title={USER_DASHBOARD_TRANSACTION_LIST_TITLE}>
      {(transactions.length === 0 && !loading) && (
        <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
          <h1 className={"my-auto mx-auto text-center"}>{USER_DASHBOARD_TRANSACTION_LIST_EMPTY}</h1>
        </div>
      )}
      {transactions.map((transaction, index) => (
        <TransactionDisplay transaction={transaction} key={index} />
      ))}
    </List>
  )
}

export default UserTransactionList;
