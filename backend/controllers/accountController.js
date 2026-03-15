// import { supabase } from "../config/supabaseClient.js";


// // GET BALANCE
// export const getBalance = async (req, res) => {
//   try {

//     const userId = req.user;

//     const { data, error } = await supabase
//       .from("users")
//       .select("balance")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       return res.status(400).json({ error });
//     }

//     res.json({
//       balance: data.balance
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // GET ALL USERS
// export const getUsers = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("users")
//       .select("id,name,email");

//     if (error) {
//       return res.status(400).json({ error });
//     }

//     res.json(data);

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }

// };



// export const transferMoney = async (req, res) => {
//   const senderId = req.user;
//   const { receiverId, amount } = req.body;

//   if (!receiverId || !amount) {
//     return res.status(400).json({ message: "Receiver and amount required" });
//   }

//   // Get sender
//   const { data: sender } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", senderId)
//     .single();

//   if (!sender) return res.status(404).json({ message: "Sender not found" });

//   if (sender.balance < amount) {
//     return res.status(400).json({ message: "Insufficient balance" });
//   }

//   // Get receiver
//   const { data: receiver } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", receiverId)
//     .single();

//   if (!receiver) {
//     return res.status(404).json({ message: "Receiver not found" });
//   }

//   // Update balances
//   await supabase
//     .from("users")
//     .update({ balance: sender.balance - amount })
//     .eq("id", senderId);

//   await supabase
//     .from("users")
//     .update({ balance: receiver.balance + amount })
//     .eq("id", receiverId);

//   // Insert transactions **correctly**
//   // Sender sees debit
//   await supabase.from("transactions").insert([
//     {
//       sender_id: senderId,
//       receiver_id: receiverId,
//       amount,
//       transaction_type: "debit",
//       created_at: new Date(),
//     },
//   ]);

//   // Receiver sees credit
//   await supabase.from("transactions").insert([
//     {
//       sender_id: senderId,
//       receiver_id: receiverId,
//       amount,
//       transaction_type: "credit",
//       created_at: new Date(),
//     },
//   ]);

//   res.json({ message: "Transfer successful" });
// };


// // ACCOUNT STATEMENT
// export const getStatement = async (req, res) => {
//   const userId = req.user;

//   const { data: transactions } = await supabase
//     .from("transactions")
//     .select("*")
//     .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
//     .order("created_at", { ascending: false });

//   res.json(transactions);
// };

import { supabase } from "../config/supabaseClient.js";

// GET BALANCE & USER ID
export const getBalance = async (req, res) => {
  try {
    const userId = req.user;

    const { data, error } = await supabase
      .from("users")
      .select("id, balance")
      .eq("id", userId)
      .single();

    if (error) {
      return res.status(400).json({ error });
    }

    res.json({
      id: data.id, // Returning ID helps the frontend logic
      balance: data.balance
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email");

    if (error) {
      return res.status(400).json({ error });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// TRANSFER MONEY (Fixed to insert only one record)
export const transferMoney = async (req, res) => {
  const senderId = req.user;
  const { receiverId, amount } = req.body;

  if (!receiverId || !amount || amount <= 0) {
    return res.status(400).json({ message: "Valid receiver and amount required" });
  }

  try {
    // 1. Fetch sender and receiver
    const { data: sender } = await supabase.from("users").select("balance").eq("id", senderId).single();
    const { data: receiver } = await supabase.from("users").select("balance").eq("id", receiverId).single();

    if (!sender || !receiver) return res.status(404).json({ message: "User not found" });
    if (sender.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    // 2. Update balances
    await supabase.from("users").update({ balance: sender.balance - Number(amount) }).eq("id", senderId);
    await supabase.from("users").update({ balance: receiver.balance + Number(amount) }).eq("id", receiverId);

    // 3. Insert ONE transaction record
    // We label it as 'transfer'. The frontend will decide if it's +/- based on the IDs.
    await supabase.from("transactions").insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        amount: Number(amount),
        transaction_type: "transfer",
        created_at: new Date(),
      },
    ]);

    res.json({ message: "Transfer successful" });
  } catch (err) {
    res.status(500).json({ message: "Transfer failed due to server error" });
  }
};

// ACCOUNT STATEMENT
export const getStatement = async (req, res) => {
  try {
    const userId = req.user;

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error });
    }

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};