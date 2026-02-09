import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, Trash2, Archive, Mail } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  is_archived: boolean | null;
  created_at: string;
}

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    const query = supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!showArchived) {
      query.eq("is_archived", false);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: "Error", description: "Failed to fetch submissions", variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [showArchived]);

  const markAsRead = async (submission: Submission) => {
    if (submission.is_read) return;

    await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", submission.id);

    fetchSubmissions();
  };

  const toggleArchive = async (id: string, currentlyArchived: boolean) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_archived: !currentlyArchived })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update submission", variant: "destructive" });
    } else {
      toast({ title: "Success", description: currentlyArchived ? "Unarchived" : "Archived" });
      fetchSubmissions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete submission", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Submission deleted" });
      fetchSubmissions();
    }
  };

  const openSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    markAsRead(submission);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Contact Submissions
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-sm rounded-full bg-primary text-primary-foreground">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-muted-foreground">View messages from your contact form</p>
        </div>
        <Button
          variant={showArchived ? "default" : "outline"}
          onClick={() => setShowArchived(!showArchived)}
        >
          <Archive className="h-4 w-4 mr-2" />
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No submissions yet
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((submission) => (
                  <TableRow
                    key={submission.id}
                    className={`cursor-pointer ${!submission.is_read ? "bg-primary/5" : ""}`}
                    onClick={() => openSubmission(submission)}
                  >
                    <TableCell>
                      <div>
                        <p className={`font-medium ${!submission.is_read ? "font-semibold" : ""}`}>
                          {submission.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {submission.subject || <span className="text-muted-foreground">No subject</span>}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {!submission.is_read && (
                          <span className="px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                            New
                          </span>
                        )}
                        {submission.is_archived && (
                          <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                            Archived
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openSubmission(submission);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleArchive(submission.id, submission.is_archived || false);
                        }}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(submission.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedSubmission.email}
                  </a>
                </div>
              </div>
              {selectedSubmission.subject && (
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium">{selectedSubmission.subject}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{new Date(selectedSubmission.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => toggleArchive(selectedSubmission.id, selectedSubmission.is_archived || false)}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  {selectedSubmission.is_archived ? "Unarchive" : "Archive"}
                </Button>
                <a href={`mailto:${selectedSubmission.email}`}>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubmissions;
