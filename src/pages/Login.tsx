"use client";

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <Card className="w-full max-w-md shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">Bem-vindo ao VidaFit+</CardTitle>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Faça login ou crie sua conta para começar.</p>
        </CardHeader>
        <CardContent className="p-6">
          <Auth
            supabaseClient={supabase}
            providers={[]} // No third-party providers unless specified
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(142.1 76.2% 36.3%)', // A green color
                    brandAccent: 'hsl(142.1 76.2% 30%)', // A darker green
                  },
                },
              },
            }}
            theme="light" // Default to light theme
            redirectTo={window.location.origin} // Redirect to home after auth
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;