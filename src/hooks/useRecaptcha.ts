import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

/**
 * Hook to execute reCAPTCHA verification
 * Returns a function that generates a token for form submission
 */
export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getRecaptchaToken = async (action: string): Promise<string | null> => {
    // Skip in development or if reCAPTCHA is not loaded
    if (!executeRecaptcha || import.meta.env.DEV) {
      return null;
    }

    try {
      const token = await executeRecaptcha(action);
      return token;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('reCAPTCHA error:', error);
      }
      return null;
    }
  };

  return { getRecaptchaToken };
};
