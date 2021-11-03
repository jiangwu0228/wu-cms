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

username: [manager@admin.com](mailto:manager@admin.com)

https://github.com/chtocode/CMS / Do not copy this code

My project

https://github.com/kasituna/wu-cms

https://school-cms-sigma.vercel.app/

##### Each class document in fold "chapter"

My note book located here

###### Road Map



###### Problem

# can't set layout stictly

​	add code below

```
position: "sticky",

top: 0,
```

set up dev env

build login page

How can we make standardization, is there any document?

Such as which should be abstract? Which should be in separate file.

router redirect check token

can use if statements to do diff role

Sort

data save in local or just got 10?

Local storage router.quere

"data-fns" to format data



### Do we need useMemo and useCallback?

###### Which situation will re-render component?

1. Component  state change 

2. Props from parent component change
3. Parent component re-render

###### useMemo scenario

if we do have complex calculate that we can call useMemo caching this.

Only if dependency change that will re-calculate instaad fo every re-render component

###### useCallback scenario

1. Child component will re-render every time if we don't use useCallback when we need pass function to child component.
2. when we need debounce and throttle



##### Personal point of view

Use that hooks when we need high performance.





After I add 
