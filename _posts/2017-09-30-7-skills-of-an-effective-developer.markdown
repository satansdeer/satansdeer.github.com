---
layout: post
title:  "7 Skills Of An Effective Developer"
date:   2017-09-22 22:58:45 +0300
categories: jekyll update
image: top_10_skills_thumb.jpg
---

When you see the term __effective developer__, you probably imagine a person who does a lot of stuff. If yes, then well, you are wrong.

To be __effective__ doesn't mean to do more things, it means to do __the right things__.

In todays world most of the great software is created by teams, not individuals. And to be an effective developer you need to master skills that will make you a good team player.

Let's start with the most obvious one.

_All stories, names, characters, and incidents portrayed in this article are fictitious. Any resemblance to actual persons, living or dead, or actual events is coincidental._

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

Here are two developers, Kathy and Jen. They work on a dating app _Datingtron_. It matches people using their names and starsigns.

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

This is a crucial skill to write high quality code. If you think that by jumping head first in a task saves you time, then you are wrong.

__Example:__

Maria is a freelance developer. And she just got her first project.

She had a call with her customer and they discussed the project in every detail. The tasks seems clear. Maria gives some estimation to a customer and starts coding.

Oh no, Maria, you forgot to plan your work!

At first everything seems to be fine. Maria implements specification feature by feature. It looks like she's going to finish way before the deadline.

But wait, a few days later something wrong starts to happen. Maria remembers that she forgot to add some function to one of the first modules. She gets back to that module and adds the function. But now she thinks that actually it's better to rewrite the module. It's fine, there is still plenty of time.

Then something similar happens to another place. Maria begins to lose her focus. She now jumps back and forth between modules. She updates some code, then she has to update specs. Do they cover everything that's needed? Oh that's already too many things to grasp.

In the meantime she tests the application manually. Some functionality is broken, but wait all the specs were green. Ok, time to get back to code and fix the issue. But the error was so cryptic. How to find where did it happen?

Maria wants to use `git bisect` to find the exact commit where that error was introduced. But she was doing commits randomly and almost all of them have the application in broken state.

The deadline is tomorrow, so Maria decides to work all night.

Finally she manages to complete the task. All the functionality works, specs are passing and the customer is happy.
But did it really have to be so stressful?

__Conclusion:__

It was a single person working without a plan, imagine what would happen to a team.

If you start working on a task and don't create a plan first, you will be more likely to miss requirements, introduce bugs and will lose focus easier.

__Actionable items:__

* Plan your work. If you have a task in progress and don't have a plan – stop and make it now. Yes it's that important.

* Plan your commits as well. If you don't use any VCS or don't even know what commit is – well that's first thing to fix.

## Presentation

If you lack the presentation skills (even though you are a good programmer) you can end up wasting you time and time of your colleagues. Wasting time is not effective.

__Example:__

Michael is a super intelligent guy. He has almost super-human abilities in understanding how stuff works. He can create very complex things as well.

One day he creates an efficient but very sophisticated script to bundle assets for an application his team is working on.

Now it's time to present how the thing works and how to use it.

Everyone is doing their best to stay focused, but man, is Michael's voice not helping. He mumbles everything monotonously. The presentation doesn't have clear structure and a big part of the audience is starting to lose context. What's with the other part? They are sleeping already.

Soon the presentation was finished but no one in the team understood how that script works.

Now the time is lost, everyone is tired and no one got anything usefull.

People will now have to figure out how the script works on their own or ask Michael for help.

__Conclusion:__

When working in a team you'll not only have to write code and develop functionality. You'll also have to share the knowledge. Make sure to have good __presentation__ skills to do it effectively.

__Actionable points:__

* Announce the structure of presentation in the beginning. This will provide some mental wireframe for your listeners to understand the subject easier.
* Have a good structure. It will make it easier to follow your presentation.
* Learn how to use your voice. How to use rhythm and changes in tone to keep the audience engaged.

## Documentation

A typical project structure usually gets complex very fast. Not only the code itself, but the infrastructure around the project also tends to become more complicated over time.

