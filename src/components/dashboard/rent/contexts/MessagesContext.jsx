import React, { createContext, useContext, useMemo, useState } from 'react';

const initialThreads = [
  {
    threadId: 'MSG-001',
    subject: 'Rent payment question',
    propertyId: 'PROP-002',
    propertyName: '2 Bedroom Duplex in Ikoyi',
    category: 'Payments',
    status: 'OPEN',
    unreadCount: 1,
    lastMessage: 'We have processed your last payment.',
    lastUpdatedAt: '2025-01-15 09:20',
    messages: [
      { id: 'm1', sender: 'USER', text: 'Hi, can you confirm my rent payment?', createdAt: '2025-01-15 09:00' },
      { id: 'm2', sender: 'SUPPORT', text: 'We have processed your last payment.', createdAt: '2025-01-15 09:20' }
    ]
  },
  {
    threadId: 'MSG-002',
    subject: 'Maintenance follow-up',
    propertyId: 'PROP-002',
    propertyName: '2 Bedroom Duplex in Ikoyi',
    category: 'Maintenance Follow-up',
    status: 'RESOLVED',
    unreadCount: 0,
    lastMessage: 'Issue resolved. Thank you.',
    lastUpdatedAt: '2025-01-12 14:10',
    messages: [
      { id: 'm3', sender: 'USER', text: 'Any update on the electrical issue?', createdAt: '2025-01-12 13:45' },
      { id: 'm4', sender: 'SUPPORT', text: 'Issue resolved. Thank you.', createdAt: '2025-01-12 14:10' }
    ]
  }
];

const MessagesContext = createContext();

export const useMessages = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
};

export const MessagesProvider = ({ children }) => {
  const [threads, setThreads] = useState(initialThreads);

  const addThread = (thread) => {
    setThreads((prev) => [thread, ...prev]);
  };

  const addMessage = (threadId, message) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.threadId === threadId
          ? {
              ...t,
              messages: [...t.messages, message],
              lastMessage: message.text,
              lastUpdatedAt: message.createdAt,
              unreadCount: 0,
              status: message.sender === 'USER' && t.status === 'RESOLVED' ? 'OPEN' : t.status
            }
          : t
      )
    );
  };

  const setStatus = (threadId, status) => {
    setThreads((prev) =>
      prev.map((t) => (t.threadId === threadId ? { ...t, status } : t))
    );
  };

  const markRead = (threadId) => {
    setThreads((prev) =>
      prev.map((t) => (t.threadId === threadId ? { ...t, unreadCount: 0 } : t))
    );
  };

  const value = useMemo(
    () => ({
      threads,
      addThread,
      addMessage,
      setStatus,
      markRead
    }),
    [threads]
  );

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};

export default MessagesContext;
