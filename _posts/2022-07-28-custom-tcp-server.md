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

- Messages will be *end-to-end* encrypted;
- Messages access will br asynchronous;
- Messages are sent to a single person only.

We will not cover data persistence here, group chats, multimedia content.

### Menu

1. [Mandatory design step](#mandatory-design-step)
   1. [Server design](#server-design)
   2. [Client design](#client-design)
   3. [Communication protocol](#communication-protocol)
2. [Implementation](#implementation)
   1. [Clone the skeleton](#clone-the-skeleton)
10. [Resources](#resources)

### Mandatory design step

- clés publiques et privées

#### Server design

- on attend soit un msg, soit une nouvelle cle
- si cle deja enregistrée, on répond avec un challenge, si la re reponse
est correcte, on change, sinon nsm

#### Client design

- comment on pull les messages

#### Communication protocol

- scenario premiere connection
- scenario n+1th connection

### Define a custom protocol

xx

### Clone the skeleton

I shamelessly stole the code from the [Rust Book][rustbook], stripped a few
things and made [a repo][blankserver]. Clone the repo according to the README,
and let's take a look at it. At this point, it only starts a TCP server which
does nothing. It creates a pool of threads waiting for a job to be given to them
, and do it. 

### Resources

- xx

[rustbook]: https://doc.rust-lang.org/stable/book/ch20-00-final-project-a-web-server.html
[blankserver]: https://github.com/Chocorean/blank_tcpserver
