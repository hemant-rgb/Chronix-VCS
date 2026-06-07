const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL,SUPABASE_PUBLISHED_KEY } = require("./client-supabase.js");
require("dotenv").config();

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHED_KEY
);

module.exports = supabase;