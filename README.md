# School_CMS



### Set up

##### Project located in fold school_cms

Framework : Next js

UI: antd

Style : styled-components

Api : axios

CMS api:

https://www.showdoc.com.cn/1162959773489609

https://cms.chtoma.com/swagger/

Sample :

https://cms-lyart.vercel.app/   

username: [manager@admin.com](mailto:manager@admin.com)  password:111111

https://github.com/chtocode/CMS /  Don’t copy this code



My project

https://github.com/kasituna/School_CMS/tree/master

https://school-cms-blond.vercel.app/



##### Each class document in fold "chapter"

My note book located here

###### Day one

set up dev env

build login page

First of all we need **Design for structure**

Router :

[school_cms]
├── [components]
│  └── [layout]
│     └──Footer.js
│     └──Layout.js
│     └──MainNavigation.js
├── [pages]
│  └── [dashboard]
│     └──index.js //dashboard home page
│  └── [login]
│     └──index.js //login home page
│  └── [signup]
│     └──signup.js //login home page
│  └── index.js //home page
└── [styles]
   └──globals.css

login logic:

Validate in local use antd, tickle the remember me box. If it's not ,set time out to logout, otherwise save it in local storage for maybe 7 days.

Sent email and password and role to server via api in POST method. if get responses 'success', save token role and userId in local storage, and drive it to the page depends on role and use id get it's own data.





