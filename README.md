<div id="top"></div>

<div align="center">
  <img src="https://img.icons8.com/color/96/000000/bench-press-with-dumbbells.png" alt="Logo" width="96" height="96">
  <h3 align="center">MeFit Application</h3>
  <p align="center">
    Noroff Case: Group 1
    <br />
    <a href="https://java-se-mefit-frontend-develop.herokuapp.com/">View Live Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
# 📙 Table of Contents
[📚 About the Project](-about-the-project)  
[⌛&nbsp; Install](-install)  
[💻 Usage](-usage)  
[⚙ Maintainers](-maintainers)  
[🤝 Contributing](-contributing)  
[㊗ Conventions](-conventions)  
[📝 License](-license)  
[📬 Contact](-contact)  

<!-- ABOUT THE PROJECT -->
# 📚 About the project
<img align="left" width="46" src="https://img.icons8.com/color/480/000000/rules-book.png">
<h3>&nbsp; <a href="https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Requirement-Specification">Requirement Specification</a></h3>

For a detailed list of all our requirements & analysis please refer to the [Requirement Specification](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Requirement-Specification) documentation.

<img align="left" width="46" src="https://img.icons8.com/color/480/000000/rules-book.png">
<h3>&nbsp; <a href="https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/API-Documentation">API Documentation</a></h3>

For a detailed guide on how to access our endpoints throughout the application.

<img align="left" width="46" src="https://img.icons8.com/color/480/000000/rules-book.png">
<h3>&nbsp; <a href="https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Design-Document">Design Document</a></h3>

For a detailed documentation of our design challenges and decisions made from start to finish.

<img align="left" width="46" src="https://img.icons8.com/color/480/000000/tree-structure.png">
<h3>&nbsp; Dependencies</h3>

```
React           17.0.2
  Calendar      3.7.0
  Dom           17.0.2
  Hook-Form     7.28.0
  Router-Dom    6.2.2
  Scripts       5.0.0
  
Web-Vitals      2.1.4
    
KeyCloak-JS     17.0.0
```

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>

<!-- INSTALL -->
# ⌛&nbsp; Install
To get started with the front-end application you will need to set up a few services.
1. Download [NodeJS](https://nodejs.org/en/download/)
   * Choose the latest stable version suitable to your OS.
2. Thats it! 😄

To make sure that your installation has gone smoothly run:
```bash
node -v
npm -v
```
in your terminal (OSX) or command prompt (Windows).
You should see something like this:
```bash
$node -v
v16.13.2

$npm -v
8.1.2
```

Once you have verified that NodeJS has been properly installed you can clone the repository to a destination of your choosing.
```bash
# Https
git clone https://github.com/Pizzarulle/Case-Se-Java-MeFit-Frontend.git

# SSH
git clone git@github.com:Pizzarulle/Case-Se-Java-MeFit-Frontend.git
```

When the cloning has completed you can navigate to the root folder inside your terminal (where you can see `package.json` & `package-lock.json` files). 
We placed ours inside `C:\Users\User\Documents\Github`.

Like so
```bash
cd Documents/Github/Case-Se-Java-MeFit-Frontend
```

Then to install all dependencies run:
```bash
npm install
```
This might take a while ☕  
...  
Once the installation is complete you can simply run your final command:
```bash
npm run start
```
to start the application front-end! The React start command will automatically open the website at [localhost:3000](http://localhost:3000/) when it is done compiling.


Congratulations 🎉 you're all set! 🎈

<!-- USAGE -->
# 💻 Usage
Once you have completed the whole back to front-end set up you're free to use the application to your hearts content. But let us show you one way of using it! 😉

Have a look at our [User Manual](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/User-Manual) for a detailed use guide on how to do just about anything you want. With the `as-is` application.  

However, if you'd like to look at the inner workings of the application, may we redirect you to our many [Wiki](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki) pages!  
We have one for
* [API Documentation](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/API-Documentation) if you're curious about our endpoints and how to use them.
* [Build & Deploy new PostgreSQL database](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Build-&-Deploy-new-PostgreSQL-database) if you want to build your own app.
* [Requirement Specification](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Requirement-Specification) if you want to see what is done and what is left. Maybe challenge yourself and build the missing requirements? 😉
* [Design Document](https://github.com/Cusatelli/Case-Se-Java-MeFit/wiki/Design-Document) if you're curious about the challenges we faced and why we made certain design choices.

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>

<!-- MAINTAINERS -->
# ⚙ Maintainers
<a href="https://github.com/Cusatelli"><img src="https://avatars.githubusercontent.com/u/39692033?v=4" alt="Logo" width="50"></a>
<a href="https://github.com/meckan"><img src="https://avatars.githubusercontent.com/u/15233202?v=4" alt="Logo" width="50"></a>
<a href="https://github.com/OmarAbdiAli"><img src="https://avatars.githubusercontent.com/u/97539265?v=4" alt="Logo" width="50"></a>
<a href="https://github.com/Pizzarulle"><img src="https://avatars.githubusercontent.com/u/48913785?v=4" alt="Logo" width="50"></a>

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">⬆️</a>
</p>

<!-- CONTRIBUTING -->
# 🤝 Contributing
No active contributors.

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>

<!-- CONVENTIONS -->
# ㊗ Conventions
Format: `<type>(<scope>): <subject>`

`<scope>` is optional

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

Read more: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) v1.0.0

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>

<!-- LICENSE -->
# 📝 License
No active license.

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>

<!-- CONTACT -->
# 📬 Contact
<a href="mailto:github.cusatelli@gmail.com"><img src="https://avatars.githubusercontent.com/u/39692033?v=4" alt="Logo" width="50"></a>

<p align="right"><!-- BACK TO TOP -->
  <a href="#top" align="right">🔝</a>
</p>
