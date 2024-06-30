import React from 'react';
import send_message from '../lottie-files/send_message.json';
import not_send_message from '../lottie-files/not_send.json';
import Lottie from "lottie-react";

const MessageSendingStatement = ({ message }) => {
    // Veride 'ok' veya 'not' metnini ara
    console.log("Gelen mesaj : " + message) 
    const text = message || ''; // varsayılan değer ataması

  // Veride 'ok' veya 'not' metnini ara
    const isSending = text.toLowerCase().includes('ok');
    console.log("issending : " + isSending)
    return (
      <div>
        {isSending ? (
          <Lottie
          animationData={send_message} // Lottie animasyonunun JSON verisi
          loop={false} // Döngü modu
          autoplay={true} // Otomatik oynatma
          style={{ width: 100, height: 75 }} // Stil ayarları
        />
        ) : (
            <Lottie
            animationData={not_send_message} // Lottie animasyonunun JSON verisi
            loop={false} // Döngü modu
            autoplay={true} // Otomatik oynatma
            style={{  width: 100, height: 75 }} // Stil ayarları
          />
        )}
      </div>
    );
  };
  
  export default MessageSendingStatement;