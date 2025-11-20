import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface RecaptchaProviderProps {
  children: ReactNode;
}

/**
 * Wrapper for Google reCAPTCHA v3 provider
 * Only loads in production when VITE_RECAPTCHA_SITE_KEY is set
 */
export const RecaptchaProvider = ({ children }: RecaptchaProviderProps) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Only enable reCAPTCHA in production with valid site key
  if (import.meta.env.PROD && siteKey) {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={siteKey}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
    );
  }

  return <>{children}</>;
};
