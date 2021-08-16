# What every developer should know about design (and designers too)

::: comment
Design is about making an application beautiful and practical for humans. Developers are not humans.
:::

This is not a book about design. This chapter will not teach you how to be an incredible designer in 5 minutes. But as a developer, project manager or even stakeholder you should know a little bit about design.

Design has a big problem: everyone thinks they can give design suggestions. It's almost impossible to look at a design and not start thinking "this should be blue" and other minor changes. It happened in pretty much every meeting and presentation I ever had.

## Users, that pesky little problem

You'll hate users. After you spend a long time doing the application, the first user you show it to won't find the giant button you made with an obvious label. They will use your application all wrong. They won't be able to do simple tasks. They will ask for things that have nothing do with your application. And guess what?

::: comment
The user is never wrong.
:::

Users may not be right (watching a user trying to do something that should be simple in the weirdest possible way using your software is soul crushing), but they are your customers. Users won't have you around to show how your application has to be used. You can add a tutorial mode, tooltips, videos, but in the end what you really need is to make your app natural to use. Intuitive.

That means you should include users early on as part of your application development. Make mockups and see how they interact with the mockups before implementing them. Look at similar apps (your app is unique and nobody ever made it before? I am sure there are lots of apps that have a similar interface). See how people interact with those apps, and ask them what they hate about the experience. If you are targeting existing competition to take over, make sure you understand what is important and good in the current solutions they have. You might think you have a wonderful solution to their problems, but in practice they are used to a certain flow, or have to follow guidelines and legislation, or just like things that could be better -- but it's very hard to convince them that.

Once you have a working version, get it to your public. Make sure it looks like a final version. People will complain terribly if the button doesn't have round borders: which is something that definitely doesn't matter at this point, but they'll focus on these minor issues, and you won't get actual relevant information.

## Design systems, or "let's use a round wheel"

:::
If you are reinventing the wheel, don't use a square one. Use a triangular one, it bumps only three times per revolution.
:::

Just like when writing code we don't want to implement everything from scratch, and we use proper standards for code formatting, frameworks to avoid reimplementing basic algorithms, libraries to avoid recreating code, and by using this mature code we avoid bugs we'd have made, designs can take advantage of standards, guidelines and a basic set of components. From the early CSS frameworks that did a basic structure for you we evolved to design systems.

:::tip
A design system is a collection of reusable components, structured by clear standards, which can be used together to build any number of applications with a consistent interface.
:::



## What a good design should consider

### Consistency

Interfaces have to be consistent. Look at a book, imagine if every title, subtitle, paragraph, page margins, had a different choice of style. It makes no sense: but that's how many people approach design for web applications.

### Simplicity

## UX: User eXperience above all

Tasks must be easy to do in your application.

You'll find several heuristics to make a good user experience. They are useful, but remember that they are just that: heuristics. There may be good reasons to ignore them. Use your common sense, and remember that the user rules.

- the Three-click rule says people should be able to reach what they want in at most 3 clicks/taps. This means that everything is easy to find too: in one click things are visible on the screen. In two clicks you have an indirect indication of what it is (like click on Profile, and you'll find a way to change your password.) A third click is the limit.

## Real life testing and quality assurance


## Cardinal sins designers do

1. Not paying attention to users. They just sit in front of the screen and draw. Your designer should know the user, know the problem, and work on a solution to the actual existing problems, not drop widgets and components randomly.
2. Not using their designs. I've seen projects whose designers **never** used the application. They just sent wireframes and "pixel-perfect designs" drawn with some application. If asked to actually perform a basic task on the software they were confused and had a hard time. Designers need to use the application during development.
3. Not understanding tools. I've seen plenty of designers who take a CSS framework and don't know how it works. In fact, I've seen plenty of designers that can't explain headings (h1, h2), picking them randomly according to whatever they feel is a good font size instead of a proper consistent design. The result is that they keep reinventing the wheel with "custom" 