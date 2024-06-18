import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export const useAdminOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// this function is to fetch an order list from database and shows it to menu screen

export const useUserOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
