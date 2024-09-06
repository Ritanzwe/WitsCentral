import React, { useState } from 'react';

const ChatWithTutor = ({ selectedTutor }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'student', text: newMessage }]);
      setNewMessage('');

      // Simulate a tutor response after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'tutor', text: `Hi! How can I help you today?` },
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.tutorHeader}>Chat with {selectedTutor.name}</h2>

      <div style={styles.chatBox}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={
              message.sender === 'student'
                ? styles.studentMessage
                : styles.tutorMessage
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={styles.inputField}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  chatContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f7f9fc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Poppins', sans-serif`,
  },
  tutorHeader: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2em',
  },
  chatBox: {
    height: '300px',
    overflowY: 'scroll',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  studentMessage: {
    textAlign: 'right',
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e1f5fe',
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  tutorMessage: {
    textAlign: 'left',
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f1f1f1',
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginRight: '10px',
    fontSize: '1em',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default ChatWithTutor;
