<h1>FRONTEND: ANGULAR</h1>


Installeer de benodigde packages om de Angular webapplicatie te kunnen builden: 

1: download NodeJS, van de website https://nodejs.org/en/download/ (download de meest recente versie). Volg de stappen van de installatietool. 

2: zodra NodeJS is geinstalleerd, download Angular CLI, van de website van Angular 

https://angular.io/cli, open de Terminal(in Admin) en run het commando ‘npm install -g @angular/cli’ 

3: Van de aangemaakte repository is een kopie gemaakt, die aangeleverd zal worden. 

 pull de master branch in de locale IDE(Webstorm, VSCode, etc). Zorg dat de Spring Boot backend runned en aanstaat, en een connectie heeft met de eerder geconfigureerde database. 

Zodra deze repository open staat, run ‘npm install’ binnen de bestandslocatie, om alle benodigde packages te downloaden die in het project zitten. 

In de map environments, navigeer naar environment.prod.ts, en verander de api url ‘localhost:8080’ naar de url van de eigen backend. <br>
![chrome_jUFJ92sxyN](https://user-images.githubusercontent.com/30380030/215520939-048db81f-02b6-4701-b9bf-94f2092e2a40.png)


Zodra deze instellingen gewijzigd zijn, open de terminal, navigeer naar de folder waar het project instaat. Run het commando ‘ng build’, en het project is klaar om te deployen.
Node.js
Download | Node.js
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
Image
Image
