import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState<string>();
  const [description, setDescription] = useState<string>();

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = JSON.stringify({
      amount,
      description,
    });

    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "POST",
        body: payload,
      });

      if (response.status === 200) {
        alert("Transaction saved successfully");
        return;
      }
      console.error(response?.body);
      if (response.status === 500) {
        alert("Failed to save transaction. Internal server error");
      }
      alert("Invalid transaction");
    } catch (e) {
      console.error("submitHandler error: ", e);
      alert("Failed to save transaction");
    }
  };

  return (
    <div className="main-content">
      <h1>Submit transaction</h1>
      <form onSubmit={submitHandler}>
        <div className="form-content">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            required
            type="number"
            prefix="$"
            value={amount}
            onChange={onAmountChange}
            data-testid="amount-input"
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            data-testid="description-input"
            required
            value={description}
            onChange={onDescriptionChange}
          />

          <button type="submit">Add Transaction</button>
        </div>
      </form>
    </div>
  );
}

export default App;
