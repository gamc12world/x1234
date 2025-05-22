ALTER TABLE public.orders
    ADD CONSTRAINT orders_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id);

-- This is the "down" section
ALTER TABLE public.orders
    DROP CONSTRAINT orders_user_id_fkey;



