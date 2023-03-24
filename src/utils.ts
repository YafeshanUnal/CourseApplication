import { createClient } from "@supabase/supabase-js";

const CreateSupabase = () => {
	const supabase = createClient(
		"https://svvnprlwkovdvqaaxybg.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dm5wcmx3a292ZHZxYWF4eWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NjAwNzQsImV4cCI6MTk5NTIzNjA3NH0.l_3fxNEy_hTSXF_0r_Z5ezoe2VKPQlm1GYA50MTPL80"
	);
	return supabase;
};

export default CreateSupabase;
