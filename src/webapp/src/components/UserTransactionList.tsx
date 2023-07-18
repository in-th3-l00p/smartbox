import React, {useEffect, useState} from "react";
import {Transaction} from "../utils/dtos";
import useQuery from "../hooks/useQuery";
import {getCurrentUserTransactions} from "../api/transaction";
import List from "./List";
import {TransactionDisplay} from "./AdminTransactionList";

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
    <List title={"Trazacțiile tale"}>
      {transactions.map((transaction, index) => (
        <TransactionDisplay transaction={transaction} key={index} />
      ))}
    </List>
  )
}

export default UserTransactionList;
