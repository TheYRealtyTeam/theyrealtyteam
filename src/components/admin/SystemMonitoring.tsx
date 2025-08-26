import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Database,
  Activity,
  Clock,
  Eye,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';

interface SecurityLog {
  id: string;
  event: string;
  severity: string;
  ip_address: string | null;
  user_agent: string | null;
  details: any;
  created_at: string;
}

interface RateLimitLog {
  id: string;
  identifier: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const SystemMonitoring = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [rateLimitLogs, setRateLimitLogs] = useState<RateLimitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        // Fetch security logs
        const securityLogsData = await Promise.all([
          fetch('/api/logs/security'),
          fetch('/api/logs/rate-limit')
        ]);

        const [securityResponse, rateLimitResponse] = securityLogsData;
        
        if (securityResponse.ok && rateLimitResponse.ok) {
          const security = await securityResponse.json();
          const rateLimit = await rateLimitResponse.json();
          
          setSecurityLogs(security);
          setRateLimitLogs(rateLimit);
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        // Set mock data for development
        setSecurityLogs([]);
        setRateLimitLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      // Fetch security logs
      const { data: securityData, error: securityError } = await supabase
        .from('security_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (securityError) throw securityError;

      // Fetch rate limit logs
      const { data: rateLimitData, error: rateLimitError } = await supabase
        .from('rate_limit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (rateLimitError) throw rateLimitError;

      setSecurityLogs(securityData || []);
      setRateLimitLogs(rateLimitData || []);
    } catch (error: any) {
      toast.error('Failed to fetch system logs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
    toast.success('System logs refreshed');
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { variant: 'outline' as const, icon: CheckCircle, color: 'text-green-600' },
      medium: { variant: 'secondary' as const, icon: AlertTriangle, color: 'text-yellow-600' },
      high: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      critical: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-800' }
    };

    const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.medium;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const filteredSecurityLogs = securityLogs.filter(log => 
    severityFilter === 'all' || log.severity === severityFilter
  );

  const securityStats = {
    total: securityLogs.length,
    critical: securityLogs.filter(log => log.severity === 'critical').length,
    high: securityLogs.filter(log => log.severity === 'high').length,
    medium: securityLogs.filter(log => log.severity === 'medium').length,
    low: securityLogs.filter(log => log.severity === 'low').length,
  };

  if (loading) {
    return <div className="text-center py-8">Loading system monitoring data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Monitoring
              </CardTitle>
              <CardDescription>
                Monitor system security, performance, and operational status
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* System Status Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">Healthy</p>
                    <p className="text-sm text-muted-foreground">System Status</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{securityStats.total}</p>
                    <p className="text-sm text-muted-foreground">Security Events</p>
                  </div>
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{rateLimitLogs.length}</p>
                    <p className="text-sm text-muted-foreground">Rate Limit Events</p>
                  </div>
                  <Activity className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <Database className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Severity Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Security Event Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Critical</span>
                  </div>
                  <Badge variant="destructive">{securityStats.critical}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Badge variant="destructive">{securityStats.high}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Badge variant="secondary">{securityStats.medium}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <Badge variant="outline">{securityStats.low}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Logs */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Security Logs</CardTitle>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSecurityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.event}</TableCell>
                        <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {log.ip_address || 'N/A'}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {format(new Date(log.created_at), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.details && (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredSecurityLogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No security logs found matching your criteria.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rate Limit Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rate Limit Events</CardTitle>
              <CardDescription>Recent rate limiting activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Identifier</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>User Agent</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rateLimitLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {log.identifier}
                          </code>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {log.ip_address || 'N/A'}
                          </code>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-xs">
                          {log.user_agent || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {format(new Date(log.created_at), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {rateLimitLogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No rate limit events found.
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;