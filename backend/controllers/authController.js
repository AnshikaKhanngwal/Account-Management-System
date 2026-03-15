import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/generateToken.js";


// SIGNUP CONTROLLER
export const signup = async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert([
      {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        balance: 10000
      }
    ]);

  if (error) {
    return res.status(400).json({ error });
  }

  res.json({ message: "User created successfully" });
};



// LOGIN CONTROLLER
export const login = async (req, res) => {

  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(user.id);

  res.json({
    token,
    user
  });

};