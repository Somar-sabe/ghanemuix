import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Link, useLocation } from 'wouter';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

interface ChatSidebarContentProps {
  chats: Chat[];
  onNewChat: () => void;
  onClose?: () => void;
}

/**
 * Chat Sidebar Content
 * Uses shadcn sidebar primitives for ChatGPT-style chat history
 */
export function ChatSidebarContent({ chats, onNewChat, onClose }: ChatSidebarContentProps) {
  const [location] = useLocation();

  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <SidebarHeader className="p-3 border-b border-sidebar-border">
        <Button
          className="w-full justify-start gap-2"
          onClick={onNewChat}
          data-testid="button-new-chat"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            {sortedChats.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No chat history yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start a new conversation
                </p>
              </div>
            ) : (
              <SidebarMenu>
                {sortedChats.map((chat) => {
                  const isActive = location === `/chat/${chat.id}`;
                  return (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => onClose?.()}
                        data-testid={`chat-item-${chat.id}`}
                      >
                        <Link href={`/chat/${chat.id}`}>
                          <MessageSquare className="h-4 w-4" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm line-clamp-1 mb-1">
                              {chat.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(chat.createdAt), {
                                addSuffix: true
                              })}
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          {chats.length} conversation{chats.length !== 1 ? 's' : ''}
        </p>
      </SidebarFooter>
    </>
  );
}
