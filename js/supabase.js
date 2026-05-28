/*
=====================================================
SUPABASE
=====================================================
*/

const SUPABASE_URL =

    "https://gsblzmrnlflyrnxyzgma.supabase.co";

const SUPABASE_ANON_KEY =

    "sb_publishable_GNy0FZQA-k98OR8-EK6Uvg_WpnNQNkh";

/*
=====================================================
CLIENT
=====================================================
*/

window.supabaseClient =

    window.supabase.createClient(

        SUPABASE_URL,

        SUPABASE_ANON_KEY

    );