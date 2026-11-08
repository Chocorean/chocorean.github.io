---
title:  Few contributions to the Minecraft modding ecosystem
intro: The story of AuthMod, a way to authenticate players on a `offline-mode=true` Minecraft server. And a couple other mods.
subtitle: After Mcdostone stepped in, I realized I lost grab on my project.
date: 2026-11-8
---

A while back, when I was still in engineering school, there was a project to host a Minecraft server on the students association's hardware.
The goal was simple: a private server, accepting only school students, regardless of owning a paid game account.
At first, we built a [Minecraft launcher](https://github.com/Chocorean/ClientMinecraftTNCY) which we hoped would be useful auto-magically install the game, some mods, and authenticate students with their association's account.

The poor thing was made with [JavaFX](https://openjfx.io/), a GUI library made for (you guessed it) Java applications.
We were using it at school for some projects and Minecraft is developped in Java, so it seemed natural.

Then we started to inspect how the official game handle authentication, how we could fake it, and dug a bit around on modding forums.
It turned out it was a lot harder to fake than we expected, and we were advised to find a workaround.
I am sorry I do not remember excatly how we failed, but the project was abandonned pretty quick ; at this point we only had the launcher UI and the association login.

This is how I started to write [AuthMod](https://www.curseforge.com/minecraft/mc-mods/authmod):

{{ figure "authmod_curse.png" "Authmod Curseforge page" "Can you guess what the comments are about?" }}
