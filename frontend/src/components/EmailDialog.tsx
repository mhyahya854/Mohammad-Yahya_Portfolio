import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

interface EmailDialogProps {
  children?: ReactNode;
  email?: string;
  subject?: string;
  body?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmailDialog({ children, email = "mhyahya04@gmail.com", subject = "", body = "", open, onOpenChange }: EmailDialogProps) {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  const encodedEmail = encodeURIComponent(email);
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encSubject}&body=${encBody}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedEmail}&subject=${encSubject}&body=${encBody}`;
  const mailtoHref = `mailto:${email}?subject=${encSubject}&body=${encBody}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-border/60">
        <DialogHeader>
          <DialogTitle>Send an Email</DialogTitle>
          <DialogDescription>
            Choose your preferred email platform to write your message.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button asChild variant="outline" className="w-full justify-start h-12 text-foreground hover:bg-primary/10 hover:text-primary transition-colors hover-premium-card border-border/60">
            <a href={gmailHref} target="_blank" rel="noopener noreferrer">
              <Mail className="mr-3 h-5 w-5" />
              Gmail
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start h-12 text-foreground hover:bg-primary/10 hover:text-primary transition-colors hover-premium-card border-border/60">
            <a href={outlookHref} target="_blank" rel="noopener noreferrer">
              <Mail className="mr-3 h-5 w-5" />
              Outlook
            </a>
          </Button>
          <Button asChild variant="default" className="w-full justify-start h-12 cta-luminous-sky text-primary-foreground border-none">
            <a href={mailtoHref}>
              <Mail className="mr-3 h-5 w-5 opacity-90" />
              Default Email App
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