Without proper documentation you are guranteed to get lost in that digital jungle.

__The story of Leo's onboarding:__

_CoderSoft_ is a market leader in AI and Text Editors development. They created an offensively smart IDE that needs a programmer only to type in settings and then it starts to work on it's own.

This was a very successful year for _CoderSoft_ and they hired a bunch of new developers.

Leo is an AI specialist. He's very proud to join _CoderSoft_ and he's eager to start working and providing value to the company.

His first day he opens the documentation and starts wandering around, trying to understand how to build the project locally.

The documentation is very messy, by the most part it describes project structure. Some parts contain instructions for troubleshooting if the project crashed. And no description on how to build the project whatsoever.

Leo starts to investigate. Ok, there seem to be some dependencies, let's install them first. Oh, those turned out to be written in _CoderSoft_. Let's ask some other developer how to install them.

Leo tries to find someone who would tell him where to get that dependencies, but everyone is either to busy or knows nothing about those libraries.

The next day situation repeats. And the day after that nothing changed.

Up until today Leo is still searching for the links to missing dependencies and didn't write a line of code for the company.

__Conclusion:__

Write the documentation. Keep in mind that you are writing it for a person who knows nothing about the project. Make sure to make it well structured and easy to navigate.

__Actionable items:__

* You should have a good onboarding guide. This will save you and newcomers a lot of time.
* Have a centralized source of information about the project, it should be easy to navigate. Think about the Wiki structure as a reference.
* Keep the documentation relevant. Nothing is worse than outdated and misleading documentation.

## Testing

You can't expect to have a sustainable codebase without having a good test coverage. This is just impossible.

__Example:__

_MindBallet_ is a company specializing on educational software. They are developing a platform for interactive courses.
Eventually the platform becomes very complicated. It is now very hard to add new functionality. Every time you make a change in one place you end up with a bug in another.

So Milton the lead developer decides to refactor the codebase.

The team starts to work, but the more they refactor – the more new bugs they intoduce.

After a few months of exhausting "refactoring", guys end up with completely rewritten platform. Same level of complexity, same amount of bugs. Even though the code is new it already feels like legacy.

__Conclusion:__

The team forgot about tests. Refactoring is impossible by definition without them. When you refactor you only change the code organization, not the functionality. So actually it wasn't refactoring at all, the team just rewrote the whole thing.

__Actionable items:__
* Start writing tests. This is a requirement when you develop new functionality. Writing tests before functionality is even a better idea.
* Cover the module with tests before refactoring it. This is the only way you can guarantee that you won't change the functionality.
* Red, green, refactor. Make sure you've seen tests failing. A test that never was red is very likely not testing anything.

## Git

It is the most popular VCS in modern web development community. It's not just the tool to save your development progress. It's an instrumment of team collaboration. Make sure to master it.

Some software or programming languages let you to shoot yourself in a foot. Well, git lets you to blow of legs of the whole team. It will allow to get all the legs back, but you still better know what you are doing.

__Example:__

Jim and Mike worked together on the same webpage. Everything was fine until one day Jim decided to rebase their branch with `master` while Mike was still adding new functionailty.

Jim successfully resolved conflicts with the base branch and did `git push -f` just after Mike pushed all the commits he did today.

Mike informed the team that he finished adding new functionality. Jim saw his message, merged their branch to `master` and deleted it.

Mike did `git pull --prune` and now his changes are lost locally as well.

Soon Mike realized that his whole day of work was removed and now he hates Jim.

__Conclusion:__

You have to follow some strategy to successfully use git inside the team.

__Actionable items:__

* Use `git push --force-with-lease` instead of `--force`. This will save you from overriding other peoples work.
* Use pull requests, and review the whole thing before merging it to master. It's better if multiple team members will review the pull request.

## Summary

Communicate with your teammates, don't hurt other peoples feelings, plan your work and document your code and infrastructure properly.

Learn how to write automated tests and make sure to master git.

Those skills are crucial for effective collaboration. People often overlook them focusing on programming itself.
