/**
 * Toast Provider Component
 * 
 * @description
 * Configures and provides toast notifications throughout the application.
 * Uses react-hot-toast for user-friendly error and success messages.
 */

'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#fff',
          color: '#1e293b',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          fontSize: '14px',
          fontWeight: '500',
        },
        
        // Success toast
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
          style: {
            border: '1px solid #d1fae5',
            background: '#fff',
          },
        },
        
        // Error toast
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            border: '1px solid #fee2e2',
            background: '#fff',
          },
        },
        
        // Loading toast
        loading: {
          duration: Infinity,
          iconTheme: {
            primary: '#f59e0b',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
