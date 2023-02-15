---
layout: article
title: The forgotten project
subtitle: End-to-end encrypted asynchronous chat server
date: 2022-07-28 22:33:08 -0400
tags: [rust, tcp, server, packet, custom]
published: false
---

For literally years, I have always wanted to code a small TCP server, just so I
could learn something. I am also learning Rust so I hope at the same time I can
learn, share something with the community and finally achieve this goal I set
maybe ten years ago already...

Today we will go through the process of making a little chat server. This is the
list of features we will cover:

- Messages will be *end-to-end* encrypted
- Messages access will be delivered asynchronously
- Messages are sent to a single person only

We will not cover data persistence here, group chats nor multimedia content.

### Menu

1. [Communication protocol](#communication-protocol)
   1. [First connection](#first-connection)
   2. [Sending and receiving messages](#sending-and-receiving-messages)
   3. [Being online](#being-online)
2. [Implementation details](#implementation-details)
   1. [Packets](#packets)
   2. [Transmissions](#transmissions)
   2. [RSA jeys](#rsa-keys)
3. [Conclusion](#conclusion)
10. [Resources](#resources)

### Communication protocol

TODO: Add graphs.

#### First connection

Because we want all the messages to be end-to-end encrypted, we first want to
generate a pair of asymetrical keys, and register the public key on the server. 
For its first connection, Client_A will generate a pair of RSA keys, and 
send the public key to the server, which will permanently store it. At this 
point, Client_A becomes a valid recipient, and can receive messages from other 
clients.

If Client_A already had registered its key, the previous step is skipped. Then, 
Client_A will notify the server that he is listening to incoming messages. The 
server will now be able to deliver instantly any messages addressed to Client_A.

However, if Client_B sends a message to Client_A will it is not listening, the 
message will be queued on the server side, and will later be transmitted to 
Client_A as soon as they get online.

#### Sending and receiving messages

If Client_A wants to send a message to Client_B, Client_A will pull Client_B's 
public key if it exists, then encrypt its message with this key, and send it to 
the server. Note that it is not 100% encrypted, since the recipient is still 
plain. We could repeat the same process using a server key pair, but I'll skip 
this step since it does not bring anything to this example.

Then, the server understands who the recipient is, and if the recipient is 
currently listening, the server tries to deliver the message. If it cannot 
deliver the message, the message is instead queued. If the recipient is offline,
 the message is queued as well.

#### Being online

After registering, for the server to consider Client_A online, Client_A has to send *pings* every 
once in while to notify the server it is still listening. Client_A can also tell
 the server that it is going online, but in case of an unexpected situation (i. 
e. lost internet access), the server will consider the client offline after a 
few missed *pings*.

To prevent identity theft, server will send a challenge to clients to determine 
if their identity is legit or not.

### Implementation details

We will describe here the design and behavior of the **packets** (messages 
exchanged between clients and server), how the server and clients handle 
transmissions, and also how the clients generate their keys.

#### Packets

...

#### Transmissions

At first, I did not manage to properly exchange data in both ways. I ended up 
using this hacky way:

```rust
impl Packet {
    /// Read a packet from a tcp steam
    pub fn from_stream(stream: &mut TcpStream) -> Result<Self, Error> {
        let mut buffer = String::new();
        let len = stream.read_to_string(&mut buffer)?;
        log(format!("Received {} bytes", len));
        let packet = serde_json::from_str(&buffer)?;
        // Send response
        let resp = Packet::Acknowledge;
        buffer = serde_json::to_string(&resp)?;
        let bytes = buffer.as_bytes();
        let _ = stream.write(bytes)?;
        stream.shutdown(Shutdown::Write)?;
        log("Sent acknowledge".to_string());
        Ok(packet)
    }

    [...]
}
```

This has an evident flaw: it prevents further communication, because both Read 
and Write connections are being closed by the `shutdown` methods. At this point
, I was not creative, and I was not willing to lose more time on this, because 
this project had been left behind for too long. I ended up sending the size of 
the incoming packet, and then the packet, so we always exactly know what to 
expect:

```rust
    pub fn to_stream(&self, stream: &mut TcpStream) {
        let str = serde_json::to_string(&self).unwrap();
        let bytes = str.as_bytes();
        let len = bytes.len();
        if len > u32::MAX as usize {
            panic!("packet is too big.");
        }
        let len = len as u32;
        // Sending size over
        let len_bytes = len.to_be_bytes();
        stream.write(&len_bytes).unwrap();
        // Then sending packet
        stream.write(bytes).unwrap();
    }
```

I know there is still room for improvement, like repalcing these nasty `unwrap` 
calls with proper error handling, but *meh!, we are just messing around. This 
approch also has another major flaw: if a packet size exceeds `u32::MAX`, the 
program will panic! For this project, again, no big deal.

#### RSA keys

...

### Conclusion

Thx I've learned a lot.

### Resources

- xx

[rustbook]: https://doc.rust-lang.org/stable/book/ch20-00-final-project-a-web-server.html
[blankserver]: https://github.com/Chocorean/blank_tcpserver
