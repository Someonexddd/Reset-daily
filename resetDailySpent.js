const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mmtehppsoiczodxdxxla.supabase.co';
const supabaseKey = 'your-service-role-key'; // Use service role key
const supabase = createClient(supabaseUrl, supabaseKey);

async function resetDailySpent() {
  const { data, error } = await supabase
    .from('Budgets')
    .update({ SpentDaily: 0 })
    .not('SpentDaily', 'is', null); // To avoid resetting if the field is null

  if (error) {
    console.error('Error resetting daily spent:', error);
  } else {
    console.log('Successfully reset daily spent for all budgets.');
  }
}

// Schedule the job to run at midnight every day Tokyo time
cron.schedule('0 0 * * *', resetDailySpent, {
  timezone: "Asia/Tokyo"
});

console.log('Cron job scheduled to reset daily spent every day at midnight Tokyo time.');
