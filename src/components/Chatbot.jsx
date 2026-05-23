import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! Welcome to Root Square Dental Clinic. How can I help you today?", isBot: true },
        { text: "You can ask me about our timings, location, or book an appointment.", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            let botReply = "Thank you for reaching out! Please call us at +91 8928187627 to assist you further.";
            const lowerInput = userMsg.toLowerCase();
            
            if (lowerInput.includes("time") || lowerInput.includes("hours") || lowerInput.includes("open")) {
                botReply = "We are open Monday to Saturday from 10:00 AM to 9:00 PM. Sundays are by appointment only.";
            } else if (lowerInput.includes("address") || lowerInput.includes("location") || lowerInput.includes("where")) {
                botReply = "We are located in Kalina, Santacruz East, Mumbai. You can find our exact location on the map in the Contact section.";
            } else if (lowerInput.includes("book") || lowerInput.includes("appointment")) {
                botReply = "To book an appointment, please call us at +91 8928187627 or fill out the contact form.";
            } else if (lowerInput.includes("cost") || lowerInput.includes("price") || lowerInput.includes("fee")) {
                botReply = "Treatment costs vary depending on the procedure. Please visit us for a consultation so Dr. Priyanka can provide an accurate estimate.";
            }

            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <div className="chatbot-wrapper">
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                <MessageCircle size={28} />
            </button>
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div>
                        <h4>Clinic Assistant</h4>
                        <span>Online</span>
                    </div>
                    <button className="close-chat" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="chatbot-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chatbot-input">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..." 
                    />
                    <button onClick={handleSend}><Send size={18} /></button>
                </div>
            </div>
        </div>
    );
}
