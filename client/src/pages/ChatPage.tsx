import { useState } from 'react';
import { useRoute } from 'wouter';
import { ChatSidebarContent } from '@/components/ChatSidebarContent';
import { ChatWindow } from '@/components/ChatWindow';
import { ProductDetailDrawer } from '@/components/ProductDetailDrawer';
import { TopBar } from '@/components/TopBar';
import { MobileNav } from '@/components/MobileNav';
import { useChats } from '@/hooks/useChats';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

/**
 * Chat Page
 * Full chat interface with shadcn sidebar and message window
 * Simulates AI responses with rule-based logic
 */
export default function ChatPage() {
  const [, params] = useRoute('/chat/:id');
  const chatId = params?.id || 'new';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { chats, currentChat, sendMessage, createChat, isTyping } = useChats(chatId);
  const { products } = useProducts();

  const handleNewChat = () => {
    createChat('');
  };

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const sidebarStyle = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  } as React.CSSProperties;

  return (
    <div className="h-screen flex flex-col">
      <TopBar showMenuButton={false} />
      
      <SidebarProvider style={sidebarStyle}>
        <div className="flex flex-1 w-full overflow-hidden">
          <Sidebar>
            <ChatSidebarContent
              chats={chats}
              onNewChat={handleNewChat}
            />
          </Sidebar>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center h-14 px-4 border-b border-border md:hidden">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
            </div>
            
            {currentChat ? (
              <ChatWindow
                messages={currentChat.messages}
                products={products}
                onSendMessage={handleSendMessage}
                onProductClick={handleProductClick}
                isTyping={isTyping}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl font-semibold mb-2">
                    Select a chat or start a new one
                  </h2>
                  <p className="text-muted-foreground">
                    Your conversations will appear in the sidebar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>

      <ProductDetailDrawer
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      
      <MobileNav />
    </div>
  );
}
