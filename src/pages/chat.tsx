import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import appConfig from '../../config.json';

const Header = () => {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='heading5'>Chat</Text>
        <Button
          variant='tertiary'
          // @ts-ignore
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  );
};

interface Message {
  id: number;
  user: string;
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box
      tag='ul'
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {messages.map((message) => (
        <Text
          key={message.id}
          tag='li'
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Image
              styleSheet={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
              }}
              src={`https://github.com/${message.user}.png`}
              alt='image'
            />
            <Text tag='strong'>{message.user}</Text>
            <Text
              styleSheet={{
                fontSize: '10px',
                marginLeft: '8px',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag='span'
            >
              {new Date().toLocaleDateString()}
            </Text>
          </Box>
          {message.text}
        </Text>
      ))}
    </Box>
  );
};

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState('');
  const [listMessages, setListMessages] = useState<Message[]>([]);

  function handleChangeMessage(event: ChangeEvent<HTMLInputElement>) {
    setTextMessage(event.target.value);
  }

  function handleSendMessage(textNewMessage: string) {
    const message: Message = {
      id: listMessages.length + 1,
      user: 'rafarod21',
      text: textNewMessage,
    };
    setListMessages([message, ...listMessages]);
    setTextMessage('');
  }

  function handleKeyboardPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage(textMessage);
    }
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        // @ts-ignore
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          // @ts-ignore
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList messages={listMessages} />

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={textMessage}
              onChange={handleChangeMessage}
              onKeyPress={handleKeyboardPress}
              name='name'
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
