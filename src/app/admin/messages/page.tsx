'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Phone } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Messages {
  id: number;
  full_name: string;
  message: string;
  read_status: {
    read_at: string,
    read_status_by_user_id: number
  }[];
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const Messages = ({ }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Messages | null>(null);

  useEffect(() => {
    fetch('api/admin/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data.messages);
      });
  }, []);

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

export const formatPhoneNumber = (phone: string) => {
    if (phone == null) {
      return "";
    }
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  const isUnreadMessage = (message: Messages) => {
    return message.read_status[0].read_at === null;
  }

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };
  
  const handleMarkAsRead = (messageId: number) => {
    fetch(`api/admin/messages`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message_id: messageId, userId: 1 }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessages(messages.map(message => message.id === messageId ? { ...message, read_status: [{ read_at: new Date().toISOString(), read_status_by_user_id: 1 }] } : message));
          setSelectedMessage(messages.find(message => message.id === messageId)!);
          console.log(messages);
        }
      });
  };

  return (
    <div className="flex h-screen">
      {/* Conversation List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              {
                messages.map((message) => {
                  return (
                    <div
                      key={message.id}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                      style={{ backgroundColor: !isUnreadMessage(message) ? 'white' : '#89CFF0' }}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{message.full_name}</p>
                        <p className="text-xs text-gray-500">{message.message}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      {
        selectedMessage && (
          <Card className="flex-1">
            {/* <Card className="w-full border border-border shadow-sm hover:shadow-md transition-shadow duration-200 mx-auto"> */}
              <CardHeader className="bg-muted/50 border-b">
                <CardTitle className="text-xl font-semibold text-foreground tracking-tight">
                  {selectedMessage.full_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 p-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Phone
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {formatPhoneNumber(selectedMessage.phone_number)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Email
                    </span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm font-medium text-primary hover:underline break-all"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
              </CardContent>
              <Separator orientation="horizontal" className="my-0 w-max h-1"  />
            {/* </Card> */}
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{selectedMessage?.message}</p>
                      <p className="text-xs text-gray-500">{formatDateTime(selectedMessage.created_at)}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-start space-x-4 justify-end">
                    <div>
                      <p className="text-sm">I'm good, thanks!</p>
                      <p className="text-xs text-gray-500">10:31 AM</p>
                    </div>
                    <Avatar>
                      <AvatarImage src="https://github.com/user.png" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  </div> */}
                </div>
              </ScrollArea>
              <div className="mt-4 flex space-x-2">
                <Input placeholder="Type your message..." />
                <Button>Send</Button>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default Messages;