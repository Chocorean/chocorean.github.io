---
title: A few contributions to the Minecraft modding ecosystem
intro: The story of AuthMod, a way to authenticate players on an `offline-mode=true` Minecraft server, and a couple of other mods.
subtitle: After Mcdostone stepped in, I realized I had lost grip on my project.
date: 2026-11-8
---

A while back, when I was still in engineering school, there was a project to host a Minecraft server on the students association's hardware.
The goal was simple: a private server accepting only school students, regardless of whether they owned a paid game account.
At first, we built a [Minecraft launcher](https://github.com/Chocorean/ClientMinecraftTNCY), which we hoped would automatically install the game, some mods, and authenticate students with their association's account.

The poor thing was built with [JavaFX](https://openjfx.io/), a GUI library made for (you guessed it) Java applications.
We were using it at school for other projects, and Minecraft is developed in Java, so it seemed natural.
Now it does not build anymore; JavaFX errors are popping up everywhere. I do not think it is worth it anyway, and I am just sad I do not have a screenshot to share.

Then we started inspecting how the official game handled authentication, how we could fake it, and dug a bit around on modding forums.
It turned out it was a lot harder to fake than we expected, and we were advised to find a workaround.
I am sorry I do not remember exactly how we failed, but the project was abandoned pretty quickly; at that point, we only had the launcher UI and the association login.

This is how I started writing [AuthMod](https://www.curseforge.com/minecraft/mc-mods/authmod):

{{ figure "authmod_curse.png" "Authmod Curseforge page" "Can you guess what the comments are about?" }}

*online-mode=false is now safe* -- what the hell?

## The AuthMod journey: pride and humility

What problem was AuthMod intended to fix?

### My naive approach

You may remember the ["cracked" Minecraft launcher](https://3.bp.blogspot.com/-7xnlmsDpEJY/ULqfVGDfYuI/AAAAAAAAAKE/whowgn9XKYE/s1600/w7kgy.png).
This launcher allowed players to use any username they wanted.
Multiplayer was of course not possible for most servers, unless...

```bash
# server.properties
online-mode=false
```

This line of configuration would completely disable server authentication, allowing anyone to connect.
Now, how do we prevent people outside our school network from logging in?
Whitelist? Unfortunately, the cracked launcher allows anyone to choose their username, so it was a no-go.
What if a random person joins as the admin?

We needed another way to protect our community.
AuthMod was the solution: a player database linking in-game identity, password, and school ID.
My friend [Mcdostone](https://github.com/Mcdostone) would be working on the website for registering people to the server as a member of the association, while I would be tinkering with [Forge](https://files.minecraftforge.net/net/minecraftforge/forge/)'s API.

That was **brutal**.

Saying that my first dive into decompiled Minecraft code was tough would be an understatement.
I had no idea what I was doing or what I was looking for, and sometimes I was not even sure what I was looking at.
I slowly made my way through the hundreds of files and directories and managed to create a few in-game commands for logging in and registering.

The idea was to prevent any incoming player from doing *anything* on the server until they logged in.
That means no movement, no chat, no commands, no damage dealt or taken, no item drops, no block placing, **absolutely nothing**.
The [event handler](https://github.com/Chocorean/authmod/blob/main/src/main/java/io/chocorean/authmod/event/Handler.java) is full of `event.setCanceled(true);`.
It was a cat-and-mouse game, trying to find every event a player could trigger so that we could cancel it until they logged in.

I eventually managed to get the mod into a decent state:
we added `/register` and `/login`; players were completely frozen on joining, everything looked good after logging in, and it was completely *seamless* for the client.
The mod is *server-side* only, which is great for players because that means they could join with a vanilla client.
Then Mcdostone stepped in.

### Lesson in humility

One day, I ran `git pull`, hoping to see what my friend had been working on.
That day, I realized this project was no longer mine.

{{ figure commits.png "Commits graph" https://github.com/Chocorean/authmod/graphs/contributors?all=1 }}

Mcdostone just rewrote everything.
I mean **everything**.

We had interfaces, design patterns, factories, and many kinds of databases supported (my implementation was writing into a text file, because why not?), configuration, a better build system, I18n, better error handling, CI/CD, and more.
He had touched almost every single piece of the project, had done a much better job than I had, and brought even more to it.
As a strong Java developer, I could tell he had had fun — hopefully not too much at my expense.

I learned a lot thanks to him, and I respect him a lot.
However, we do not agree on who introduced the other to Rust — I am pretty sure it was him, via a [FasterThanLime](https://fasterthanli.me/) blog post.
Anyway, thanks to him, the project became much more reliable, and we soon started using it in production.

### CurseForge and the unexpected "success" of the mod

I wanted to share the mod with the community because I knew it would help some people enjoy the game.
However, this kind of mod is not appreciated by everyone, and after carefully reviewing the rules of a few forums, I decided not to advertise it.
I just uploaded it on CurseForge, and traffic came organically.
As I was porting the mod to newer versions, more people found it and started using it.
I also got contacted by a Chinese person who asked for permission to repost it on Chinese forums.

Some people found bugs, and we tried to fix as many as we could, but I believe the last version is still broken somehow.
The CurseForge comments are mainly people asking for ports to other Minecraft versions, or asking what version to use because the last one is buggy.

The mod ended up getting downloaded more than 35,000 times, which I believe is great for a server-side mod.
The few downloads I got earned me a few tens of bucks, spent on Amazon gift cards. Mcdostone got his share too, don't worry about it.
I even received something like €1.50 from a Russian guy to support the work — what a chad!

Eventually, I lost the will and the time to maintain the project, but somehow it still lives:

{{ figure traffic.png "git clone since 2 weeks ago, at the time of writing" "I am discovering this page at the same time." }}

## More fun with MoreCommands

[MoreCommands](https://www.curseforge.com/minecraft/mc-mods/more-commands-mod) is also a server-side Minecraft mod I made for the school's server.
It sits at around 20K downloads and has its fair share of comments asking for ports and new commands.

This project was a *QoL* improvement over the base game: just like the old [Essentials plugin](https://dev.bukkit.org/projects/essentials) *(created in 2011...)*, it adds a few in-game commands for players to set up homes, teleport to other players, and so on.
A few commands were also meant only for admins, for public transportation and moderation, for instance.

Fortunately, it was much easier to implement: AuthMod was already a good example, and I drew a lot of inspiration from Mcdostone's style.
I also really enjoy building things incrementally.
Adding one feature after another, watching the project grow as a whole, and seeing it become an entity rather than a few things tossed together made it incredibly enjoyable to work on.

To finish on a light note, let's look at the latest comment.
I am glad I have been blessed by the bane of all game modders:

{{ figure comment.png "Comment asking for a port" "I assume that is how modders validate each other — by the length of the complaints." }}

## A third one for the joke

[MoreSnowballs](https://www.curseforge.com/minecraft/mc-mods/more-snowballs) is my favorite bit of human-slop software I have made.
It is a stupid mod that adds a few snowballs with uninteresting effects in large quantities.

This had no success at all (guess why?), but it still hit a small crowd.
I got this gem, which made me laugh a lot when I reviewed the page today:

{{ figure mistake.png "Person complaining about another mod" "Good luck, lost buddy." }}

## Closing thoughts

Modding with Forge in 2019 was hard in my opinion.
I was already a Java hater at the time.
I did not help.

The pace of updates would often break the Forge API, forcing every modder to rewrite a lot of code for no additional feature, just to support another game's release.
The documentation was very sparse, as the team was more focused on reverse-engineering the game and renaming classes and methods into something other than garbage.
No one knew which Forge version would become popular for modding, so you had to support as many versions as possible.
I mainly learned by spending hours digging through Forge and other people's code (shout-out to [Vazkii](https://www.curseforge.com/members/vazkii/projects)), and I eventually made a few contributions myself — something I am proud of.
I have a lot of respect now for game modders and game developers, as I understand how hard it is to make software with so many hidden mechanisms, logic, and design decisions that have long-term impact, and then ship it, fix bugs, and try to please the community with updates.

Recently, with the development of AI, we have seen an avalanche of new mods and game fusions *(Tony Hawk x Valheim, when?)* as the skill bar needed to get started is at an all-time low.
There was already a lot of slop back then (remember the state of *[McCreator](https://mcreator.net/)* at the time?), so I am not too worried that AI-slop will take over the modding scene.
I just hope it helps people with good ideas and low development skills build fun stuff.
I doubt it, though.

If I had to do it again, I would.
I learned a lot, and I had the opportunity to work with my dear Mcdostone. We made something I believe was great, and it received some warmth online.
Even for someone like me, who is used to tinkering with things, it was a great challenge — one I am glad I overcame.

Thanks for reading this old story.
