---
layout: post
title:  "7 Skills Of An Effective Web Developer"
date:   2017-09-22 22:58:45 +0300
categories: jekyll update
image: top_10_skills_thumb.jpg
---

When you see the term __effective developer__, you probably imagine a person who does a lot of stuff. If yes, then well, you are wrong.

To be __effective__ doesn't mean to do more things, it means to do __the right things__.

In todays world most of the great software is created by teams, not individuals. And to be an effective developer you need to master skills that will make you a good team player.

Let's start with the most obvious one.

## Communication

![communication](/assets/images/communication_1.png)

This one is an absolute golden nugget. You can't imagine, how many problems you avoid if you are a good communicator. And it doesn't only mean that you should know how to express your thoughts clearly or how to be a good listener.

The most important goal of communication is to ensure that everyone is on the same page and has as complete view on a given problem as possible.

__Example #1:__

Meet Bob and Margaret. Bob is a developer and Margaret is a project manager. They work on a todo list tool _Taskey Doey 3000_

Margaret creates a task “Add a functionality to __copy__ a todo item to a different list”. She expects this new functionality to allow to __share__ items between lists. So if you update shared task in one list – it will be updated in all the lists it’s shared to.

Bob starts to work on that task. For him it's obvious that Margaret wants to __copy__ tasks between lists. So he adds the functionality that creates new instances of tasks, that are not linked to each other. So if you update one, it's copies remain untouched.

After a few days of dedicated work Bob presents the new functionality. Margaret sees that it's not what she expected, and tells it to Bob. Margaget thinks Bob is an idiot. Bob also questions Margaret's cognitive abilities. 
Later Bob fixes the problem, but the deadline is broken and everyone is unhappy.

This could be prevented if Bob and Margaret would discuss the task before Bob would start to work on it.

__Example #2:__

Meet designer Paul, and developer Marco. They work on a website for _CheapBargainMart.com_ online store.

Paul created a design for exit intent popup. It would capture visitors that didn’t buy anything from the store. He didn’t know that they already had a very similar popup implemented earlier and he could reuse parts of it.

Marco knew about that other popup, but __assumed__ that Paul created the new design from scratch for a reason.

As a result both guys spent more time on their tasks, and not they have a duplicated set of almost identical elements for no good reason.

__Example #3:__

Here are two developers, Kathy and Jen. They work on a dating app "Datingtron". It matches people using their names and starsigns.

Kathy is new to the project, but she is really devoted. She get's a task to implement an alternative matching algorithm. What she didn't know, was that they already had a special DSL for matching algorithms.

Jen was aware of that DSL, she actually wrote it. But Jen was very busy working on a different task.

After a few days of dedicated work Kathy presents the functionality. Everything works as it should, but Kathy spent a lot more time on that task. Also they now have a part of codebase that is not intact with other code.

Now they have to spend extra time to rewrite it and make uniform.

__Conclusion:__

All those examples would end up much better if any of the parties would start a discussion and clarify everything beforehand.

__Actionable items:__

* Before you start working on a task, contact the person who created it. Make sure that you both understand it identically. Don't make assumptions. Better spend a few minutes on a discussion than hours on fixing an implementation later.

* Gather as much information about task as possible. If you work with a designer – make sure you understand the motivation behind every element. Don't work mindlessly.

* Don't hesitate to ask your colleagues if they worked on similar tasks. One simple question can save you hours of unnecessary work.

## Empathy

__Let's start with an example:__

![empathy](/assets/images/empathy_1.png)

Meet Alex. He's a new developer in a company named "CranberryPi". On his first weekly meeting he makes a few proposals on how to improve the codebase. But those proposals contain mistakes in them and another developer, Peter, corrects him. Usually it is the right thing to do, but Peter does it in unnecesarily berating way.

Now Alex feels bad about himself and becomes hesitant about bringing up his opinions. Even John, who was only listening is now less likely to tell his opinions.

A few weeks later Alex is working on a login form of company's website. He makes some mistakes and adds security flaws to the system. But as he now feels insecure, he avoids discussion with teammates and those mistakes remain unnoticed.

Atfer a few days the security flaw is on production. Soon all the user accounts get stolen, customers now don't have trust for the company. And "CranberryPi" goes bancrupt.

__Conclusion:__

Don’t be like Peter. In a given story it is clear that he didn’t have enough __empathy__ to think about what Alex would feel because of him.

What Alex did is also unacceptable, but having guys like Peter in a team actually increases chances of team members behaving like Alex.

For a team to be effective it’s crucial that all the teammates have trust and feel psychological safety.

Why? Because otherwise, people start to hesitate asking questions, or giving their opinions. And this in turn will bring all kinds of __communication__ problems.

Actually it can get even worse. When not feeling psychological security people may start hiding their mistakes. And that can bring a ton of trouble.

And even one person with this kind of toxic behavior is enough for a team to loose the feeling of psychological security.

__Actionable items:__

* Correcting anyone is fine as long as it's done in nice and nonoffensive way. Give yourself a few moments to calm down before making spiteful commentary to someones words.

* Put yourself in shoes of your opponent. How would you feel in his place? Think about the consequences of what you are about to say.

* If you have people like Peter in your team make it clear for them that this behavior is unacceptable. Even if Peter is a good developer he may be doing more harm than good by destroying the atmosphere in the team.

## Planning

![planning](/assets/images/planning_1.png)

This is a crucial skill to write high quality code. If you think that by jumping head first in a task the minute you get it saves you any time, then you are wrong.

__Example:__

Maria is a freelance developer. Recently she got her first project. She wants to impress her employer. They had a video conference and discussed the projects in all the details. What could possibly go wrong?

__Conclusion:__

This was an example of a single person woring without a plan, imaging what would happen to a team.

If you start working on a task and don't create a plan first, you will be more likely to miss requirements, introduce bugs and will lose focus easier. 

__Actionable items:__

* You need to plan your commit, so your commits will be meaningful and logical chuncs of code.

* You need to plan before you start the manual testing of your functionality.

## Presentation

When working in a team you'll have to not only write code and develop functionality. You'll also have to share knowledge.

It can be anything: 

* It can be a statistical research of current codebase.
* It can be a description of some coding convention you want your team to adopt.
* It can be a pitch to use some library or a framework.
* It can be a showcase of some new functionality you've implemented for a project.

It’s very important to make a proper __presentation__ of those things, so they would pe easy to perceive and digest. And it will make them get the appreciation they deserve.

## Writing

Reading code is a lot harder than writing it.

Probably you already have pretty complex setup involving a variety of different technology.

You need a good documentation for your code and for the whole technological stack used in your project.

This will make onboarding of new developers a much more pleasant experience.

But developers are already good with logic and structuring information, so writing good documentation should be easy.

Wrong. It's a separate skill that requires you to put yourself in place of a person that knows nothing about your code or setup.

## Testing

You have to master writing automated tests and be good in manual testing.

You can't aks your teammates to review your PR without making sure that everything works as it should first.

This might seem obvious, but you won't beleive how many times I've seen a completely opposite behavior.

Having a decent skill of writing automated tests is also oh so important.

Current way of how software development is being taught leads to a situation where young software developers know nothing about tests until they land their first job.

Actually it's even worse, they can work on several projects and not know that automated tests are absolutely required to write software.

## Git

There are some other VCS's, but Git became a de facto standard in modern web development community.

You can't be an effective deveolpers without being able to find an exact commit where some bug was introduced, or knowing how to organise work to avoid hard-to-resolve conflicts.
