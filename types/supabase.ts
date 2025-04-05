export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      health_profiles: {
        Row: {
          id: string
          user_id: string
          date_of_birth: string | null
          gender: string | null
          height: number | null
          weight: number | null
          blood_type: string | null
          allergies: string[] | null
          chronic_conditions: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date_of_birth?: string | null
          gender?: string | null
          height?: number | null
          weight?: number | null
          blood_type?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date_of_birth?: string | null
          gender?: string | null
          height?: number | null
          weight?: number | null
          blood_type?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          name: string
          dosage: string | null
          frequency: string | null
          start_date: string | null
          end_date: string | null
          instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          dosage?: string | null
          frequency?: string | null
          start_date?: string | null
          end_date?: string | null
          instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          dosage?: string | null
          frequency?: string | null
          start_date?: string | null
          end_date?: string | null
          instructions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          doctor_name: string | null
          doctor_specialty: string | null
          appointment_date: string | null
          location: string | null
          notes: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          doctor_name?: string | null
          doctor_specialty?: string | null
          appointment_date?: string | null
          location?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          doctor_name?: string | null
          doctor_specialty?: string | null
          appointment_date?: string | null
          location?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      medical_reports: {
        Row: {
          id: string
          user_id: string
          report_type: string | null
          report_date: string | null
          report_content: string | null
          file_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          report_type?: string | null
          report_date?: string | null
          report_content?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          report_type?: string | null
          report_date?: string | null
          report_content?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          full_name: string
          specialty: string | null
          avatar_url: string | null
          rating: number | null
          location: string | null
          available: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          specialty?: string | null
          avatar_url?: string | null
          rating?: number | null
          location?: string | null
          available?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          specialty?: string | null
          avatar_url?: string | null
          rating?: number | null
          location?: string | null
          available?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      specializations: {
        Row: {
          id: string
          name: string
          icon_name: string | null
          wait_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon_name?: string | null
          wait_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon_name?: string | null
          wait_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

