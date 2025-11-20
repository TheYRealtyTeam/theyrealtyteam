import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface SecurityEvent {
  event: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: Json;
  ip_address?: string;
  user_agent?: string;
}

class SecurityLogger {
  private static instance: SecurityLogger;
  private eventQueue: SecurityEvent[] = [];
  private isProcessing = false;

  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }

  async logEvent(event: SecurityEvent): Promise<void> {
    // Add contextual information
    const enrichedEvent: SecurityEvent = {
      ...event,
      ip_address: event.ip_address || this.getClientIP(),
      user_agent: event.user_agent || navigator.userAgent,
      details: {
        ...((event.details as Record<string, unknown>) || {}),
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer
      }
    };

    this.eventQueue.push(enrichedEvent);
    await this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const events = [...this.eventQueue];
      this.eventQueue = [];

      // Batch insert for better performance
      const { error } = await supabase
        .from('security_logs')
        .insert(events);

      if (error && import.meta.env.DEV) {
        console.error('Failed to log security events:', error);
      }
      // Re-queue events if logging fails
      if (error) {
        this.eventQueue.unshift(...events);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Security logging error:', error);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private getClientIP(): string {
    // This is a best-effort approach for client IP detection
    // In production, this would typically be handled server-side
    return 'client-side';
  }

  // Convenience methods for common security events
  async logValidationFailure(field: string, value: string, reason: string): Promise<void> {
    await this.logEvent({
      event: 'validation_failure',
      severity: 'medium',
      details: {
        field,
        value: value.substring(0, 100), // Truncate for privacy
        reason,
        form_type: 'contact_form'
      }
    });
  }

  async logSuspiciousActivity(activity: string, details: Record<string, unknown>): Promise<void> {
    await this.logEvent({
      event: 'suspicious_activity',
      severity: 'high',
      details: {
        activity,
        ...details
      }
    });
  }

  async logRateLimitExceeded(identifier: string, limit: number): Promise<void> {
    await this.logEvent({
      event: 'rate_limit_exceeded',
      severity: 'medium',
      details: {
        identifier,
        limit,
        type: 'client_side'
      } as Json
    });
  }

  async logAuthenticationAttempt(success: boolean, method: string, details?: Record<string, unknown>): Promise<void> {
    await this.logEvent({
      event: success ? 'authentication_success' : 'authentication_failure',
      severity: success ? 'low' : 'medium',
      details: {
        method,
        ...details
      } as Json
    });
  }
}

export const securityLogger = SecurityLogger.getInstance();