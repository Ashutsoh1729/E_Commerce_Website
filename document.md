This project is being Built on reference from a Youtube video.
You can check it out [here](https://youtu.be/5miHyP6lExg)

This document is created by me to keep myself accountable and take notes of doubts, and questions that i face during building this projects.

## Here We keep record of our questions, doubts, notes and almost everything.

###### Route Grouping in Next Js. 
    -> To organize your files in a folder without creating new roues. -> You can do this by creating a new folder with ` (folder_name) ` format and it will not create any new routes

###### Why we create Modal Providers?
    -> Here due to some Hydrating Error issue we created it separately.
    you can checkout about Hydration error -> [here](https://nextjs.org/docs/messages/react-hydration-error)

###### Zustand hooks don't work well in useEffect?
    -> If you use it regularly you may face some problems. The instructure destructure it first and then use them in the useEffect hook.

###### Hydration Errors      
    -> I faced a hydration error in which i rendered the same componenet at the same place for twice. one in client side and one in Server side. Means one in layout.tsx page and another in page.tsx page.Thats why i face the issue.

###### Hot-Reload is not working properly in Next Js.

    -> I have faced this issue when i mistakenly don't mentioned the client side component as 'use client' but here i am facing the same problem without this issue.Let's findout whats happening

    The issue is with the naming of the file structure. Use all in small case and it will work fine. Hot reload is working fine. [Reference](https://stackoverflow.com/questions/61033562/hot-module-reload-is-not-working-on-my-nextjs-app)


###### Difference between .env and .env.local file?
    ChatGPT:Q: Do having both .env and .env.local file in your project create problem in NextJs

    In Next.js, having both .env and .env.local files in your project should not create any problems by default. Next.js uses the dotenv package to load environment variables from .env.local files during development.

###### Why decalre keyword is used?
    [ChatGPT](https://chat.openai.com/share/bb0533ea-356a-4021-97c4-8072927f301b)
    The declare keyword in JavaScript and TypeScript is used to declare variables, functions, or types that are defined outside the current code scope. It tells the compiler or interpreter that a particular entity exists and provides its type information without actually defining its implementation.

    Here are a few common use cases for the declare keyword:

###### I faced an error while building the main-nav, client component.

    The problem is when i decalre it async the hot reload stops.I don't know the error but though it don't require it to be async by removing it, it start working.
    -> One possible cause may be because of the parent component is not declared as async and the child component is declared as a async component

###### Difference between type and interface in Typescript?

    ChatGPT: 
    In TypeScript, both types and interfaces are used to define the shape of objects, specifying the types of their properties and methods. However, there are a few differences between them: [Read More](https://chat.openai.com/share/123ec9fb-f225-4b53-839e-c5612c155556)


###### Prisma is not supported on browser.

    I faced this error becaused i have marked the navbar component as a client component and then imported the store using prisma. I remove the error after removing the 'use client' part


###### How dynamic routes work in NextJs and you can access them with params
    ChatGPT: [More](https://chat.openai.com/share/e13d414e-5424-4263-9bc2-15c79657a80f)

    In Next.js, when defining API routes, you can specify dynamic segments in the route path by using square brackets []. These dynamic segments can be accessed through the params object in the handler function.

    


    





