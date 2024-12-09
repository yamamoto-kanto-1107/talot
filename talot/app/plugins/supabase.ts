import { defineNuxtPlugin } from "nuxt/app";
import { createClient } from "@supabase/supabase-js";


export default defineNuxtPlugin(() => {
  const projectUrl = "https://kpamdpwvoarkoxxzgstc.supabase.co";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwYW1kcHd2b2Fya294eHpnc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTMxMzQsImV4cCI6MjA0NzQ4OTEzNH0.rX5eepglU7M-NVRo8RHpVaMGt64ydFEpHlsxShCeurU"
  const supabase = createClient(projectUrl, anonKey);

  return {
    provide: {
      supabase: supabase,
    }
  }
});